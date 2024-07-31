import { FlipWords } from '../ui/FlipWords'

const words = ['Software', 'Front-end', 'Back-end', 'Full-stack']

export default function Title() {
    return (
        <div className="flex max-w-[] flex-col space-y-1">
            <p className="font-medium">Hello Everyone 👋,</p>
            <div className="text-4xl font-semibold text-dark-8">
                I'm a <FlipWords words={words} className="px-0" /> Engineer
            </div>
            <p className="font-medium">
                I enjoy developing meaningful experiences & digital products accessible on the web.
            </p>
        </div>
    )
}
