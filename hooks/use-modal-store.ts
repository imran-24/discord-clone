import { Channel, Server } from '@prisma/client';
import {create} from 'zustand';


export type ModalType =
  | "createServer"
  | "invite"
  | "createChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData{
    server?: Server,
    apiUrl?: string,
    query?: Record<string, any>
}

interface ModalStore{
    data: ModalData;
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data:{},
    onOpen: (type, data={}) => set({isOpen: true, type, data}),
    onClose: () => set({isOpen: false, type: null})
}))