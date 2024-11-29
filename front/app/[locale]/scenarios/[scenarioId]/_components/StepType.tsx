import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HttpMethodsProps {
    StepTypeEnum: any,
    field: {
        onChange: (value: string) => void,
        value?: string
    }
}

export function StepType(props: HttpMethodsProps) {
  const { StepTypeEnum, field } = props;

  return (
    <Select
      onValueChange={field.onChange}
      value={field.value}
      defaultValue={StepTypeEnum.HttpStep}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
                {Object.values(StepTypeEnum).map((theme: typeof StepTypeEnum) => (
                <SelectItem key={theme} value={theme}>
                    {theme}
                </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
