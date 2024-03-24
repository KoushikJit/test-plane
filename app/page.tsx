"use client"
import Image from "next/image";
import HandRecognizerComponent from "./components/HandRecognizerComponent";
import { useEffect, useRef, useState } from "react";
import CloudComponent from "./components/CloudComponent";
import PlaneComponent from "./components/PlaneComponent";

export default function Home() {
  const planeRef = useRef(null)
  const [tilt, setTilt] = useState();
  const [degrees, setDegrees] = useState<number>(0)
  const [clouds, setClouds] = useState<any[]>([]);
  useEffect(() => {
    const cloudGenerationInterval =  1000; // Generate new clouds every 5 seconds
    const cloudRemovalInterval = 10000; // Remove clouds older than 8 seconds

    // Cloud generation interval
    const generationIntervalId = setInterval(() => {
      const now = Date.now();
      setClouds((prev) => [...prev, { time: now,  key: now + Math.random() }, { time: now,  key: now + Math.random() }, { time: now,  key: now + Math.random() }, { time: now,  key: now + Math.random() } ]);
    }, cloudGenerationInterval);

    // Cloud removal interval
    // const removalIntervalId = setInterval(() => {
    //   setClouds((prevClouds) => [...prevClouds].slice(1)); // Remove first four clouds
    // }, cloudRemovalInterval);
    const removalIntervalId = setInterval(() => {
      setClouds((prevClouds) => {
        const now = Date.now();
        return prevClouds.filter((cloud) => {
          // Assuming each cloud object has a 'createdAt' property
          return now - (cloud as any).time < cloudRemovalInterval;
        });
      });
    }, cloudRemovalInterval);

    // Cleanup function (runs when component unmounts)
    return () => {
      clearInterval(generationIntervalId);
      clearInterval(removalIntervalId);
    };
  }, []);

  const [left, setLeft] = useState<number>(0);
  const [plane, setPlane] = useState<any>(0)
  useEffect(() => {
    setLeft(window.innerWidth / 2 - 20)
  }, [])
  const setHandResults = (result: any) => {
    if (result.degrees && (result.degrees > 0 || result.degrees < 0)) {
      setLeft(prev => prev - result.degrees / 6)
      setDegrees(result.degrees);
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
        left: left,
        marginTop: '500px'
      }}>
        <PlaneComponent degrees={degrees} />
      </div>
      <div className="absolute w-screen h-screen overflow-hidden">
        {clouds.map((cloud, index) => {
          return <CloudComponent key={cloud.key} plane={plane} left={left} />
        })}
      </div>
    </main>
  );
}

