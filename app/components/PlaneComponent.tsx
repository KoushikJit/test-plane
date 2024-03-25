import { Plane, Rocket } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    degrees?: number
}

const PlaneComponent = ({ degrees }: Props) => {
    return (
        <div>
            <Rocket size={40} className= 'fill-red-600 transition-transform duration-75' style={{
                transform: "rotate(" + (-45 - degrees! / 6) + "deg)",
            }} />
        </div>
    )
}

export default PlaneComponent