import { Plane, Rocket } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    degrees?: number
}

const PlaneComponent = ({ degrees }: Props) => {
    return (
        <div>
            <Rocket className='w-10 fill-red-500' style={{
                transform: "rotate(" + (-45 - degrees! / 6) + "deg)",
            }} />
        </div>
    )
}

export default PlaneComponent