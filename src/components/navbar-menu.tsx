import { useState } from "preact/compat"

import type { Component, FunctionComponent } from "preact/compat"
import { twMerge } from "tailwind-merge"

interface Props {
    icon: Component
}

const DialogTrigger: FunctionComponent<Props> = ({ icon }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDark, setIsDark] = useState(Boolean(localStorage.getItem("theme") === "dark"))
    const [, lang] = location.pathname.split("/")

    const getModifiedPath = (lang: string) => {
        const [, , ...restPaths] = location.pathname.split("/")
        return `/${lang}/`.concat(restPaths.join("/"))
    }

    const onButtonClicked = () => {
        setIsOpen((prev) => !prev)
    }

    const onThemeChanged = () => {
        if (isDark) {
            console.log("set light")
            localStorage.setItem("theme", "light")
            document.documentElement.classList.remove("dark")
            setIsDark(false)
        } else {
            console.log("set dark")
            localStorage.setItem("theme", "dark")
            document.documentElement.classList.add("dark")
            setIsDark(true)
        }
    }

    return (
        <div class="relative">
            <button
                class={twMerge(
                    "flex h-9 w-9 items-center justify-center rounded bg-transparent",
                    isOpen ? "bg-dark-1 dark:bg-dark-10" : ""
                )}
                onClick={onButtonClicked}
            >
                {icon}
            </button>
            {/* dialog */}
            {isOpen && (
                <div class="absolute right-0 top-[3rem] min-w-[132px] overflow-hidden rounded-md border border-dark-2/30 shadow-minimal dark:shadow-minimal-dark">
                    <div class="flex flex-col">
                        <a
                            href={lang === "en" ? getModifiedPath("id") : getModifiedPath("en")}
                            class="flex items-center justify-between space-x-2 bg-dark-1 p-2 font-normal hover:bg-[#F6F6F6]  dark:bg-dark-5 hover:dark:bg-dark-4"
                        >
                            <span class="text-dark-8 dark:!text-white">
                                {lang === "en" ? "Indonesia" : "English"}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                class="h-4 w-4"
                            >
                                <path
                                    fill="currentColor"
                                    d="M14.022 7h1a1.001 1.001 0 0 1 1 1v1a1 1 0 0 0 2 0V8a3.003 3.003 0 0 0-3-3h-1a1 1 0 0 0 0 2Zm-4 9h-1a1.001 1.001 0 0 1-1-1v-1a1 1 0 0 0-2 0v1a3.003 3.003 0 0 0 3 3h1a1 1 0 0 0 0-2Zm11-1a1 1 0 0 0 0-2h-3v-.5a1 1 0 0 0-2 0v.5h-3a1 1 0 0 0 0 2h5.184a6.728 6.728 0 0 1-1.225 2.527a6.668 6.668 0 0 1-.63-.983a1 1 0 1 0-1.779.912a8.678 8.678 0 0 0 .96 1.468a6.618 6.618 0 0 1-2.426 1.099a1 1 0 0 0 .427 1.954a8.635 8.635 0 0 0 3.445-1.622a8.724 8.724 0 0 0 3.469 1.622a1 1 0 1 0 .43-1.954a6.725 6.725 0 0 1-2.446-1.09A8.736 8.736 0 0 0 20.244 15Zm-11.97-3.757a1 1 0 0 0 1.94-.486l-1.757-7.03a2.281 2.281 0 0 0-4.426 0l-1.757 7.03a1 1 0 0 0 1.94.486L5.552 9h2.94ZM6.052 7l.698-2.787a.291.291 0 0 1 .544 0L7.991 7Z"
                                />
                            </svg>
                        </a>
                        <button
                            class="flex items-center justify-between space-x-2 bg-dark-1 p-2 font-normal hover:bg-[#F6F6F6] dark:bg-dark-5 hover:dark:bg-dark-4"
                            onClick={onThemeChanged}
                        >
                            <span class="text-dark-8 dark:!text-white">
                                {lang === "en" ? "Theme" : "Tema"}
                            </span>
                            {!isDark ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    class="h-4 w-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m5.64 17l-.71.71a1 1 0 0 0 0 1.41a1 1 0 0 0 1.41 0l.71-.71A1 1 0 0 0 5.64 17ZM5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1ZM5.64 7.05a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41Zm12 .29a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.64.71a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.29ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm6.36-2A1 1 0 0 0 17 18.36l.71.71a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.41ZM12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.51 5.51 0 0 0 12 6.5Zm0 9a3.5 3.5 0 1 1 3.5-3.5a3.5 3.5 0 0 1-3.5 3.5Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    class="h-4 w-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.79 9.79 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DialogTrigger
