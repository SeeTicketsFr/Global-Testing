<?php

namespace App\Tests\Mock\Sqs;

use Aws\Result;
use Aws\Sqs\SqsClient;

class AwsSqsMock extends SqsClient
{
    /**
     * @param array<mixed> $args
     */
    public function __construct(array $args)
    {
        parent::__construct(array_merge($args, ['service' => 'sqs']));
    }

    /**
     * @return Result<string, mixed>
     */
    public function sendMessage($args = []): Result
    {
        $json = json_encode($args);
        $md5 = md5(\is_string($json) ? $json : 'Failed to encode json');

        return new Result([
            'MessageId' => 'mock-message-id',
            'MD5OfMessageBody' => $md5,
            'SequenceNumber' => 'mock-sequence-number',
        ]);
    }
}
