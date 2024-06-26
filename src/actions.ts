"use server"

import { type Country } from "./lib/utils"

export async function getAllData() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,translation")
        const data = await res.json() as Country[]
        return data
    }
    catch {
        throw new Error("fetch error (https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,translation)")
    }
}