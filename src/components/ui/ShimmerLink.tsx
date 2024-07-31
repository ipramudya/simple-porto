import { cn } from '@/lib/utils'

interface Props {
    text: string
    href: string
    className?: string
}

export default function ShimmerLink({ text, href, className }: Props) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-dark-12 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-dark-1 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
                className,
            )}
        >
            {text}
        </a>
    )
}
