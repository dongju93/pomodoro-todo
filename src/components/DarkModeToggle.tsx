import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("darkMode") === "true" ||
                (!localStorage.getItem("darkMode") &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("darkMode", isDark.toString());
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <FiSun className="w-5 h-5 text-yellow-500" />
            ) : (
                <FiMoon className="w-5 h-5 text-slate-600" />
            )}
        </button>
    );
};
