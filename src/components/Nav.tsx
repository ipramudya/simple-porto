import { DataNavLinks, DataNavSocials } from '@/lib/constant'
import { useState } from 'react'
import { Dock, DockIcon } from './Dock'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './DropdownMenu'
import Icons from './Icon'
import { Separator } from './Separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip'

export default function Nav() {
    const [lang, setLang] = useState<'en' | 'id'>('en')

    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
            <nav className="fixed bottom-0 left-0 right-0 z-10">
                <Dock direction="middle" className="my-3 md:my-6">
                    {DataNavLinks.map((link, index) => (
                        <DockIcon key={`link-${index}-${link.name}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href={link.href}>
                                        <link.icon className="size-4" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{link.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}

                    <Separator orientation="vertical" className="h-full" />

                    {DataNavSocials.map((social, index) => (
                        <DockIcon key={`social-${index}-${social.name}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                                        <social.icon className="size-4" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{social.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}

                    <Separator orientation="vertical" className="h-full" />

                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button>
                                    <Icons.darkMode className="size-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Dark mode</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>

                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button>
                                            <Icons.lang className="size-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Language</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup
                                            value={lang}
                                            onValueChange={(value) => setLang(value as any)}
                                        >
                                            <DropdownMenuRadioItem value="top">English</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="bottom">Bahasa</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Language</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </nav>
        </TooltipProvider>
    )
}
