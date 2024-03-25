import { Loader2 } from 'lucide-react';
import React from 'react'

type Props = {
    info?: any
}

const GameInfoOverlay = ({ info }: Props) => {
    const { isLoading, isDetected, collisionDetected } = info;
    return (
        <div className={`h-screen w-screen overflow-hidden flex items-center justify-center ${collisionDetected ? 'border-red-600 border-[8px]' : ''}`}>
            {(!isLoading && !isDetected) && <div className="animate-ping text-2xl font-extrabold">P A U S E D</div>}
            {isLoading && <div className="animate-pulse"><Loader2 size={50} className="animate-spin" /></div>}
        </div>
    )
}

export default GameInfoOverlay