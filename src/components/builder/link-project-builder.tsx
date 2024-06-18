"use client";
import { LinkType } from '@/schema/linkProjects.schema';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LinkItemCard from './link-item-Card';

function LinkProjectBuilder() {
    const [linkList, setLinkList] = React.useState<LinkType[]>([])

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(linkList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items.forEach((item, index) => {
            item.sort = index;
        })
        setLinkList(items);
    }

    const onClickHandler = (linkId: string) => {
        
        console.log("DragDropContext",linkId);
    }
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {
                linkList.map((link, index) => (
                    <LinkItemCard 
                    key={link.linkId}
                    {...link}
                    index={index}
                    onClickHandler={onClickHandler}
                  />
                ))

            }
        </DragDropContext>
    )
}

export default LinkProjectBuilder;
