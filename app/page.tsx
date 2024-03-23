"use client"
import Image from "next/image";
import HandRecognizerComponent from "./components/HandRecognizerComponent";
import { useEffect, useRef, useState } from "react";
import CloudComponent from "./components/CloudComponent";
import PlaneComponent from "./components/PlaneComponent";

export default function Home() {
  const planeRef = useRef(null)
  const [tilt, setTilt] = useState();
  const [degrees, setDegrees] = useState()
  const [clouds, setClouds] = useState<{}[]>([{}]);
  useEffect(() => {
    setInterval(() => {
      setClouds((prev) => [...prev, {}])
    }, 10000 / 2); // Generate new clouds every x seconds
  }, []);
  const [left, setLeft] = useState<number>(0);
  const [plane, setPlane] = useState<any>(0)
  useEffect(() => {
    setLeft(window.innerWidth / 2 - 20)
  }, [])
  const setHandResults = (result: any) => {
    if (result.degrees && (result.degrees > 0 || result.degrees < 0)) {
      setLeft(prev => prev - result.degrees / 10)
    }
    setPlane((planeRef.current as any).getBoundingClientRect());
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-3 left-3 h-12 w-20">
        <HandRecognizerComponent setHandResults={setHandResults} />
      </div>
      <div ref={planeRef} style={{
        position: 'absolute',
        left: left
      }}>
        <PlaneComponent />
      </div>
      {clouds.map((cloud, index) => {
        return <CloudComponent key={index} plane={plane} left={left} />
      })}
    </main>
  );
}

