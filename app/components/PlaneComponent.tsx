import { Plane } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const PlaneComponent = ({ }: Props) => {
    return (
        <div>
            <Plane className='-rotate-45 w-10' />
        </div>
    )
}

export default PlaneComponent