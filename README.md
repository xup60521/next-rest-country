# Frontend Mentor Challenge - REST Countries API with color theme switcher

This is a solution to the [++Rock, Paper, Scissors challenge on Frontend Mentor++](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH).

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
        - [Implement theme change](#implement-theme-change)
        - [Fetch data](#fetch-data)
        - [Skeleton](#skeleton)
    - [Resources](#resources)

## Overview

Users should be able to:

- View the optimal layout for the game depending on their device's screen size

- Play Rock, Paper, Scissors against the computer

- Maintain the state of the score after refreshing the browser

Links: 

- GitHub Repo: <https://github.com/xup60521/next-rest-country>

- Live website: <https://next-rest-country.vercel.app>

```bash
# install dependencies
pnpm install
# start dev server
pnpm run dev
```

## My process

### Built with

- React

- Next.js (App Router)

- TailwindCSS

- React Query

- shadcn/ui

- Jotai (global state management)

### What I learned

#### Implement theme change

First I need to know what the current theme is. Luckily Jotai offers a good solution. By using `atomWithStorage` from jotai, it will automatically sync the state with localstorage api.

```ts
import { atomWithStorage } from "jotai/utils";
import {type Theme} from "@/lib/utils"

const STORAGE_KEY = "7fc941d8-12ed-47df-9266-dacb1f4a9443";
export const themeAtom = atomWithStorage<Theme>(
    STORAGE_KEY,
    "white"
);
```

Then, we can get the style based on the theme we select.

```tsx
export type Theme = "white" | "dark";
type Elm = "bg_navbar" | "text_navbar" | "bg_content" | "text_content" | "bg_content_2" | "nav_border"

export function getColor(theme: Theme, elm: Elm) {
    if (theme === "white") {
        if (elm === "bg_navbar") return "bg-white"
        if (elm === "text_navbar") return "text-black"
        if (elm === "bg_content") return "bg-c_very_light_gray"
        if (elm === "text_content") return "text-black"
        if (elm === "bg_content_2") return "bg-white"
        if (elm === "nav_border") return "border-b-[1px] border-c_dark_gray"
    }
    if (theme === "dark") {
        if (elm === "bg_navbar") return "bg-c_dark_blue"
        if (elm === "text_navbar") return "text-white"
        if (elm === "bg_content") return "bg-c_bg_dark_blue"
        if (elm === "text_content") return "text-white"
        if (elm === "bg_content_2") return "bg-white"
        if (elm === "nav_border") return ""
    }
    return ""
}
```

For a theme-changeable component such as NavBar, we can pass the `getColor` function in the `className` prop.

```tsx
import { useAtomValue } from "jotai"
import { themeAtom } from "@/lib/state"
import { getColor } from "@/lib/utils"

export default function NavBar() {
  const theme = useAtomValue(themeAtom)
  return  <nav className={`${getColor(theme, "bg_navbar")}`}>
    ...
    </nav>
}
```

If we want do add more theme, just edit the `getColor` function, then everything should work perfectly.

#### Fetch data

I use `@tanstack/react-query` to manage remote data. It’s incredibly popular among Frontend development.

Next.js 14 introduces server action, allowing us to defined backend logic and simply called from the fronted as an async function.

Since our app doesn’t contain any sensitive data, this solution (react-query + server action) works fine.

```tsx
// page.tsx
const { data } = useQuery({
        queryFn: () => getAllData(),
        queryKey: ["getdata"],
    });

// actions.ts
"use server"
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
```

Of course, we can move the fetching logic from server action to traditional API route handler, which is more suitable when we want the endpoint to be open.

#### Skeleton

When the data is not fully loaded, using a skeleton placeholder can provide a better UX.

Luckily, react query can help us achieve this goal. 

```tsx
const { data, isFetching } = useQuery({
    queryFn: () => getCountryByCCA3(code),
    queryKey: ["detail"],
});

if (isFetching) {
    return <Skeleton />
}
```

### Resources

- Google font - <https://fonts.google.com>

- TailwindCSS Docs - <https://tailwindcss.com/docs>

- TanStack Query Docs - <https://tanstack.com/query/latest/docs/framework/react/overview>

- Next.js Docs - <https://nextjs.org/docs>