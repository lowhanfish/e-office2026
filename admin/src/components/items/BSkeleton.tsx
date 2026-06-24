import React from 'react'

interface BSkeletonTableProps {
    limit: number
}

export const BSkeletonTable = ({ limit }: BSkeletonTableProps) => {
    return (
        <div className="animate-pulse">
            {
                [...Array(limit)].map((data, index) => (
                    <div key={index}>
                        <div className="h-7 bg-b-gray-2 mb-2"></div>
                    </div>
                ))
            }
        </div>
    )
}


