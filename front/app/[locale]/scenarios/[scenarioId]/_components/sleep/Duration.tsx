"use client";

import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStep } from "@/app/_hooks/useStep";
import { SleepStepAppTyped } from "@/app/_type/Step";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

enum ClockItem {
    HOURS,
    MINUTES,
    SECONDS,
    MILLISECONDS
}

export function Duration() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const { currentStep, updateStep } = useStep();
    const { duration } = currentStep as SleepStepAppTyped;
    const tDuration = useTranslations('step.duration');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, type: ClockItem) {
        const value = parseInt(event.target.value, 10) || 0;
        switch (type) {
            case ClockItem.HOURS:
                setHours(value);
                break;
            case ClockItem.MINUTES:
                setMinutes(value);
                break;
            case ClockItem.SECONDS:
                setSeconds(value);
                break;
            case ClockItem.MILLISECONDS:
                setMilliseconds(value);
                const newDuration = value;
                const newHours = Math.floor(newDuration / (1000 * 60 * 60));
                const newMinutes = Math.floor((newDuration % (1000 * 60 * 60)) / (1000 * 60));
                const newSeconds = Math.floor((newDuration % (1000 * 60)) / 1000);
                setHours(newHours);
                setMinutes(newMinutes);
                setSeconds(newSeconds);
                break;
            default:
                break;
        }

        if (type !== ClockItem.MILLISECONDS) {
            const newStep = {
                ...(currentStep as SleepStepAppTyped),
                duration: millisecondsCalculation(
                    type === ClockItem.HOURS ? value : hours,
                    type === ClockItem.MINUTES ? value : minutes,
                    type === ClockItem.SECONDS ? value : seconds
                )
            };
            updateStep(newStep);
        } else {
            const newStep = { ...(currentStep as SleepStepAppTyped), duration: value };
            updateStep(newStep);
        }
    }

    function millisecondsCalculation(hours: number, minutes: number, seconds: number) {
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    useEffect(() => {
        if (!_.isNull(currentStep) && !_.isUndefined(duration)) {
            const calculatedHours = Math.floor(duration / (1000 * 60 * 60));
            const calculatedMinutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            const calculatedSeconds = Math.floor((duration % (1000 * 60)) / 1000);

            setHours(calculatedHours);
            setMinutes(calculatedMinutes);
            setSeconds(calculatedSeconds);
            setMilliseconds(duration);
        }
    }, [duration, currentStep]);

    return (
        <div className="flex items-center flex-col md:flex-row md:items-end gap-2">
        <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
                {tDuration('hours')}
            </Label>
            <Input
                id="hours"
                type="number"
                onChange={(event) => handleChange(event, ClockItem.HOURS)}
                value={hours}
            />
        </div>
        <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
                {tDuration('minutes')}
            </Label>
            <Input
                id="minutes"
                type="number"
                onChange={(event) => handleChange(event, ClockItem.MINUTES)}
                value={minutes}
            />
        </div>
        <div className="grid gap-1 text-center">
            <Label htmlFor="seconds" className="text-xs">
                {tDuration('seconds')}
            </Label>
            <Input
                id="seconds"
                type="number"
                onChange={(event) => handleChange(event, ClockItem.SECONDS)}
                value={seconds}
            />
        </div>
        <div className="flex h-10 items-center">
            <Clock className="ml-2 h-4 w-4" />
        </div>
        <Separator orientation="vertical" className="px-8" />
        <div className="grid gap-1 text-center">
            <Label className="text-xs">
                {tDuration('total_milliseconds')}
            </Label>
            <Input
                id="milliseconds"
                type="number"
                onChange={(event) => handleChange(event, ClockItem.MILLISECONDS)}
                value={milliseconds}
            />
        </div>
        </div>
    );
}
