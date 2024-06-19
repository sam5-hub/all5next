'use server'
import { prisma } from '@/lib/prisma';
import { LinkType } from '@/schema/linkProject.schema'


export const onGetLinkList = async ( linkProjectId: string) => {
  try {
    const data = await prisma.link.findMany({
      where: {
        linkProjectId: linkProjectId
      },
      orderBy: {
        sort: 'asc',
      }

    });
   
    if (data) {
    
      return {
        status: 200,
        data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  }
};

export const onGetLinkPage = async (page: number, perPage: number) => {
  try {
    const userId = 1;

    // Calculate the number of records to skip
    const skip = (page - 1) * perPage;

    // Fetch the paginated data
    const data = await prisma.link.findMany({
      skip,
      take: perPage,
      orderBy: {
        linkId: 'desc',
      }
      // where: {
      //   userId, // assuming you want to filter link by userId
      // },
    });

    // Fetch the total count of link
    const total = await prisma.link.count({
      // where: {
      //   userId,
      // },
    });

    if (data) {
    
      return {
        status: 200,
        data,
        total,
        perPage,
        currentPage: page,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  }
};


export const onGetLinkData = async (linkId: string) => {
    try {
      const userId = 1
      const data = await prisma.link.findUnique({
        where: {
          linkId: linkId,
        },
      })
  
      if (data) {
        return {
          status: 200,
          data: data
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  export const submitLinkData = async (linkData: LinkType) => {
    try {
      if (linkData && linkData.linkId) {
        // Update existing link
        const updatedData = await prisma.link.update({
          where: { linkId: linkData.linkId },
          data: { ...linkData },
        });
        return {
          status: 200,
          data: updatedData,
        };
      } else {
        // Create a new link
        const newData = await prisma.link.create({
          data: { ...linkData },
        });
        return {
          status: 200,
          data: newData,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        error: 'An error occurred while saving the link',
      };
    }
  };
  export const submitLinkListData = async (linkList: LinkType[]) => {
    try {
      if (linkList && linkList.length > 0) {
        // Update existing links
        const updatePromises = linkList.map((link) =>
          prisma.link.update({
            where: { linkId: link.linkId },
            data: { ...link },
          })
        );
  
        const updatedData = await Promise.all(updatePromises);
  
        return {
          status: 200,
          data: updatedData,
        };
      } else {
        return {
          status: 400,
          error: 'Link list is empty',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        error: 'An error occurred while saving the links',
      };
    }
  };