import { useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";

interface NavbarProps {
    onDeposit: (amount: number) => void;
    onWithdraw: (amount: number) => void;
    onTransfer: (toAccountId: number, amount: number) => void;
}

const navItemClass = (active: boolean): string =>
    `w-32 py-2 rounded-full text-sm cursor-pointer ${active ? "bg-accent-gradient font-semibold text-white" : ""}`;

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
    );
}

export type Theme = "light" | "dark";

const THEME_OPTIONS: { theme: Theme; label: string; Icon: () => React.JSX.Element }[] = [
    { theme: "light", label: "Light mode", Icon: SunIcon },
    { theme: "dark", label: "Dark mode", Icon: MoonIcon },
];

export default function Navbar({ onDeposit, onWithdraw, onTransfer }: NavbarProps) {
    const STORAGE_KEY = "theme";
    const [transactionOpen, setTransactionOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(() =>
        localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light"
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);


    return (
        <nav className="flex items-center w-fit mx-auto p-1.5 rounded-full bg-surface shadow-card">
            <button className={navItemClass(!transactionOpen && !settingsOpen)}>Dashboard</button>
            <Dropdown
                variant="nav"
                label="Transaction"
                openOnHover
                onOpenChange={setTransactionOpen}
                onDeposit={onDeposit}
                onWithdraw={onWithdraw}
                onTransfer={onTransfer}
            />
            <div
                className="relative"
                onMouseEnter={() => setSettingsOpen(true)}
                onMouseLeave={() => setSettingsOpen(false)}
            >
                <button onClick={() => setSettingsOpen(true)} className={navItemClass(settingsOpen)}>
                    Settings
                </button>
                {settingsOpen && (
                    <div className="absolute top-full left-0 z-10 w-full pt-1.5">
                        <div className="flex justify-center gap-2 py-2 rounded-b-3xl bg-surface-hover shadow-popover">
                            {THEME_OPTIONS.map(({ theme: option, label, Icon }) => (
                                <button
                                    key={option}
                                    onClick={() => setTheme(option)}
                                    aria-label={label}
                                    aria-pressed={theme === option}
                                    className={`p-2 rounded-full cursor-pointer ${theme === option ? "bg-accent-light/20" : "hover:bg-accent-light/10"}`}
                                >
                                    <Icon />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
