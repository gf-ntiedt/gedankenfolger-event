<?php
declare(strict_types=1);

namespace Gedankenfolger\GedankenfolgerEvent\DataProcessing;

use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * DataProcessor to compute months that contain events.
 * Produces an associative array `monthsWithEvents` with keys '01'..'12' => true
 */
class EventMonthsProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ): array {
        $events = $processedData['events'] ?? [];
        $months = [];
        foreach ($events as $event) {
            $dateVal = $event['date_from'] ?? null;
            if ($dateVal === null) {
                continue;
            }
            // try numeric timestamp first
            if (is_numeric($dateVal)) {
                $ts = (int)$dateVal;
            } else {
                $ts = strtotime((string)$dateVal);
            }
            if ($ts === false || $ts <= 0) {
                continue;
            }
            $month = date('m', $ts); // zero-padded '01'..'12'
            $months[$month] = true;
        }

        $as = $cObj->stdWrapValue('as', $processorConfiguration, 'monthsWithEvents');
        $processedData[$as] = $months;

        return $processedData;
    }
}
