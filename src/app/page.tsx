"use client";

import { getAllData } from "@/actions";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { IoSearchSharp } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getColor, regions } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/lib/state";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Page />
        </QueryClientProvider>
    );
}

function Page() {
    const { data } = useQuery({
        queryFn: () => getAllData(),
        queryKey: ["getdata"],
    });
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const router = useRouter();
    const theme = useAtomValue(themeAtom);
    return (
        <div
            className={`w-full flex-grow flex flex-col lg:px-32 px-8 pb-12 ${getColor(
                theme,
                "bg_content"
            )}`}
        >
            <div className="flex lg:flex-row flex-col lg:items-center gap-6 justify-between pt-8 pb-12">
                <div
                    className={`rounded-md flex items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ${getColor(
                        theme,
                        "bg_navbar"
                    )} ${getColor(theme, "text_navbar")}`}
                >
                    <span className="px-6">
                        <IoSearchSharp className="" />
                    </span>
                    <input
                        type="text"
                        className={`py-3 w-96 outline-none text-sm ${getColor(
                            theme,
                            "bg_navbar"
                        )} ${getColor(theme, "text_navbar")}`}
                        placeholder="Search for a country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select onValueChange={setFilter}>
                    <SelectTrigger
                        className={`w-40 border-none ${getColor(
                            theme,
                            "bg_navbar"
                        )} ${getColor(theme, "text_navbar")}`}
                    >
                        <SelectValue placeholder="Filter by Region" />
                    </SelectTrigger>
                    <SelectContent
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`w-40 ${getColor(
                            theme,
                            "bg_navbar"
                        )} ${getColor(theme, "text_navbar")}`}
                    >
                        {regions.map((d) => (
                            <SelectItem key={d} value={d}>
                                {d}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="lg:grid lg:grid-cols-4 flex flex-col min-w-0 gap-8">
                {data
                    ?.filter((d) => {
                        if (filter === "") return true;
                        return d.region === filter;
                    })
                    .filter((d) => {
                        if (search === "") return true;
                        return (
                            d.name.common
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            d.name.official
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
                    })
                    .map((item) => (
                        <div
                            key={item.name.common}
                            className={`flex flex-col overflow-hidden group rounded-md cursor-pointer ${getColor(
                                theme,
                                "bg_navbar"
                            )} ${getColor(theme, "text_navbar")}`}
                            onMouseDown={() => router.push(`/${item.cca3}`)}
                        >
                            <div className="overflow-hidden">
                                <Image
                                    height={224}
                                    width={400}
                                    src={item.flags.svg}
                                    alt={item.flags.alt}
                                    className="aspect-video w-full object-cover transition group-hover:scale-110 duration-500"
                                />
                            </div>
                            <div className="flex flex-col w-full p-6">
                                <h3 className="text-lg font-bold">
                                    {item.name.common}
                                </h3>
                                <div className="flex flex-col py-4">
                                    <p className="text-sm">
                                        <span className="font-semibold">
                                            Population:{" "}
                                        </span>
                                        {item.population.toLocaleString()}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">
                                            Region:{" "}
                                        </span>
                                        {item.region}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">
                                            Capital:{" "}
                                        </span>
                                        {item.capital}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
