import Badge from './Badge'

interface Props {
    imgSrc: string
    imgAlt: string
    name: string
    description?: string
    technologies: string[]
}

export default function Card({ imgSrc, imgAlt, name, description, technologies }: Props) {
    return (
        <div className="group relative z-20 h-full rounded-lg border border-transparent p-3 pb-6 transition duration-500 hover:border-dark-2">
            <div className="flex flex-col space-y-3">
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    width={720}
                    height={undefined as any}
                    className="aspect-[16/9] w-full overflow-hidden rounded-lg object-fill shadow-md transition duration-500 group-hover:scale-[1.015]"
                />

                <div className="flex grow flex-col space-y-1">
                    <h4 className="line-clamp-1 text-lg font-semibold leading-normal">{name}</h4>
                    <p className="line-clamp-2 grow text-sm">{description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <Badge label={tech} />
                    ))}
                </div>
            </div>
        </div>
    )
}
