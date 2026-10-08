import type { ReactNode } from "react";
import MuiModal from "@mui/material/Modal";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
    return (
        <MuiModal open={open} onClose={onClose}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-100 max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-surface shadow-2xl outline-none">
                {children}
            </div>
        </MuiModal>
    );
}
