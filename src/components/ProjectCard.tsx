import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { useState } from 'react'
import ProjectCardDialog from './ProjectCardDialog'
import ProjectCardDrawer from './ProjectCardDrawer'
import Badge from './ui/Badge'

interface Props {
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

export default function ProjectCard({ item }: Props) {
    const [opened, setOpened] = useState(false)
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <>
            {isMobile ? (
                <ProjectCardDrawer opened={opened} onOpenChange={setOpened} item={item} />
            ) : (
                <ProjectCardDialog opened={opened} onOpenChange={setOpened} item={item} />
            )}

            <div
                role="button"
                className="group relative z-20 h-full cursor-pointer rounded-lg border border-transparent p-3 pb-6 transition duration-500 hover:border-dark-2"
                onClick={() => setOpened(true)}
            >
                <div className="flex flex-col space-y-3">
                    <img
                        src={item.imgSrc}
                        alt={item.imgAlt}
                        width={720}
                        height={undefined as any}
                        className="aspect-[16/9] w-full overflow-hidden rounded-lg object-fill shadow-md transition duration-500"
                    />

                    <div className="flex grow flex-col space-y-1">
                        <h4 className="line-clamp-1 text-lg font-semibold leading-normal">{item.name}</h4>
                        <p className="line-clamp-2 grow text-sm">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                            <Badge key={`tech-card-${tech}`} label={tech} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
