import { createContext } from "react";
import { ModalTypes } from "./modal.provider";

export type ModalContent = {
    content: React.ReactNode;
    title?: string;
}

export type ModalContextType = {
    isOpen: boolean;
    modalContext: ModalTypes | undefined;
    openModal: (modalContext: ModalTypes, modalIdentity?: string, params?: Record<string, unknown>) => void;
    closeModal: () => void;
    getModalContent: () => ModalContent | null;
    modalIdentity: string | undefined;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);