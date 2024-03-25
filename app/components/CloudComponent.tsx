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
        const didCollide = isColliding();
        if (didCollide) {
            // setCollided(collision);
            onCollision();
        }
    }, [left])

    function isColliding() {
        if (mountainRef.current) {
            const mountain = (mountainRef.current as any).getBoundingClientRect();
            return (mountain.left + 30 < plane.right &&
                mountain.right - 30 > plane.left &&
                mountain.top + 30 < plane.bottom - 20 &&
                mountain.bottom - 20 > plane.top)
        }
        return false
    }
    return (
        <div className={`transition-all`} style={{
            position: 'absolute',
            animation: `shiftToDown 10s linear forwards`,
            left: xState,
            top: yState,
            animationPlayState: isMoving ? 'running' : 'paused'
        }} >
            <Image
                src={'/met.png'}
                ref={mountainRef}
                // className={`transition-all ${isMoving ? 'animate-spin-slow' : ''}`}
                style={{
                    animation: "spin 3s linear infinite",
                    animationPlayState: isMoving ? 'running' : 'paused',
                }}
                width={80} height={80} alt={''} />
        </div>
    )
}

export default CloudComponent


