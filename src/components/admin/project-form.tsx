"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { ProjectSchema, ProjectType } from "@/schema/projects.schema";
import { zodResolver } from '@hookform/resolvers/zod'
import FormGenerator from "../form/form-generator";
import { submitProjectData, onGetProjectData } from "@/actions/projects";
import { useProjectsForm } from "@/hooks/use-projects-form";
import { SkeletonLoader } from "../loader/skeleton-loader";

export default function ProjectForm({
  projectId
}: { projectId?: string | null }) {

  const router = useRouter();
  const { formMethod, getProjectDetail, onSubmitProject, loading } = useProjectsForm({projectId});


  return (
    <div>
      <div className="flex flex-row gap-4">
        <Button variant={"outline"} onClick={() => getProjectDetail()} className="p-2 mb-10">Refresh</Button>
        <Button variant={"outline"} onClick={() => { router.push("/blogs") }} > Back </Button>
        <Button variant={"default"} onClick={() => { onSubmitProject(formMethod.getValues()); }}>
          {loading ? (
            <>
              Please wait...
            </>
          ) : (
            <>
              Save
            </>
          )}
        </Button>
      </div>

      {
        loading ? <SkeletonLoader/> : 
          <form
          className="flex flex-col gap-4"
        >
  
          <FormGenerator
            name="title"
            label="Title"
            formReturn={formMethod}
            type="text"
            placeholder="title..."
            inputType="input"
          />
          
          <FormGenerator
            name="imageUrl"
            label="Cover"
            formReturn={formMethod}
            type="image"
            placeholder="image..."
            inputType="image"
          />
  
          <FormGenerator
            name="content"
            label="Content"
            formReturn={formMethod}
            inputType="editor"
            placeholder="typing content"
            type="text"
          />
        </form>
      }

     
    </div>

  );
}
