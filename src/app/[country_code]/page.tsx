import { getCountryByCCA3 } from "@/actions";
import { cca3_to_name } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default async function Page({
    params,
}: {
    params: { country_code: string };
}) {
    return (
        <div className="lg:px-32 flex-grow bg-c_very_light_gray">
            <div className="py-14">
                <Link
                    href="/"
                    className="flex items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit bg-white px-8 py-2 text-xs rounded-md transition hover:bg-c_very_light_gray gap-2"
                >
                    <FaArrowLeftLong /> Back
                </Link>
            </div>
            <DisplayDetail code={params.country_code} />
        </div>
    );
}

async function DisplayDetail({ code }: { code: string }) {
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
    } = await getCountryByCCA3(code);
    if (status === 400) {
        return <p>Error</p>;
    }
    return (
        <div className="flex items-center gap-24">
            <Image
                height={224}
                width={400}
                src={flags.svg}
                alt={flags.alt}
                className=" object-cover w-[min(40rem,35vw)] flex-shrink-0 aspect-[3/2]"
            />
            <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-3xl">{name.common}</h3>
                <div className="grid grid-cols-2 py-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="">
                            <span className="font-bold">Native Name: </span>
                            {
                                name.nativeName[Object.keys(name.nativeName)[0]]
                                    .common
                            }
                        </p>
                        <p className="">
                            <span className="font-bold">Population: </span>
                            {population.toLocaleString()}
                        </p>
                        <p className="">
                            <span className="font-bold">Region: </span>
                            {region}
                        </p>
                        {subregion && (
                            <p className="">
                                <span className="font-bold">Sub Region: </span>
                                {subregion}
                            </p>
                        )}
                        {capital && (
                            <p className="">
                                <span className="font-bold">Capital: </span>
                                {capital.join(", ")}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        {tld && (
                            <p className="">
                                <span className="font-bold">
                                    Top Level Domain:{" "}
                                </span>
                                {tld.join(", ")}
                            </p>
                        )}
                        {currencies && (
                            <p className="">
                                <span className="font-bold">Currencies: </span>
                                {Object.keys(currencies)
                                    .map((d) => currencies[d].name)
                                    .join(", ")}
                            </p>
                        )}
                        {languages && (
                            <p className="">
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
                                className="bg-white rounded transition hover:-translate-y-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-6 text-xs py-1"
                            >
                                {cca3_to_name.find(item => item.cca3 === d)?.name.common ?? d}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
