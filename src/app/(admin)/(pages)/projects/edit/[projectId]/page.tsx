"use client";
import ProjectForm from '@/components/admin/project-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
type Props = { params: { id: string } }

const ProjectDetailPage: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();
  console.log('ProjectDetailPage', props);
  const pathname = usePathname();
  const projectId = pathname.split('/').pop();

  return (
    <div className="flex flex-col gap-4 relative">
      
      <div className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center justify-between border-b">
        <h1>Projects Detail - [{projectId}]</h1>
        <Button onClick={()=>{
        router.back();
      }}>
        Back
      </Button>
      </div>
      
      <div className={cn("mt-10 p-4", "w-full")}>
        <ProjectForm projectId={projectId} />
      </div>
    </div>

  );
};

export default ProjectDetailPage;
