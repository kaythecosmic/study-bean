import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const MaxWidthWrapper = ({
    className, children
}: {
    className?: String
    children: ReactNode
}) => {
    return (
        <div className={cn('mx-auto w-[90vw] sm:max-w-screen-md md:max-w-screen-2xl px2.5 md:px-20', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
