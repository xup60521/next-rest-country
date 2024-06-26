import { atomWithStorage } from "jotai/utils";
import {type Theme} from "@/lib/utils"

const STORAGE_KEY = "7fc941d8-12ed-47df-9266-dacb1f4a9443";
export const themeAtom = atomWithStorage<Theme>(
    STORAGE_KEY,
    "white"
);
