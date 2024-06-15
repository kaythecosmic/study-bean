import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const IconButton = ({
    className, children, label, onclick
}: {
    className?: String
    children: ReactNode
    label?: String
    onclick?: any
}) => {
    return (
        <button
            className={cn('p-3 rounded-md border transition hover:bg-primary-0 hover:text-white', className)}
            onClick={onclick}
        >
            <span className='flex flex-row gap-3'>
                {children} {label}
            </span>
        </button>
    )
}

export default IconButton
