import { Element as ScrollerLookupElement } from 'react-scroll'
import { FlipWords } from '../ui/FlipWords'

const words = ['Software', 'Front-end', 'Back-end', 'Full-stack']

export default function Title() {
    return (
        <div className="flex max-w-[] flex-col space-y-1">
            <ScrollerLookupElement name="home">
                <p className="font-medium">Hello Everyone 👋,</p>
            </ScrollerLookupElement>
            <div className="text-2xl font-semibold text-dark-8 md:text-3xl xl:text-4xl">
                I'm a <FlipWords words={words} className="px-0" /> Engineer
            </div>
            <p className="text-sm font-medium md:text-base">
                I enjoy developing meaningful experiences & digital products accessible on the web.
            </p>
        </div>
    )
}
