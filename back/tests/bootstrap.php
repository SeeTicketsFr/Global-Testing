<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

if (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->overload(dirname(__DIR__).'/.env.test');
}

system('php bin/console app:tests:load-fixtures --env=test');
