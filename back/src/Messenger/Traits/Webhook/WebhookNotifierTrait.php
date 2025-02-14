<?php

namespace App\Messenger\Traits\Webhook;

use App\Entity\Enum\WebhookEventType;
use App\Entity\Scenario;
use App\Entity\Webhook;
use App\Messenger\Traits\Http\HttpRequestTrait;

trait WebhookNotifierTrait
{
    use HttpRequestTrait;

    /**
     * Send a notification to a webhook.
     *
     * @param array<mixed> $payload
     * @param array<mixed> $headers
     */
    public function sendWebhookNotification(string $webhookUrl, array $payload, array $headers = []): void
    {
        if (empty($webhookUrl)) {
            dump('Webhook URL is empty. Notification not sent.');

            return;
        }

        try {
            $this->sendHttpRequest('POST', $webhookUrl, [
                'headers' => array_merge(['Content-Type' => 'application/json'], $headers),
                'json' => $payload,
            ]);
            dump("Webhook notification sent successfully to $webhookUrl");
        } catch (\Throwable $e) {
            dump('Error sending webhook notification: '.$e->getMessage(), [
                'exception' => $e,
                'url' => $webhookUrl,
                'payload' => $payload,
            ]);
        }
    }

    /**
     * Format the payload based on the webhook type.
     *
     * @return array<mixed>
     */
    public function formatWebhookPayload(Webhook $webhook, Scenario $scenario, WebhookEventType $eventType, string $message): array
    {
        $webhookData = $eventType->getWebhookData();

        $basePayload = [
            'scenario_id' => $scenario->getId(),
            'step' => $this->getStepName(),
            'error' => $message,
            'timestamp' => (new \DateTime())->format('c'),
        ];

        if ($webhook->getUrl() && str_contains($webhook->getUrl(), 'webhook.office.com')) {
            return [
                '@type' => 'MessageCard',
                '@context' => 'http://schema.org/extensions',
                'themeColor' => $webhookData['themeColor'],
                'summary' => $webhookData['summary'],
                'sections' => [
                    [
                        'activityTitle' => $webhookData['activityTitle'],
                        'facts' => [
                            ['name' => 'Event Type', 'value' => $eventType->value],
                            ['name' => 'Scenario ID', 'value' => $scenario->getId()],
                            ['name' => 'Step', 'value' => $this->getStepName()],
                            ['name' => 'Message', 'value' => $message],
                            ['name' => 'Timestamp', 'value' => (new \DateTime())->format('c')],
                        ],
                        'markdown' => true,
                    ],
                ],
            ];
        }

        return $basePayload;
    }
}
