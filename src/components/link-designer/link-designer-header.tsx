"use client"
import { onGetLinkProjectData } from '@/actions/linkProjecs'
import useLinkDesigner from '@/hooks/use-link-designer'
import { LinkProjectType } from '@/schema/linkProject.schema'
import React, { useCallback, useEffect } from 'react'
import FormGenerator from "../form/form-generator";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ColorPicker from "../global/color-picker";
import { ImagePlus, Palette, Settings } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type LinkDesignerHeaderProp = {
    linkProjectId: string
}
export function LinkDesignerHeader(props: LinkDesignerHeaderProp) {

    const { linkProjectInfo, setLinkProjectInfo } = useLinkDesigner();
    const linkProjectId = props.linkProjectId


    console.log("LinkDesignerHeader",linkProjectInfo);

    return (
        <main className='flex flex-col gap-2 w-full'>
            <Card className={"cursor-pointer w-full"}>
                <CardHeader className="flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            className="rounded-xl object-cover"
                            src={linkProjectInfo?.imageUrl || "/test/image-2.png"}
                            alt={"Sam"}
                            width={100}
                            height={40}
                        />
                        <div>
                            <CardTitle>{linkProjectInfo?.title}</CardTitle>
                            <CardDescription>{linkProjectInfo?.description}</CardDescription>
                        </div>

                    </div>
                    <div className="flex flex-row gap-4">
                        <ImagePlus />
                        <Palette />
                        <Settings />
                        {/* <ColorPicker onCallback ={(hex)=> {
                        console.log("ColorPicker hex",hex);
                        setThemeColor(hex);
                        }}/> */}
                    </div>
                </CardHeader>
            </Card>

            <Card className={"cursor-pointer w-full"}>
                <CardHeader className="flex flex-row justify-center items-center gap-4">
                    <SocialLinksManager />
                </CardHeader>
            </Card>

        </main>
    )
}


// SocialLinksManager

export type SocialLinkType = {
    type: string
    url: string
}

export const SocialLinksManager = () => {
    const { linkProjectInfo, setLinkProjectInfo } = useLinkDesigner();

    // 默认社交链接
  const defaultSocialLinks: SocialLinkType[] = 
  linkProjectInfo?.socialLinks ?
    JSON.parse(linkProjectInfo.socialLinks) : [
      {
          type: "instagram",
          url: "",
      },
      {
          type: "tiktok",
          url: "",
      },
      {
          type: "facebook",
          url: "",
      },
    ]


    const handleInputSubmit = (type:string, inputValue:string) => {
        if (linkProjectInfo) {
          let updatedSocialLinks: SocialLinkType[] = [];
      
          // 如果 socialLinks 是字符串，则尝试解析为数组
          if (linkProjectInfo.socialLinks) {
            updatedSocialLinks = JSON.parse(linkProjectInfo.socialLinks)
          } else {
            updatedSocialLinks = defaultSocialLinks;
          }
      
          // 更新指定类型的链接或添加新链接
          let updated = false
          const updatedSocialLinksFiltered = updatedSocialLinks.map(link => {
            if (link.type === type) {
              updated = true
              return { type, url: inputValue }
            } else {
              return link
            }
          })
      
          if (!updated) {
            // 如果没有找到已存在的该类型链接，则添加新链接
            updatedSocialLinksFiltered.push({ type, url: inputValue })
          }
      
          // 更新 linkProjectInfo 的 socialLinks
          setLinkProjectInfo({ ...linkProjectInfo, socialLinks: JSON.stringify(updatedSocialLinksFiltered) })
        }
      }

    return (
        <div className="flex space-x-4">
            {defaultSocialLinks?.map((link) => (
                <SocialLinkPopover key={link.type} type={link.type} url={link.url} onInputSubmit={handleInputSubmit} />
            ))}
        </div>
    )
}


// SocialLinkPopover 
export type SocialLinkProp = {
    type: string;
    url: string;
    onInputSubmit: (type: string, url: string) => void
}


export const SocialLinkPopover: React.FC<SocialLinkProp> = ({ type, url, onInputSubmit }) => {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(url)

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value)
    }
    const handleInputBlur = () => {
        onInputSubmit(type, inputValue)
        setOpen(false)
      }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="py-4">
                    <Image
                        className="rounded-xl object-fit"
                        src={`/social/${type}.svg`}
                        alt={type}
                        width={30}
                        height={30}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{type.charAt(0).toUpperCase() + type.slice(1)} Link</h4>
                        <p className="text-sm text-muted-foreground">Set your personal {type} link</p>
                    </div>
                    <div className="grid gap-2">
                        <Input
                            placeholder={`Enter your ${type} link...`}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}


