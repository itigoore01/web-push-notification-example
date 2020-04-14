<?php


namespace App\Notifications\WebPush;


class WebPushMessage extends \NotificationChannels\WebPush\WebPushMessage
{
    public function toArray()
    {
        // Angular標準のngsw-worker.jsはnotification以下にtitleなどがないと通知を表示できない
        return [
            'notification' => parent::toArray()
        ];
    }
}
