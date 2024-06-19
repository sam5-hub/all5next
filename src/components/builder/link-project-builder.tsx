"use client";
import { LinkType } from '@/schema/linkProject.schema';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import LinkItemCard from './link-item-card';
import { onGetLinkList, submitLinkListData } from '@/actions/links';

function LinkProjectBuilder({ linkProjectId }: { linkProjectId: string }) {
    const [linkList, setLinkList] = React.useState<LinkType[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        getLinkProjectDetail();
    }, [linkProjectId]);

    const getLinkProjectDetail = useCallback(async () => {
        setLoading(true);
        if (!linkProjectId) {
            throw new Error('Link project id is required');
        }
        const responseData = await onGetLinkList(linkProjectId);
        if (responseData && responseData.data) {
            setLinkList(responseData.data);
        }
        setLoading(false);
    }, [linkProjectId]);


    const handleOnDragEnd = async (result: any) => {
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

        setLoading(true);
        await submitLinkListData(items);
        setLoading(false);

    }

    const onClickHandler = (linkId: string) => {

        // console.log("DragDropContext", linkId);
    }
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={`linkProjectId-${linkProjectId}`} type="link-list">
                {(provided) => (
                    <div
                        className='flex flex-col gap-2 h-screen overflow-y-auto w-full p-4'
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            {linkList.map((link, index) => (
                                <LinkItemCard
                                    key={link.linkId}
                                    {...link}
                                    index={index}
                                    onClickHandler={onClickHandler}
                                />
                            ))}
                        {provided.placeholder}
                        
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default LinkProjectBuilder;
