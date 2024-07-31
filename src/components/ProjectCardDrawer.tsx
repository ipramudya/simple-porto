import Badge from './ui/Badge'
import { Drawer, DrawerContent } from './ui/Drawer'
import GithubButton from './ui/GithubLink'
import ShimmerLink from './ui/ShimmerLink'

interface Props {
    opened: boolean
    onOpenChange: (v: boolean) => void
    item: {
        imgSrc: string
        imgAlt: string
        name: string
        description?: string
        technologies: string[]
        githubUrl: string
        demoUrl: string
    }
}

export default function ProjectCardDrawer({ onOpenChange, opened, item }: Props) {
    return (
        <Drawer open={opened} onOpenChange={onOpenChange}>
            <DrawerContent className="w-dvw focus-visible:outline-none">
                <div className="flex flex-col pt-4">
                    {/* image */}
                    <section className="w-full border-b border-dark-1">
                        <img src={item.imgSrc} alt={item.imgAlt} className="h-auto w-full object-cover" />
                    </section>

                    <section className="flex flex-col space-y-6 px-4 py-6">
                        <div className="flex flex-col space-y-1">
                            <h4 className="text-lg font-semibold leading-normal">{item.name}</h4>
                            <p className="text-sm leading-relaxed">{item.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                                <Badge key={`tech-${tech}`} label={tech} />
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* demo */}
                            <ShimmerLink text="View demo" href={item.demoUrl} className="grow" />

                            {/* github */}
                            <GithubButton
                                href={item.githubUrl}
                                text={item.githubUrl === 'private' ? 'Private' : 'View on Github'}
                                disabled={item.githubUrl === 'private'}
                                className="grow"
                            />
                        </div>
                    </section>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
