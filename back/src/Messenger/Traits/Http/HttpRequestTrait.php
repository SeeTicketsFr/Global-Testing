<?php

namespace App\Messenger\Traits\Http;

use App\Entity\POPO\HttpResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;

trait HttpRequestTrait
{
    private HttpClientInterface $client;

    public function setClient(HttpClientInterface $client): void
    {
        $this->client = $client;
    }

    /**
     * @param array<mixed> $options
     */
    protected function sendHttpRequest(string $method, string $url, array $options): ?HttpResponse
    {
        $response = $this->client->request(
            $method,
            $url,
            $options
        );

        $content = $response->getContent();
        $jsonContent = json_decode($content, true);

        return new HttpResponse(
            $response->getStatusCode(),
            $response->getHeaders(),
            (\is_array($jsonContent) && \count($jsonContent) > 0) ? $jsonContent : [$content]
        );
    }
}
