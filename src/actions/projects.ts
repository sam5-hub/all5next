'use server'
import { prisma } from '@/lib/prisma';
import { ProjectType } from '@/schema/projects.schema';


export const onGetProjectList = async (page: number, perPage: number) => {
  try {
    const userId = 1;

    // Calculate the number of records to skip
    const skip = (page - 1) * perPage;

    // Fetch the paginated data
    const data = await prisma.projects.findMany({
      skip,
      take: perPage,
      orderBy: {
        projectId: 'desc',
      }
      // where: {
      //   userId, // assuming you want to filter projects by userId
      // },
    });

    // Fetch the total count of projects
    const total = await prisma.projects.count({
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


export const onGetProjectData = async (projectId: string) => {
    try {
      const userId = 1
      const data = await prisma.projects.findUnique({
        where: {
          projectId: projectId,
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
  

  export const submitProjectData = async (projectData: ProjectType) => {
  
    try {
      if (projectData.projectId) {
        // Update the existing blog
        // const { projectId, ...updateData } = projectData; // Destructure to exclude projectId
        const updatedData = await prisma.projects.update({
          where: { projectId: projectData.projectId },
          data: {
            ...projectData
           },
        });
        return {
          status: 200,
          data: updatedData,
        };
      } else {
        // Create a new blog
        const newData = await prisma.projects.create({
          data: {
            ...projectData
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