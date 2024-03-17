import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const MaxWidthWrapper = ({
    className, children
}: {
    className?: String
    children: ReactNode
}) => {
    return (
        <div className={cn('mx-auto w-[90vw] sm:max-w-screen-sm md:max-w-screen-xl px2.5 md:px-20', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
