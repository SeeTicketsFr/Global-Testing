<?php

declare(strict_types=1);

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__.'/src')
    ->in(__DIR__.'/tests')
    ->append([
        __FILE__,
    ])
;

$config = new PhpCsFixer\Config();

return $config->setRules([
    '@PSR2' => true,
    '@PHP81Migration' => true,
    '@Symfony' => true,
    '@Symfony:risky' => true,
    'array_syntax' => ['syntax' => 'short'],
    'echo_tag_syntax' => ['format' => 'long'],
    'no_unreachable_default_argument_value' => true,
    'no_useless_else' => true,
    'no_useless_return' => true,
    'strict_comparison' => true,
    'nullable_type_declaration_for_default_null_value' => true,
])
    ->setFinder($finder)
    ->setRiskyAllowed(true)
    ->setLineEnding("\n")
;
