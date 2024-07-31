import { cn } from '@/lib/utils'
import Icons from './Icon'

interface Props {
    text: string
    href: string
    disabled?: boolean
    className?: string
}

const Style =
    'inline-flex h-10 items-center justify-center rounded-md bg-[#fff]  font-normal text-dark-4 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] transition duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(93,93,93,23%)]'

export default function GithubButton({ text, href, className, disabled = false }: Props) {
    return disabled ? (
        <button disabled className={cn(Style, 'cursor-not-allowed text-dark-2', className)}>
            {text}
            <Icons.externalLink className="ml-2 stroke-dark-2" />
        </button>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(Style, className)}>
            {text}
            <Icons.externalLink className="ml-2 stroke-dark-4" />
        </a>
    )
}
