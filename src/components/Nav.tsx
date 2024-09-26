import { DataNavLinks, DataNavSocials } from '@/lib/constant'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { useState } from 'react'
import { Link as ScrollerLink, scroller } from 'react-scroll'
import FilesMenu from './FilesMenu'
import { Dock, DockIcon } from './ui/Dock'
import Icons from './ui/Icon'
import { Separator } from './ui/Separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'

export default function Nav() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 640px)')

    const onOpenSocial = (social: string) => {
        window.open(social, '_blank', 'noopener,noreferrer')
    }

    const onScrollTo = (href: string) => {
        scroller.scrollTo(href, {
            duration: 500,
            smooth: true,
            offset: -48,
        })
    }

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
                            <DockIcon key={`link-${index}-${link.name}`} onClick={() => onScrollTo(link.href)}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex h-full w-full items-center justify-center">
                                            <link.icon className="size-4" />
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
                            <DockIcon key={`social-${index}-${social.name}`} onClick={() => onOpenSocial(social.href)}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex h-full w-full items-center justify-center">
                                            <social.icon className="size-4" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-white">{social.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        ))}

                        <Separator orientation="vertical" className="h-full" />

                        <DockIcon onClick={() => setDropdownOpen(true)}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex h-full w-full items-center justify-center">
                                        <button type="button">
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
