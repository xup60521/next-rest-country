"use client";
import { themeAtom } from "@/lib/state";
import { getColor } from "@/lib/utils";
import { useAtom } from "jotai";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";

export default function Navbar() {
    const [theme, setTheme] = useAtom(themeAtom);
    return (
        <nav
            className={`w-full lg:px-32 px-8 flex lg:text-lg text-sm items-center justify-between py-6 ${getColor(theme, "nav_border")} ${getColor(
                theme,
                "bg_navbar"
            )} ${getColor(theme, "text_navbar")}`}
        >
            <Link
                href="/"
                className={`text-xl font-black ${getColor(
                    theme,
                    "text_navbar"
                )}`}
            >
                Where in the world?
            </Link>
            <button
                className="flex items-center gap-2"
                onMouseDown={() =>
                    setTheme(theme === "white" ? "dark" : "white")
                }
            >
                <FaMoon />
                <span>Dark Mode</span>
            </button>
        </nav>
    );
}
