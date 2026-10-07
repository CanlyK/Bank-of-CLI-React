import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import DepositForm from "../Forms/DepositForm";
import WithdrawForm from "../Forms/WithdrawForm";
import TransferForm from "../Forms/TransferForm";

type ModalAction = "Deposit" | "Withdraw" | "Transfer";
type DropdownVariant = "button" | "nav";

const ACTIONS: ModalAction[] = ["Deposit", "Withdraw", "Transfer"];

interface DropdownProps {
    onDeposit: (amount: number) => void;
    onWithdraw: (amount: number) => void;
    onTransfer: (toAccountId: number, amount: number) => void;
    label?: string;
    variant?: DropdownVariant;
    openOnHover?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({
    onDeposit,
    onWithdraw,
    onTransfer,
    label = "Make Transaction",
    variant = "button",
    openOnHover = false,
    onOpenChange,
}: DropdownProps) {
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

    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    const openModal = (action: ModalAction): void => {
        setIsOpen(false);
        setModalAction(action);
    };

    const closeModal = (): void => setModalAction(null);

    // Hover events from the modal bubble up here through React, so ignore them while it is open.
    const handleHover = (open: boolean): void => {
        if (openOnHover && modalAction === null) {
            setIsOpen(open);
        }
    };

    const isNav = variant === "nav";

    const buttonClass = isNav
        ? `w-32 py-2 rounded-full text-sm cursor-pointer ${isOpen ? "bg-accent-gradient font-semibold text-white" : ""}`
        : "px-5 py-2.5 rounded-lg bg-accent-gradient text-xs font-semibold text-white cursor-pointer hover:opacity-90";

    // The nav menu hangs flush under the bar; its top padding keeps the pointer inside the hover area.
    const menuWrapperClass = isNav
        ? "absolute top-full left-0 z-10 w-full pt-1.5"
        : "absolute top-full right-0 z-10 w-40 pt-2";

    const menuClass = isNav
        ? "flex flex-col py-2 rounded-b-3xl bg-surface-hover text-sm shadow-popover"
        : "flex flex-col py-2 rounded-lg bg-surface text-xs shadow-popover";

    const itemClass = isNav
        ? "py-1.5 cursor-pointer hover:text-accent"
        : "py-2 cursor-pointer hover:bg-surface-hover";

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            <button
                onClick={() => setIsOpen((open) => openOnHover || !open)}
                className={buttonClass}
            >
                {label}
            </button>
            {isOpen && (
                <div className={menuWrapperClass}>
                    <div className={menuClass}>
                        {ACTIONS.map((action) => (
                            <button
                                key={action}
                                onClick={() => openModal(action)}
                                className={itemClass}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <Modal open={modalAction !== null} onClose={closeModal}>
                {modalAction === "Deposit" && <DepositForm onDeposit={onDeposit} onCancel={closeModal} />}
                {modalAction === "Withdraw" && <WithdrawForm onWithdraw={onWithdraw} onCancel={closeModal} />}
                {modalAction === "Transfer" && <TransferForm onTransfer={onTransfer} onCancel={closeModal} />}
            </Modal>
        </div>
    );
}
