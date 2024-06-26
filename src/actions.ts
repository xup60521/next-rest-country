"use server";

import { type CCA3Country, type Country } from "./lib/utils";

export async function getAllData() {
    try {
        const res = await fetch(
            "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,translation,cca3"
        );
        const data = (await res.json()) as Country[];
        return data;
    } catch {
        throw new Error(
            "fetch error (https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,translation,cca3)"
        );
    }
}

export async function getCountryByCCA3(cca3_country_code: string) {
    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${cca3_country_code}?fields=name,tld,cca3,population,currencies,region,languages,subregion,flags,capital,borders`
        );
        const data = (await res.json()) as CCA3Country;
        return data;
    } catch {
        throw new Error(
            `fetch error (https://restcountries.com/v3.1/alpha/${cca3_country_code}?fields=name,tld,cca3,population,currencies,region,languages,subregion,flags,capital,borders)`
        );
    }
}
