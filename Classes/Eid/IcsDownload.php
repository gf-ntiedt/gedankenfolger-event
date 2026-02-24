<?php
declare(strict_types=1);

namespace Gedankenfolger\GedankenfolgerEvent\Eid;

use Doctrine\DBAL\ParameterType;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class IcsDownload
{
    public static function handle(ServerRequestInterface $request): ResponseInterface
    {
        $uid = (int)($request->getQueryParams()['uid'] ?? 0);

        if ($uid <= 0) {
            return (new Response())->withStatus(400);
        }

        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getQueryBuilderForTable('tx_gedankenfolger_event');

        $event = $queryBuilder
            ->select('*')
            ->from('tx_gedankenfolger_event')
            ->where(
                $queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($uid, ParameterType::INTEGER))
            )
            ->executeQuery()
            ->fetchAssociative();

        if (!$event) {
            return (new Response())->withStatus(404);
        }

        $ics = self::buildIcs($event, $request);
        $filename = preg_replace('/[^a-z0-9_-]/i', '_', (string)($event['title'] ?? 'event')) . '.ics';

        $response = new Response();
        $response->getBody()->write($ics);

        return $response
            ->withHeader('Content-Type', 'text/calendar; charset=utf-8')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Cache-Control', 'no-cache, no-store');
    }

    private static function buildIcs(array $event, ServerRequestInterface $request): string
    {
        $host = $request->getUri()->getHost() ?: 'localhost';
        $uid = (int)($event['uid'] ?? 0);
        $now = gmdate('Ymd\THis\Z');

        $dtStart = self::formatDate($event['date_from'] ?? null);
        $dtEnd = self::formatDate($event['date_to'] ?? null);
        if ($dtEnd === '') {
            $dtEnd = $dtStart;
        }

        $lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Gedankenfolger GmbH//gedankenfolger_event//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:event-' . $uid . '@' . $host,
            'DTSTAMP:' . $now,
            'DTSTART:' . $dtStart,
            'DTEND:' . $dtEnd,
            'SUMMARY:' . self::escapeText((string)($event['title'] ?? '')),
        ];

        if (!empty($event['location'])) {
            $lines[] = 'LOCATION:' . self::escapeText((string)$event['location']);
        }

        $description = '';
        if (!empty($event['teaser'])) {
            $description = (string)$event['teaser'];
        } elseif (!empty($event['description'])) {
            $description = strip_tags((string)$event['description']);
        }
        if ($description !== '') {
            $lines[] = 'DESCRIPTION:' . self::escapeText($description);
        }

        $lines[] = 'END:VEVENT';
        $lines[] = 'END:VCALENDAR';

        $output = '';
        foreach ($lines as $line) {
            $output .= self::foldLine($line) . "\r\n";
        }

        return $output;
    }

    private static function formatDate(mixed $value): string
    {
        if (empty($value)) {
            return gmdate('Ymd\THis\Z');
        }
        $ts = is_numeric($value) ? (int)$value : strtotime((string)$value);
        if ($ts === false || $ts <= 0) {
            return gmdate('Ymd\THis\Z');
        }
        return gmdate('Ymd\THis\Z', $ts);
    }

    private static function escapeText(string $text): string
    {
        $text = str_replace('\\', '\\\\', $text);
        $text = str_replace(';', '\\;', $text);
        $text = str_replace(',', '\\,', $text);
        $text = str_replace(["\r\n", "\r", "\n"], '\\n', $text);
        return $text;
    }

    private static function foldLine(string $line): string
    {
        if (strlen($line) <= 75) {
            return $line;
        }
        $folded = '';
        while (strlen($line) > 75) {
            $folded .= substr($line, 0, 75) . "\r\n ";
            $line = substr($line, 75);
        }
        $folded .= $line;
        return $folded;
    }
}
