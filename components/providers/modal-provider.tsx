'use client'

import {useState, useEffect} from 'react'
import CreateServerModal from '../modals/create-server-modal';
import InviteModal from '../modals/invite-modal';
import CreateChannelModal from '../modals/create-channel-modal';
import MessageFileModal from '../modals/message-file-modal';
import { DeleteMessageModal } from '../modals/delete-message-modal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return;
    return (
        <>
           <CreateServerModal /> 
           <InviteModal />
           <CreateChannelModal />
           <MessageFileModal /> 
           <DeleteMessageModal />
        </>
    )
}

export default ModalProvider