import { ReactNode } from 'react'

type childrenProps = {
    children: ReactNode
}

const layout = ({ children }: childrenProps) => {
    return (
        <div className='grid h-full w-full'>
            {children}
        </div>
    )
}

export default layout
