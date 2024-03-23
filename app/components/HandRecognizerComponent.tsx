"use client"
import React, { useEffect, useRef } from 'react'
import { HandLandmarker, FilesetResolver, HandLandmarkerResult } from '@mediapipe/tasks-vision';


type Props = {
    setHandResults: (result: any) => void;
}

let interval: any;
const HandRecognizerComponent = ({ setHandResults }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        initVideoAndModel();
        return () => {
            //clear
            clearInterval(interval);
        }
    }, [])

    // ready video/ webcam ///////////////////////////
    async function initVideoAndModel() {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        //1. init video
        await initVideo(videoElement);
        //2. init model
        const handLandmarker = await initModel();
        //3. set interval
        interval = setInterval(() => {
            const detections: HandLandmarkerResult = handLandmarker.detectForVideo(videoElement, Date.now());
            deduceResult(detections, setHandResults)
        }, 1000 / 30);
    }
    return (
        <div className='border-2 border-gray-700'>
            <video ref={videoRef} className='-scale-x-1' style={{}} />
        </div>
    )
}

export default HandRecognizerComponent

async function initVideo(videoElement: HTMLVideoElement) {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });
    videoElement.srcObject = stream;
    videoElement.addEventListener("loadeddata", () => {
        videoElement.play();
    });
}

async function initModel() {
    const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                delegate: "GPU"
            },
            numHands: 2,
            //@ts-ignore
            runningMode: 'LIVE_STREAM',
            result_callback: () => {
                console.log('result callback');
            }
        });
    return handLandmarker;
}
function deduceResult(detections: HandLandmarkerResult, setHandResults: (result: any) => void) {
    if (detections && detections.handedness.length > 1) {
        const rightIndex =
            detections.handedness[0][0].categoryName === "Right" ? 0 : 1;
        const leftIndex = rightIndex === 0 ? 1 : 0;

        const {
            x: rightX,
            y: rightY,
            z: rightZ,
        } = detections.landmarks[rightIndex][6]; // getting the index finger pip position
        const {
            x: leftX,
            y: leftY,
            z: leftZ,
        } = detections.landmarks[leftIndex][6]; // getting the index finger pip position

        const tilt = (rightY - leftY) / (rightX - leftX);
        const degrees = (Math.atan(tilt) * 180) / Math.PI;

        setHandResults({
            tilt, degrees
        })
    } else {

    }
}

