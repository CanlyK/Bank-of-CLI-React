import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import DepositForm from "../Forms/DepositForm";

type ModalAction = "Deposit" | "Withdraw" | "Transfer";

const ACTIONS: ModalAction[] = ["Deposit", "Withdraw", "Transfer"];

interface DropdownProps {
    onDeposit: (amount: number) => void;
}

export default function Dropdown({ onDeposit }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalAction, setModalAction] = useState<ModalAction | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const openModal = (action: ModalAction): void => {
        setIsOpen(false);
        setModalAction(action);
    };

    const closeModal = (): void => setModalAction(null);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen((open) => !open)}
                className="px-5 py-2.5 rounded-lg bg-accent-gradient text-xs font-semibold text-white cursor-pointer hover:opacity-90"
            >
                Make Transaction
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 z-10 flex flex-col w-40 mt-2 py-2 rounded-lg bg-white text-xs shadow-popover">
                    {ACTIONS.map((action) => (
                        <button
                            key={action}
                            onClick={() => openModal(action)}
                            className="py-2 cursor-pointer hover:bg-surface-hover"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            )}
            <Modal open={modalAction !== null} onClose={closeModal}>
                {modalAction === "Deposit" && <DepositForm onDeposit={onDeposit} onCancel={closeModal} />}
            </Modal>
        </div>
    );
}
