<?php

namespace App\Dto\ApiDocumentation;

final class ApiDocumentationFileOutput
{
    public function __construct(
        public mixed $file = null,
    ) {
    }
}
