<?php

declare(strict_types=1);

namespace Gedankenfolger\GedankenfolgerEvent\DataProcessing;

use TYPO3\CMS\Core\LinkHandling\TypoLinkCodecService;
use TYPO3\CMS\Core\LinkHandling\TypolinkParameter;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * DataProcessor to decode a raw TCA type=link field value into a TypolinkParameter object.
 *
 * The `database-query` DataProcessor returns raw database rows without any TCA-aware
 * type transformation, so type=link fields stay plain typolink-syntax strings instead
 * of being resolved to TypolinkParameter objects the way Content Blocks resolves its own
 * fields. This processor closes that gap for a single configured field, so Fluid can use
 * the standard `.url` / `.title` property access pattern on it.
 *
 * @author  Niels Tiedt <niels.tiedt@gedankenfolger.de>
 * @company Gedankenfolger GmbH
 */
class LinkFieldProcessor implements DataProcessorInterface
{
    /**
     * @param TypoLinkCodecService $typoLinkCodecService Decodes raw typolink-syntax strings into their component parts
     */
    public function __construct(
        private readonly TypoLinkCodecService $typoLinkCodecService,
    ) {}

    /**
     * @param ContentObjectRenderer $cObj The data of the content element or page
     * @param array $contentObjectConfiguration The configuration of Content Object
     * @param array $processorConfiguration The configuration of this processor
     * @param array $processedData Key/value store of processed data (e.g. to be passed to a Fluid View)
     * @return array the processed data as key/value store
     */
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ): array {
        $fieldName = $cObj->stdWrapValue('fieldName', $processorConfiguration);
        if ($fieldName === '') {
            return $processedData;
        }

        $rawValue = $processedData['data'][$fieldName] ?? null;

        $processedData['data'][$fieldName] = ($rawValue === null || $rawValue === '')
            ? null
            : TypolinkParameter::createFromTypolinkParts($this->typoLinkCodecService->decode((string)$rawValue));

        return $processedData;
    }
}
