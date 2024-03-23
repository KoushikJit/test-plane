"use client"
import { Cloud, Mountain } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    plane?: any,
    left?: number
}
const fps = 20
const CloudComponent = ({ plane, left }: Props) => {
    let ySpeed = 10 / fps;
    const [xState, setXState] = useState(0)
    const [yState, setYState] = useState(-150)
    const mountainRef = useRef(null);
    const [collided, setCollided] = useState<boolean>(false);
    const [displayM, setDisplayM] = useState<string>();

    useEffect(() => {
        //0. get window width
        const windowWidth = window.innerWidth;
        //1. randomize x
        setXState(Math.random() * windowWidth);
        //2. move y with set interval
        const interval = setInterval(() => {
            setYState((prevY) => prevY + ySpeed)
        }, 1000 / fps)
    }, [])
    useEffect(() => {
        setCollided(isColliding());
    }, [yState])

    function isColliding() {
        if (mountainRef.current) {
            const mountain = (mountainRef.current as any).getBoundingClientRect();
            return (mountain.left + 4 < plane.right &&
                mountain.right - 4 > plane.left &&
                mountain.top + 4 < plane.bottom &&
                mountain.bottom - 4 > plane.top)
        }
        return false
    }
    return (
        <div style={{
            position: 'absolute',
            left: xState,
            top: yState,
        }} >
            <Mountain ref={mountainRef} className={`w-32 h-32 ${collided ? 'fill-red-400' : ''}`} />
        </div>

    )
}

export default CloudComponent


