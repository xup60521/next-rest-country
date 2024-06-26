"use client";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="w-full lg:px-32 flex items-center justify-between bg-white text-black py-6 border-b-[1px] border-c_dark_gray">
            <Link href="/" className="text-xl font-black">Where in the world?</Link>
            <button className="flex items-center gap-2">
                <FaMoon />
                <span>Dark Mode</span>
            </button>
        </nav>
    );
}
