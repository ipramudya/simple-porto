import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './DropdownMenu'

interface Props {
    opened: boolean
    onOpenChange: (v: boolean) => void
}

export default function FilesMenu({ onOpenChange, opened }: Props) {
    return (
        <DropdownMenu open={opened} onOpenChange={onOpenChange}>
            <DropdownMenuContent className="w-56">
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
