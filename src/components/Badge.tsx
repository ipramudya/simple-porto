export default function Badge({ label }: { label: string }) {
    return (
        <div
            className={
                'flex h-6 cursor-default items-center justify-center rounded-sm bg-gradient-to-r from-dark-1 to-dark-2/30 px-2 group-hover:from-dark-10 group-hover:to-dark-6'
            }
        >
            <p className="text-xs font-semibold text-dark-12 group-hover:!text-white">{label}</p>
        </div>
    )
}
