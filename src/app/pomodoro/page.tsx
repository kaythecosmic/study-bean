'use client';
import IconButton from '@/components/IconButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React, { useEffect, useState } from 'react'
import { RotateCcw, Pause, Play } from 'lucide-react'

const PomodoroPage = () => {

    interface TimeState {
        hours: number;
        minutes: number;
        seconds: number;
    }

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<TimeState>({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    function handlePlay() {
        setIsRunning(true);
        setIsPaused(false);
        var newTime = {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        setTime(newTime);
    }

    function handleReset() {
        setIsRunning(false);
        setIsPaused(true);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }

    function handlePause() {
        setIsPaused(true);
    }

    useEffect(() => {
        var timeLeft = time.hours * 3600 + time.minutes * 60 + time.seconds * 1;
        let setIntervalID = setInterval(() => {

            if (!isPaused) {
                timeLeft = timeLeft - 1;
                let newHours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
                let newMinutes = Math.floor((timeLeft % (60 * 60)) / (60));
                let newSeconds = Math.floor(timeLeft % (60));
                if (timeLeft < 0) {
                    clearInterval(setIntervalID);
                    setIsRunning(false);
                }
                else {
                    setHours(newHours);
                    setMinutes(newMinutes);
                    setSeconds(newSeconds);
                }
            }

        }, 1000);

        return () => {
            clearInterval(setIntervalID);
        };
    }, [time, isPaused])

    return (
        <MaxWidthWrapper className="h-[100dvh] flex flex-col items-center justify-center">
            <div className='h-2/3 flex flex-col items-center justify-center p-10 w-full border rounded-md'>
                <h1 className=' text-4xl mb-10'>Pomodoro Session</h1>
                <div className="text-6xl font-semibold md:text-7xl lg:text-8xl xl:text-9xl">
                    {hours > 9 ? hours : "0" + hours} : {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </div>

                <section className='mx-auto font-bold mt-16 w-1/2 flex flex-row items-center justify-center gap-[15px]'>
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={12} min={0} placeholder='HH' id="hours" onChange={(e) => { setHours(parseInt(e.target.value)) }} /> :
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={59} min={0} placeholder='MM' id="hours" onChange={(e) => { setMinutes(parseInt(e.target.value)) }} /> :
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={59} min={0} placeholder='SS' id="hours" onChange={(e) => { setSeconds(parseInt(e.target.value)) }} />
                </section>

                <section className='mx-auto mt-10 w-1/3 flex flex-row items-center justify-evenly gap-[15px]'>
                    <IconButton label={isPaused ? "Start" : "Pause"} onclick={isPaused ? () => handlePlay() : () => handlePause()}>
                        {isPaused ? <Play /> : <Pause />}
                    </IconButton>
                    {isRunning ? <IconButton label={"Reset"} onclick={() => handleReset()}>
                        <RotateCcw />
                    </IconButton> : <></>}

                </section>

            </div>
        </MaxWidthWrapper>
    )
}

export default PomodoroPage
