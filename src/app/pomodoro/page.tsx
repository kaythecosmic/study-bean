'use client';
import IconButton from '@/components/IconButton'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React, { useEffect, useState } from 'react'
import { RotateCcw, Pause, Play, Plus } from 'lucide-react'

const PomodoroPage = () => {

    interface TimeState {
        hours: number;
        minutes: number;
        seconds: number;
    }

    const presetTimes: { [key: string]: TimeState } = {
        "00-50-00": { hours: 0, minutes: 50, seconds: 0 },
        "00-10-00": { hours: 0, minutes: 10, seconds: 0 },
        "00-01-00": { hours: 0, minutes: 1, seconds: 0 },
        "00-05-00": { hours: 0, minutes: 5, seconds: 0 },
        "00-30-00": { hours: 0, minutes: 30, seconds: 0 },
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
    const [errorMessage, setErrorMessage] = useState<string>("")

    function handlePlay() {
        var newTime = {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        if (newTime.hours == 0 &&
            newTime.minutes == 0 &&
            newTime.seconds == 0) {
            setErrorMessage("Please set a valid timer amount.")
        } else {
            setErrorMessage("")
            var hourBox = document.getElementById("textbox-hours") as HTMLInputElement;
            var minuteBox = document.getElementById("textbox-minutes") as HTMLInputElement;
            var secondBox = document.getElementById("textbox-seconds") as HTMLInputElement;

            hourBox.value = "";
            minuteBox.value = "";
            secondBox.value = "";

            setIsRunning(true);
            setIsPaused(false);
            setTime(newTime);
        }

    }

    function handleReset() {
        setIsRunning(false);
        setIsPaused(true);
        setHours(time.hours);
        setMinutes(time.minutes);
        setSeconds(time.seconds);
    }

    function handlePause() {
        setIsPaused(true);
    }

    function addPresetTimer(preset: string) {
        const selectPresetTime = presetTimes[preset]
        setHours(selectPresetTime.hours);
        setMinutes(selectPresetTime.minutes);
        setSeconds(selectPresetTime.seconds);
    }

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        setErrorMessage("");
        const timeSectionID = event.target.id;

        if (parseInt(event.target.value) <= 59) {
            if (timeSectionID == "textbox-seconds") {
                setSeconds(parseInt(event.target.value ? event.target.value : "0"));
            } else if (timeSectionID == "textbox-minutes") {
                setMinutes(parseInt(event.target.value ? event.target.value : "0"));
            } else {
                setHours(parseInt(event.target.value ? event.target.value : "0"));
            }

        }
        else {
            setErrorMessage("Invalid timer input.");
            if (event.target.id == "textbox-seconds") {
                setSeconds(0);
            } else if (timeSectionID == "textbox-minutes") {
                setMinutes(0);
            } else {
                setHours(0);
            }
        }
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
                    setIsPaused(true);
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

        <MaxWidthWrapper className=" mt-5 flex flex-col lg:min-h-screen lg:w-[80vw] 2xl:flex-row items-center justify-center gap-5">
            <div className='w-full flex flex-col items-center justify-center p-10 md:w-full 2xl:h-2/3 border rounded-md'>
                <h1 className='text-2xl font-bold lg:text-4xl mb-10'>Pomodoro Session</h1>
                <div className="w-full text-center text-5xl font-semibold md:text-6xl lg:text-7xl 2xl:text-8xl min-[1640px]:text-9xl">
                    {hours > 9 ? hours : "0" + hours} : {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </div>

                <section className='mx-auto font-bold mt-16 w-1/2 flex flex-row items-center justify-center gap-[15px]'>
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={12} min={0} placeholder='HH' id="textbox-hours" onChange={(e) => { handleFormChange(e) }} /> :
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={59} min={0} placeholder='MM' id="textbox-minutes" onChange={(e) => { handleFormChange(e) }} /> :
                    <input className='p-3 border rounded-md text-center focus:outline-none font-medium' type="number" name="hours" max={59} min={0} placeholder='SS' id="textbox-seconds" onChange={(e) => { handleFormChange(e) }} />
                </section>

                <section className='mx-auto mt-10 w-1/3 flex justify-center items-center'>
                    <span className='text-center text-red-700 font-medium h-4'> {errorMessage} </span>
                </section>

                <section className='mx-auto mt-5 lg:w-1/3 flex flex-row items-center justify-evenly gap-[15px]'>
                    <IconButton label={isPaused ? "Start" : "Pause"} onclick={isPaused ? () => handlePlay() : () => handlePause()}>
                        {isPaused ? <Play /> : <Pause />}
                    </IconButton>
                    {isRunning ? <IconButton label={"Reset"} onclick={() => handleReset()}>
                        <RotateCcw />
                    </IconButton> : <></>}
                </section>
            </div>

            {/* Right aside for Preset Timers */}
            <div className='relative h-auto w-full flex flex-col items-center justify-start p-5 border rounded-md 2xl:h-2/3 2xl:w-1/3 overflow-y-scroll no-scrollbar'>
                <h1 className='text-2xl mb-5 w-full font-bold sticky z-10 bg-gradient-to-b from-white to-transparent via-white'>Preset Timers</h1>
                {
                    Object.keys(presetTimes).map((key) => (
                        <div key={key} className='w-full border mt-2 p-2 flex flex-row justify-between items-center rounded-md'>
                            <span className='font-bold text-xl'>
                                {presetTimes[key].hours > 9 ? presetTimes[key].hours : "0" + presetTimes[key].hours} : {presetTimes[key].minutes > 9 ? presetTimes[key].minutes : "0" + presetTimes[key].minutes} : {presetTimes[key].seconds > 9 ? presetTimes[key].seconds : "0" + presetTimes[key].seconds}
                            </span>
                            <IconButton className="font-bold borderno" label="Add" onclick={() => addPresetTimer(key)}>
                                <Plus />
                            </IconButton>
                        </div>
                    ))
                }
            </div>
        </MaxWidthWrapper>
    )
}

export default PomodoroPage
