"use client"
import Image from "next/image";
import HandRecognizerComponent from "./components/HandRecognizerComponent";
import { useEffect, useRef, useState } from "react";
import CloudComponent from "./components/CloudComponent";
import PlaneComponent from "./components/PlaneComponent";
import { Loader, Loader2 } from "lucide-react";
import GameInfoOverlay from "./components/GameInfoOverlay";
import { scratch } from "./utils/audio";

const cloudGenerationInterval = 1000; // Generate new clouds every 5 seconds
const cloudRemovalInterval = 8000; // Remove clouds older than 8 seconds
let removalIntervalId: any;
let generationIntervalId: any;
export default function Home() {
  const [clouds, setClouds] = useState<any[]>([]);
  const [collisionDetected, setCollisionDetected] = useState(false);
  // plane states ////////////////////////////////////////////////
  const [isDetected, setIsDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [degrees, setDegrees] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [plane, setPlane] = useState<any>(0)
  const planeRef = useRef(null);

  useEffect(() => {
    // plane init position ////////////////////////////////////////////
    setLeft(window.innerWidth / 2 - 20)
  }, [])
  const setHandResults = (result: any) => {
    setIsLoading(prev => result.isLoading !== undefined ? result.isLoading : prev);
    setIsDetected(result.isDetected);
    setDegrees(result.degrees);
    if (result.degrees && (result.degrees > 0 || result.degrees < 0)) {
      setLeft(prev => prev - result.degrees / 6)
    }
    setPlane((planeRef.current as any).getBoundingClientRect());
  }
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (isDetected) {
      // Cloud generation interval
      generationIntervalId = setInterval(() => {
        const now = Date.now();
        setClouds((prev) => [...prev, { time: now, key: now + Math.random() }, { time: now, key: now + Math.random() }, { time: now, key: now + Math.random() }, { time: now, key: now + Math.random() }]);
      }, cloudGenerationInterval);
    }
    return () => {
      clearInterval(generationIntervalId);
    };
  }, [isDetected])

  useEffect(() => {
    if (isDetected) {
      removalIntervalId = setInterval(() => {
        setClouds((prevClouds) => {
          const now = Date.now();
          return prevClouds.filter((cloud) => {
            return now - (cloud as any).time < cloudRemovalInterval;
          });
        });
      }, cloudRemovalInterval);
    }
    return () => {
      clearInterval(removalIntervalId);
    };
  }, [isDetected])

  const collisionHandler = () => {
    setCollisionDetected(true);
    scratch();
    setTimeout(() => {
      setCollisionDetected(false);
    }, 100);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className={`absolute top-3 left-3 transition-all duration-500 ${isDetected ? 'w-20' : 'w-36'}`}>
        <HandRecognizerComponent setHandResults={setHandResults} />
      </div>
      <div ref={planeRef} style={{
        position: 'absolute',
        left: left,
        marginTop: '500px',
        transition: 'all',
        animationDuration: "10ms"
      }}>
        <PlaneComponent degrees={degrees} />
      </div>
      <div className="absolute z-10 w-screen h-screen overflow-hidden">
        {clouds.map((cloud, index) => {
          return <CloudComponent key={cloud.key} plane={plane} left={left} onCollision={collisionHandler} isMoving={isDetected} />
        })}
        <GameInfoOverlay info={{ isLoading, isDetected, collisionDetected }} />
      </div>
    </main>
  );


}

