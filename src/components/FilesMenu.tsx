import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/DropdownMenu'

interface Props {
    opened: boolean
    onOpenChange: (v: boolean) => void
}

export default function FilesMenu({ onOpenChange, opened }: Props) {
    return (
        <DropdownMenu open={opened} onOpenChange={onOpenChange}>
            <DropdownMenuContent className="absolute left-[52%] top-[-7rem] w-56 -translate-x-1/2">
                <DropdownMenuLabel>Files</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <a
                        className="block h-full w-full"
                        href="/files/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a
                        className="block h-full w-full"
                        href="/files/sertifikat-bnsp.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Certificate
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
