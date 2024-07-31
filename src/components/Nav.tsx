import { DataNavLinks, DataNavSocials } from '@/lib/constant'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { useState } from 'react'
import { Link as ScrollerLink } from 'react-scroll'
import FilesMenu from './FilesMenu'
import { Dock, DockIcon } from './ui/Dock'
import Icons from './ui/Icon'
import { Separator } from './ui/Separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'

export default function Nav() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 640px)')

    return (
        <>
            <TooltipProvider delayDuration={300} skipDelayDuration={0}>
                <nav className="fixed bottom-0 left-0 right-0 z-[99]">
                    <div className="[&>div]:!relative [&>div]:!transform-none">
                        <FilesMenu opened={dropdownOpen} onOpenChange={setDropdownOpen} />
                    </div>

                    <Dock
                        direction="middle"
                        className="relative my-3 rounded-full bg-white dark:bg-dark-12 md:my-6"
                        disable={isMobile}
                    >
                        {DataNavLinks.map((link, index) => (
                            <DockIcon key={`link-${index}-${link.name}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex h-full w-full items-center justify-center">
                                            <ScrollerLink to={link.href} smooth duration={500} offset={-48}>
                                                <link.icon className="size-4" />
                                            </ScrollerLink>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-white">{link.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        ))}

                        <Separator orientation="vertical" className="h-full" />

                        {DataNavSocials.map((social, index) => (
                            <DockIcon key={`social-${index}-${social.name}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex h-full w-full items-center justify-center">
                                            <a href={social.href} target="_blank" rel="noopener noreferrer">
                                                <social.icon className="size-4" />
                                            </a>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-white">{social.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        ))}

                        <Separator orientation="vertical" className="h-full" />

                        {/* <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex h-full w-full items-center justify-center">
                                        <button type="button">
                                            <Icons.darkMode className="size-4" />
                                        </button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">Dark mode</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon> */}

                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex h-full w-full items-center justify-center">
                                        <button type="button" onClick={() => setDropdownOpen(true)}>
                                            <Icons.file className="size-4" />
                                        </button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">Files</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    </Dock>
                </nav>
            </TooltipProvider>
        </>
    )
}
