export default function cx(...classes: string[]): string {
    const classList = classes.join(" ").trim().split(/\s+/)
    const classMap = new Map<string, string>()

    for (const cls of classList) {
        const [key, value] = cls.split(":")
        if (classMap.has(key)) {
            const existingValue = classMap.get(key)
            classMap.set(key, existingValue + " " + value)
        } else {
            classMap.set(key, value)
        }
    }

    return Array.from(classMap.entries())
        .map(([key, value]) => (value ? key + ":" + value : key))
        .join(" ")
}
