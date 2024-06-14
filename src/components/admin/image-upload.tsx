"use client";
import React from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps, Accept } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';
import { uploadFiles } from '@/utils/uploadthing';
import Image from 'next/image';

type ImageUploadProps = {
    name: string;
    defaultValue: string | null;
    formReturn: UseFormReturn<any>; // Adjust this type according to your form data structure
};

const ImageUpload: React.FC<ImageUploadProps> = ({ name, defaultValue, formReturn, ...props }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(defaultValue);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {

            const [res] = await uploadFiles("imageUploader", { files: [file] });
            formReturn.setValue(name, res.url);
            setImageUrl(res.url);
            console.log('File uploaded successfully:', res);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': []
        },
    });


    return (
        <div {...getRootProps()} style={{
            border: '2px dashed #cccccc',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            width: '500px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <input {...getInputProps()} {...props} />

            {formReturn.getValues(name) ? (
                 <Image className={"aspect-square h-fit w-full rounded-xl mb-5  object-cover"}
                 src={formReturn.getValues(name)} alt={name} width={200} height={150} />
            ) : (
                <p>Drag & drop an image here, or click to select one</p>
            )}
        </div>
    );
};

export default ImageUpload;
