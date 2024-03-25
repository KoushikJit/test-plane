"use client"
import { Badge, Cloud, Mountain } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    plane?: any,
    left?: number,
    onCollision: () => void,
    isMoving?: boolean
}
let windowWidth: number;
const CloudComponent = ({ plane, left, onCollision, isMoving }: Props) => {
    const componentRef = useRef(null);
    const [xState, setXState] = useState(0)
    const [yState, setYState] = useState(-150)
    const mountainRef = useRef(null);
    const [collided, setCollided] = useState<boolean>(false);

    useEffect(() => {
        //0. get window width
        windowWidth = window.innerWidth;
        //1. randomize x and y
        setXState(Math.random() * windowWidth);
        setYState(-Math.random() * (500 - 100) - 100);
    }, [])

    useEffect(() => {
        const collision = isColliding;
        setCollided(collision);
        onCollision();
    }, [left])

    function isColliding() {
        if (mountainRef.current) {
            const mountain = (mountainRef.current as any).getBoundingClientRect();
            return (mountain.left + 20 < plane.right &&
                mountain.right - 20 > plane.left &&
                mountain.top + 20 < plane.bottom &&
                mountain.bottom - 20 > plane.top)
        }
        return false
    }
    return (
        <div ref={componentRef} className={`transition-all`} style={{
            position: 'absolute',
            animation: `shiftToDown 10s linear forwards`,
            left: xState,
            top: yState,
            animationPlayState: isMoving ? 'running' : 'paused'
        }} >
            <Image
                src={'/4.png'}
                // className={`transition-all ${isMoving ? 'animate-spin-slow' : ''}`}
                style={{
                    animation: "spin 3s linear infinite",
                    animationPlayState: isMoving ? 'running' : 'paused'
                }}
                width={80} height={80} alt={''} />
            {/* <Badge ref={mountainRef} className={`w-10 h-10 animate-spin-slow ${collided ? 'fill-red-400' : ''} ${!collided ? 'fill-white' : ''} `} /> */}
        </div>

    )
}

export default CloudComponent


