'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Canonical() {

    const [canonicalLink, setcanonicalLink] = useState("")
    const path = usePathname()

    useEffect(() => {
        setcanonicalLink(window?.location?.href)
    }, [path])


    if (!canonicalLink) return null

    return (

        <link
            rel="canonical"
            href={canonicalLink}
            key="canonical"
        />
    )

}

export default Canonical