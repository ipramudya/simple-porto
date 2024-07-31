import { DataTreeLinks } from '@/lib/constant'
import ShineLink from '../ui/ShineLink'

export default function TreeLinks() {
    return (
        <div className="flex flex-col space-y-6 pt-[2rem]">
            {DataTreeLinks.map((tlink) => (
                <ShineLink key={tlink.href} className="min-h-[48px] min-w-[300px]" text={tlink.label} href={tlink.href}>
                    <tlink.icon />
                </ShineLink>
            ))}
        </div>
    )
}
