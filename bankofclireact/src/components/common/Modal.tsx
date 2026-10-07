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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 p-8 rounded-3xl bg-surface shadow-2xl outline-none">
                {children}
            </div>
        </MuiModal>
    );
}
