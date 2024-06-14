"use client";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Controller, FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ImageUpload from '@/components/admin/image-upload';
import CustomMDXEditor from '@/components/admin/mdx-editor';



type Props = {
  type: 'text' | 'email' | 'password' | 'editor' | 'mdx-editor' | 'image'
  inputType: 'select' | 'input' | 'textarea' | 'editor' | 'mdx-editor'  | 'image'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  formReturn: UseFormReturn<any>
  name: string
  lines?: number
  form?: string
  defaultValue?: string
}

const FormGenerator = ({
  inputType,
  name,
  placeholder,
  defaultValue,
  formReturn,
  type,
  form,
  label,
  lines,
  options,
}: Props) => {

  const BlockEditor = useMemo(
    () => dynamic(() => import("@/components/admin/block-editor"), { ssr: false }),
    []
  );
  const mdref = React.useRef<any>(null);
  const markdown = ``
  switch (inputType) {
    case 'input':
    default:
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            defaultValue={defaultValue}
            {...formReturn.register(name)}
          />
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )
    case 'select':
      return (
        <Label htmlFor={`select-${label}`}>
          {label && label}
          <select
            form={form}
            id={`select-${label}`}
            {...formReturn.register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )
    case 'textarea':
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...formReturn.register(name)}
            rows={lines}
            defaultValue={defaultValue}
          />
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )
    case 'image':
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`image-${label}`}
        >
          {label && label}
          
          
          {/* <img src={formReturn.getValues(name)} alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}

          <ImageUpload
            name={name}
            defaultValue={formReturn.getValues(name)}
            formReturn={formReturn}
          />
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )
    case 'editor':
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`editor-${label}`}
        >
          {label && label}
          <BlockEditor
            onChangeBlock={(data) => {
              formReturn.setValue(name, data);
            }}
            initialContent={formReturn.getValues(name)}
          />
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )

      case 'mdx-editor':
      return (
        <Label
          className="flex flex-col gap-2"
          htmlFor={`editor-${label}`}
        >
          {label && label}
          <CustomMDXEditor
              onChange={(data) => {
              formReturn.setValue(name, data);
            }}
            editorRef={mdref} 
            markdown={formReturn.getValues(name) || markdown}
          />
          <ErrorMessage
            errors={formReturn.formState.errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )
      defualt: return <></>
  }
  
}

export default FormGenerator
