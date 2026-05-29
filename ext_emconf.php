<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Gedankenfolger Event',
    'description' => 'Events',
    'category' => 'fe',
    'author' => 'Niels Tiedt, Gedankenfolger GmbH',
    'author_email' => 'niels.tiedt@gedankenfolger.de',
    'state' => 'stable',
    'clearCacheOnLoad' => 1,
    'version' => '14.0.5',
    'autoload' => [
        'psr-4' => [
            'Gedankenfolger\\GedankenfolgerEvent\\' => 'Classes',
        ],
    ],
    'constraints' => [
        'depends' => [
            'typo3' => '14.0.0-14.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
