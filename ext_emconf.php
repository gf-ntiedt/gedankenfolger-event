<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Gedankenfolger Event',
    'description' => 'Event extension using Content Blocks, Site Set, Bootstrap CSS/SCSS and ICS export for TYPO3 14.',
    'category' => 'fe',
    'author' => 'Niels Tiedt, Gedankenfolger GmbH',
    'author_email' => 'niels.tiedt@gedankenfolger.de',
    'state' => 'stable',
    'clearCacheOnLoad' => 1,
    'version' => '14.0.6',
    'autoload' => [
        'psr-4' => [
            'Gedankenfolger\\GedankenfolgerEvent\\' => 'Classes',
        ],
    ],
    'constraints' => [
        'depends' => [
            'typo3' => '14.3.0-14.99.99',
            'content_blocks' => '2.0.0-2.99.99',
        ],
        'conflicts' => [],
        'suggests' => [
            'ws_scss' => '14.0.0-14.99.99',
        ],
    ],
];
