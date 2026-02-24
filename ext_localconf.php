<?php
declare(strict_types=1);

defined('TYPO3') or die();

$GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['event_ics'] =
    \Gedankenfolger\GedankenfolgerEvent\Eid\IcsDownload::class . '::handle';
