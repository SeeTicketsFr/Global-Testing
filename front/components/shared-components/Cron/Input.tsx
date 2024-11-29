import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputCronProps {
    value: string;
    isFirst: boolean;
    isLast: boolean;
    onChange: any;
}

export function InputCron({value, isFirst, isLast, onChange}: InputCronProps) {
    return (
        <input
            className={cn("border bg-background pl-4 py-2 ring-offset-background relative flex h-10 md:w-10 w-2/6 items-center justify-center border- border-input text-sm transition-all",
                isFirst && "rounded-l-md border-l",
                isLast &&  "rounded-r-md"
            )}
            defaultValue={value}
            onChange={(e: any) => onChange(e.target.value)}
        />
    );
}


