import Badge from './Badge'
import { Dialog, DialogContent } from './Dialog'
import GithubButton from './GithubLink'
import Icons from './Icon'
import ShimmerLink from './ShimmerLink'

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

export default function CardDialog({ onOpenChange, opened, item }: Props) {
    return (
        <Dialog open={opened} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-screen-sm rounded-md p-0">
                <div className="relative w-full">
                    {/* close button */}
                    <div className="absolute right-3 top-3 rounded-full bg-white shadow-[0_4px_14px_0_rgb(0,0,0,10%)]">
                        <button
                            className="flex h-8 w-8 items-center justify-center border-none outline-none"
                            onClick={() => onOpenChange(false)}
                        >
                            <Icons.close className="size-5 stroke-red-600" />
                        </button>
                    </div>

                    <div className="flex flex-col">
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

                            <div className="flex w-full items-center justify-between gap-4">
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
                </div>
            </DialogContent>
        </Dialog>
    )
}
