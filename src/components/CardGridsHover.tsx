import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Card from './Card'

interface Props {
    items: {
        imgSrc: string
        imgAlt: string
        name: string
        description?: string
        technologies: string[]
    }[]
    className?: string
}

export default function CardGridsHover({ items, className }: Props) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
            {items.map((item, idx) => (
                <div
                    key={item.imgAlt}
                    className="group relative block h-full w-full p-2"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 block h-full w-full rounded-3xl bg-[#F6F6F6]"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <Card {...item} />
                </div>
            ))}
        </div>
    )
}
