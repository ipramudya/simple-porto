'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { forwardRef, type PropsWithChildren, type ReactNode, useRef } from 'react'

import { cn } from '@/lib/utils'

export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string
    magnification?: number
    distance?: number
    direction?: 'top' | 'middle' | 'bottom'
    children: ReactNode
    disable?: boolean
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
    'mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md',
)

const Dock = forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            direction = 'bottom',
            disable = false,
            ...props
        },
        ref,
    ) => {
        const mousex = useMotionValue(Infinity)

        const renderChildren = () => {
            return React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    mousex: mousex,
                    magnification: magnification,
                    distance: distance,
                })
            })
        }

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => {
                    if (disable) return
                    mousex.set(e.pageX)
                }}
                onMouseLeave={() => {
                    if (disable) return
                    mousex.set(Infinity)
                }}
                {...props}
                className={cn(dockVariants({ className }), {
                    'items-start': direction === 'top',
                    'items-center': direction === 'middle',
                    'items-end': direction === 'bottom',
                })}
            >
                {renderChildren()}
            </motion.div>
        )
    },
)

Dock.displayName = 'Dock'

export interface DockIconProps {
    size?: number
    magnification?: number
    distance?: number
    mousex?: any
    className?: string
    children?: React.ReactNode
    props?: PropsWithChildren
    onClick?: VoidFunction
}

const DockIcon = ({
    size,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mousex,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const distanceCalc = useTransform(mousex, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

        return val - bounds.x - bounds.width / 2
    })

    const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40])

    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                'flex aspect-square cursor-pointer items-center justify-center rounded-full hover:bg-dark-1',
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

DockIcon.displayName = 'DockIcon'

export { Dock, DockIcon, dockVariants }
