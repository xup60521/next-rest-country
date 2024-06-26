"use client";

import { getCountryByCCA3 } from "@/actions";
import { themeAtom } from "@/lib/state";
import { cca3_to_name, getColor } from "@/lib/utils";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const queryClient = new QueryClient();

export default function Page({ params }: { params: { country_code: string } }) {
    const theme = useAtomValue(themeAtom);
    return (
        <QueryClientProvider client={queryClient}>
            <div
                className={`lg:px-32 px-8 flex-grow ${getColor(
                    theme,
                    "bg_content"
                )}`}
            >
                <div className="py-14">
                    <Link
                        href="/"
                        className={`flex items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit px-8 py-2 text-xs rounded-md transition gap-2 ${getColor(
                            theme,
                            "bg_navbar"
                        )} ${getColor(theme, "text_navbar")}`}
                    >
                        <FaArrowLeftLong /> Back
                    </Link>
                </div>
                <DisplayDetail code={params.country_code} />
            </div>
        </QueryClientProvider>
    );
}

function DisplayDetail({ code }: { code: string }) {
    const { data, isFetching } = useQuery({
        queryFn: () => getCountryByCCA3(code),
        queryKey: ["detail"],
    });
    const theme = useAtomValue(themeAtom);
    if (!data) {
        return null;
    }
    const {
        name,
        tld,
        currencies,
        capital,
        region,
        subregion,
        languages,
        population,
        flags,
        borders,
        status,
    } = data;
    if (status === 400) {
        return <p>Error</p>;
    }
    if (isFetching) {
        return <Skeleton />
    }
    return (
        <div
            className={`flex lg:flex-row flex-col lg:items-center gap-24 ${getColor(
                theme,
                "text_content"
            )}`}
        >
            <Image
                height={224}
                width={400}
                src={flags.svg}
                alt={flags.alt}
                className=" object-cover lg:w-[min(40rem,35vw)] w-full flex-shrink-0 aspect-[3/2]"
            />
            <div className="flex flex-col flex-grow lg:py-0 pb-24">
                <h3 className="font-bold text-3xl">{name.common}</h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 py-8 lg:gap-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <p className={`p-2`}>
                            <span className="font-bold">Native Name: </span>
                            {
                                name.nativeName[Object.keys(name.nativeName)[0]]
                                    .common
                            }
                        </p>
                        <p className={`p-2`}>
                            <span className="font-bold">Population: </span>
                            {population.toLocaleString()}
                        </p>
                        <p className={`p-2`}>
                            <span className="font-bold">Region: </span>
                            {region}
                        </p>
                        {subregion && (
                            <p className={`p-2`}>
                                <span className="font-bold">Sub Region: </span>
                                {subregion}
                            </p>
                        )}
                        {capital && (
                            <p className={`p-2`}>
                                <span className="font-bold">Capital: </span>
                                {capital.join(", ")}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        {tld && (
                            <p className={`p-2`}>
                                <span className="font-bold">
                                    Top Level Domain:{" "}
                                </span>
                                {tld.join(" ")}
                            </p>
                        )}
                        {currencies && (
                            <p className={`p-2`}>
                                <span className="font-bold">Currencies: </span>
                                {Object.keys(currencies)
                                    .map((d) => currencies[d].name)
                                    .join(", ")}
                            </p>
                        )}
                        {languages && (
                            <p className={`p-2`}>
                                <span className="font-bold">Languages: </span>
                                {Object.keys(languages)
                                    .map((d) => languages[d])
                                    .join(", ")}
                            </p>
                        )}
                    </div>
                </div>
                {borders && borders.length !== 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold mr-2">
                            Border Countries:{" "}
                        </span>
                        {borders.map((d) => (
                            <Link
                                href={`/${d}`}
                                key={d}
                                className={`rounded transition hover:-translate-y-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-6 text-xs py-1 ${getColor(
                                    theme,
                                    "bg_navbar"
                                )} ${getColor(theme, "text_navbar")}`}
                            >
                                {cca3_to_name.find((item) => item.cca3 === d)
                                    ?.name.common ?? d}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Skeleton() {
    const theme = useAtomValue(themeAtom);
    return (
        <div
            className={`flex lg:flex-row flex-col lg:items-center gap-24 ${getColor(
                theme,
                "text_content"
            )}`}
        >
            <div className={`object-cover lg:w-[min(40rem,35vw)] flex-shrink-0 aspect-[3/2] ${getColor(theme, "bg_navbar")}`} />
            <div className="flex flex-col flex-grow lg:py-0 pb-24">
                <div className={`font-bold text-3xl ${getColor(theme, "bg_navbar")} p-4 rounded`}></div>
                <div className="grid lg:grid-cols-2 grid-cols-1 py-8 lg:gap-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>
                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>
                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>

                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>

                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>

                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>

                        <p className={`p-3 ${getColor(theme, "bg_navbar")}`}></p>
                    </div>
                </div>

                <div className={`flex items-center gap-2 flex-wrap p-3 ${getColor(theme, "bg_navbar")}`}></div>
            </div>
        </div>
    );
}
