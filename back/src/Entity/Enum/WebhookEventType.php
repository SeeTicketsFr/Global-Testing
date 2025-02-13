<?php

namespace App\Entity\Enum;

enum WebhookEventType: string
{
    case ON_FAILURE = 'onFailure';
    case ON_SUCCESS = 'onSuccess';

    /**
     * Return specific data for each event type.
     *
     * @return array<mixed>
     */
    public function getWebhookData(): array
    {
        return match ($this) {
            WebhookEventType::ON_FAILURE => [
                'activityTitle' => '🚨 Error while executing the scenario',
                'summary' => 'Scenario Execution Failure',
                'themeColor' => 'FF0000',
            ],
            WebhookEventType::ON_SUCCESS => [
                'activityTitle' => '✅ Scenario executed successfully',
                'summary' => 'Scenario Execution Success',
                'themeColor' => '00FF00',
            ],
        };
    }
}
