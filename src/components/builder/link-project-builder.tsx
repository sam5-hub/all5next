"use client";
import { LinkType } from '@/schema/linkProject.schema';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import LinkItemCard from './link-item-card';
import { onGetLinkList, submitLinkListData } from '@/actions/links';
import { FormElement, FormElements } from '../link-designer/form-elements';
import { cn } from '@/lib/utils';
import SidebarBtnElement, { SidebarBtnElementDragOverlay } from './link-builder-sidebar-btn';

function LinkProjectBuilder({ linkProjectId }: { linkProjectId: string }) {
    const [linkList, setLinkList] = React.useState<LinkType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [overlay, setOverlay] = React.useState<null | FormElement>(null);

    const initialFormElements: FormElement[] = [
        // 初始化的 formElement 数组
        FormElements.TitleField,
        FormElements.TextField,
    ];
    const [formElements, setFormElements] = React.useState(initialFormElements);
    const onDragStart = (start: any) => {
        const draggedElement = formElements.find(
            (element) => element.type === start.draggableId.replace("designer-btn-", "")
        );
        setOverlay(draggedElement || null);
    };

    const onDragEnd = (result: DropResult) => {
        setOverlay(null);

        if (!result.destination) return;

        const newFormElements = Array.from(formElements);
        const [removed] = newFormElements.splice(result.source.index, 1);
        newFormElements.splice(result.destination.index, 0, removed);

        setFormElements(newFormElements);
    };


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
        <DragDropContext onDragStart={onDragStart} onDragEnd={handleOnDragEnd}>
            <div className='flex flex-row gap2'>
                <Droppable droppableId={`linkProjectId-${linkProjectId}`} type="link-list">
                {(provided, snapshot) => (
                        <div
                            className={cn(
                                "flex flex-col gap-2 h-screen overflow-y-auto w-[60%] p-4",
                                snapshot.isDraggingOver && "bg-blue-200"
                              )}
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
                <Droppable droppableId="sidebar">
                    {(provided) => (
                        <div
                            className={cn(
                                "flex flex-col gap-2 h-screen overflow-y-auto w-[60%] p-4"
                             )}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {formElements.map((formElement, index) => (
                                <SidebarBtnElement
                                    key={formElement.type}
                                    formElement={formElement}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default LinkProjectBuilder;
