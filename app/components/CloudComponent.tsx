"use client"
import { Badge, Cloud, Mountain } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    plane?: any,
    left?: number
}
const fps = 30
let windowWidth: number;
let windowHeight: number;
const CloudComponent = ({ plane, left }: Props) => {
    const componentRef = useRef(null);
    let ySpeed = 2;
    const [xState, setXState] = useState(0)
    const [yState, setYState] = useState(-150)
    const mountainRef = useRef(null);
    const [collided, setCollided] = useState<boolean>(false);
    const [displayM, setDisplayM] = useState<string>();

    useEffect(() => {
        //0. get window width
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        //1. randomize x
        setXState(Math.random() * windowWidth);
        setYState(-Math.random() * (500-100) - 100);
        //2. move y with set interval
        const interval = setInterval(() => {
            // setYState((prevY) => prevY + ySpeed)
        }, 1000 / fps)
    }, [])

    useEffect(() => {
        setCollided(isColliding());
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
        <div ref={componentRef} className='moveDownClass' style={{
            position: 'absolute',
            left: xState,
            top: yState,
        }} >
            {/* <Image src={'/asteroid.png'} className='animate-spin-slow h-20 w-20' width={50} height={50} alt={''} /> */}
            <Badge ref={mountainRef} className={`w-10 h-10 animate-spin-slow ${collided ? 'fill-red-400' : ''} ${!collided ? 'fill-white' : ''} `} />
        </div>

    )
}

export default CloudComponent


