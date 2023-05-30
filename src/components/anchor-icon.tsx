import type { FunctionComponent, PropsWithChildren } from "preact/compat"

interface Props extends PropsWithChildren {
    href: string
}

const AnchorIcon: FunctionComponent<Props> = ({ href, children }) => {
    return (
        <button
            class="absolute right-0 z-30 rounded-full border border-dark-1 p-2"
            onClick={() => {
                console.log("runs")
            }}
        >
            {children}
        </button>
    )
}

export default AnchorIcon
