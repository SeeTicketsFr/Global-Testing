import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { WebhookEventTypeEnum } from "@/services";

interface WebhookEventTypeProps {
    field: {
        onChange: (value: string) => void,
        value?: string
    }
}

export function WebhookEventType(props: WebhookEventTypeProps) {
  const { field } = props;

  return (
    <Select
      onValueChange={field.onChange}
      value={field.value}
      defaultValue={WebhookEventTypeEnum.on_failure}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {Object.values(WebhookEventTypeEnum).map((theme: WebhookEventTypeEnum) => (
                <SelectItem key={theme} value={theme}>
                    {theme}
                </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
