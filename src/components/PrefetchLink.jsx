'use client'

import Link from "next/link"

const PrefetchLink = ({ href, children }) => {
    return (
        <>
            <Link prefetch={true} href={href} className="text-xl hover:text-[#FF8b60]">{children}</Link>
        </>
    )
}

export default PrefetchLink