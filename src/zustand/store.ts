import { LinkType } from '@/schema/linkProject.schema';
import { create } from 'zustand';

type Item = {
    id: string;
    content: string;
};

type StoreState = {
    linkTypeListData: LinkType[];
    setItems: (items: Item[]) => void;
};

const useStore = create<StoreState>((set) => ({
    linkTypeListData: [

    ],
    setItems: (items) => set({ linkTypeListData: items }),
}));

export default useStore;
