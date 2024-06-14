'use server'
import { prisma } from '@/lib/prisma';
import { BlogType } from '@/schema/blogs.schema';


export const onGetBlogList = async (page: number, perPage: number) => {
  try {
    const userId = 1;

    // Calculate the number of records to skip
    const skip = (page - 1) * perPage;

    // Fetch the paginated data
    const data = await prisma.blogs.findMany({
      skip,
      take: perPage,
      orderBy: {
        blog_id: 'desc',
      }
      // where: {
      //   userId, // assuming you want to filter blogs by userId
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

export const onGetBlogList = async (page: number, perPage: number) => {
  try {
    const userId = 1;

    // Calculate the number of records to skip
    const skip = (page - 1) * perPage;

    // Fetch the paginated data
    const data = await prisma.blogs.findMany({
      skip,
      take: perPage,
      orderBy: {
        blog_id: 'desc',
      }
      // where: {
      //   userId, // assuming you want to filter blogs by userId
      // },
    });

    // Fetch the total count of blogs
    const total = await prisma.blogs.count({
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


export const onGetBlogData = async (blogId: string) => {
    try {
      const userId = 1
      const data = await prisma.blogs.findUnique({
        where: {
          blog_id: blogId,
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
  

  export const submitBlogData = async (blogData: BlogType) => {
  
    try {
      if (blogData.blog_id) {
        // Update the existing blog
        // const { blog_id, ...updateData } = blogData; // Destructure to exclude blog_id
        const updatedData = await prisma.blogs.update({
          where: { blog_id: blogData.blog_id },
          data: {
            ...blogData
           },
        });
        return {
          status: 200,
          data: updatedData,
        };
      } else {
        // Create a new blog
        const newData = await prisma.blogs.create({
          data: {
            ...blogData
          },
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
        error: 'An error occurred while saving the blog',
      };
    }
  };