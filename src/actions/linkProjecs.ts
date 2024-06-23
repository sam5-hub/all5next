'use server'
import { prisma } from '@/lib/prisma';
import { LinkProjectType } from '@/schema/linkProject.schema'


export const onGetLinkProjectList = async () => {
  try {
    const data = await prisma.linkProject.findMany({
      orderBy: {
        linkProjectId: 'desc',
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

export const onGetLinkProjectPage = async (page: number, perPage: number) => {
  try {
    const userId = 1;

    // Calculate the number of records to skip
    const skip = (page - 1) * perPage;

    // Fetch the paginated data
    const data = await prisma.linkProject.findMany({
      skip,
      take: perPage,
      orderBy: {
        linkProjectId: 'desc',
      }
      // where: {
      //   userId, // assuming you want to filter linkProject by userId
      // },
    });

    // Fetch the total count of linkProject
    const total = await prisma.linkProject.count({
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


export const onGetLinkProjectData = async (linkProjectId: string) => {
    try {
      const userId = 1
      const data = await prisma.linkProject.findUnique({
        where: {
          linkProjectId: linkProjectId,
        },
        select: {
          linkProjectId: true,
          title: true,
          imageUrl: true,
          content: true,
          shareURL: true,
          socialLinks: true,
          theme: true,
          links: true,
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
  

  export const submitLinkProjectData = async (linkProjectData: LinkProjectType) => {
  
    // try {
    //   if (linkProjectData.linkProjectId) {
    //     // Update the existing linkProject
    //     // const { linkProjectId, ...updateData } = linkProjectData; // Destructure to exclude linkProjectId
    //     const updatedData = await prisma.linkProject.update({
    //       where: { linkProjectId: linkProjectData.linkProjectId },
    //       data: {
    //         ...linkProjectData
    //        },
    //     });
    //     return {
    //       status: 200,
    //       data: updatedData,
    //     };
    //   } else {
    //     // Create a new linkProject
    //     const newData = await prisma.linkProject.create({
    //       data: {
    //         ...linkProjectData
    //       },
    //     });
    //     return {
    //       status: 200,
    //       data: newData,
    //     };
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return {
    //     status: 500,
    //     error: 'An error occurred while saving the linkProject',
    //   };
    // }
  };