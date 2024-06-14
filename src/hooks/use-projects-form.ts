import { ProjectForm } from '@/components/admin/project-form';
"use client";
import { useToast } from '@/components/ui/use-toast'
import { ProjectSchema, ProjectType } from '@/schema/projects.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { submitProjectData, onGetProjectData } from "@/actions/projects";


type ProjectFormParam ={
  projectId?: string | null 
}

export const useProjectsForm = ({ projectId } : ProjectFormParam) => {
  const formMethod = useForm<ProjectType>({
    resolver: zodResolver(ProjectSchema),
  })
  const pathname = usePathname()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

//   useEffect(() => {
//     setIsDomain(pathname.split('/').pop())
//   }, [pathname])


 // Get Blog
 const getProjectDetail = useCallback(async () => {
  setLoading(true);
  if (projectId) {
    const responseData = await onGetProjectData(projectId);
    if (responseData && responseData.data) {
      formMethod.reset(responseData.data as ProjectType); // Set form values to fetched data
    }
  }
  setLoading(false);
}, [projectId]);

useEffect(() => {
  getProjectDetail();
}, [projectId]);


const onSubmitProject = async (data: ProjectType) => {
    setLoading(true);
    if (data) {
      await submitProjectData(data);
      toast({
        title: 'Project Created',
        description: 'Your project has been created successfully!',
      })
      setLoading(false)
      formMethod.reset()
      router.back()
    }
  }

  return {
    formMethod,
    getProjectDetail,
    onSubmitProject,
    loading
  }
}