import { DataNavLinks, DataNavSocials } from '@/lib/constant'
import { Dock, DockIcon } from './Dock'
import Icons from './Icon'
import { Separator } from './Separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip'

export default function Nav() {
    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
            <nav className="fixed bottom-0 left-0 right-0 z-[999]">
                <Dock direction="middle" className="my-3 rounded-full bg-white dark:bg-dark-12 md:my-6">
                    {DataNavLinks.map((link, index) => (
                        <DockIcon key={`link-${index}-${link.name}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href={link.href}>
                                        <link.icon className="size-4" />
                                    </a>
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
                                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                                        <social.icon className="size-4" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">{social.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}

                    <Separator orientation="vertical" className="h-full" />

                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button">
                                    <Icons.darkMode className="size-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Dark mode</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </nav>
        </TooltipProvider>
    )
}
