import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Country = {
    flags: Flags;
    name: Name;
    capital: string[];
    region: Region;
    population: number;
};

type Flags = {
    png: string;
    svg: string;
    alt: string;
};

type Name = {
    common: string;
    official: string;
    nativeName: { [key: string]: NativeName };
};

type NativeName = {
    official: string;
    common: string;
};

type Region =
    | "Oceania"
    | "Europe"
    | "Africa"
    | "Americas"
    | "Asia"
    | "Antarctic";
export const regions = [
    "Oceania",
    "Europe",
    "Africa",
    "Americas",
    "Asia",
    "Antarctic",
];
