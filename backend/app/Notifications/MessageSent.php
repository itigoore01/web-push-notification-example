<?php

namespace App\Notifications;

use App\Notifications\WebPush\WebPushMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushChannel;

class MessageSent extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string
     */
    private $body;

    /**
     * Create a new notification instance.
     *
     * @param string $body
     */
    public function __construct(string $body)
    {
        $this->body = $body;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [WebPushChannel::class];
    }

    public function toWebPush() {
        // WebPushMessageがApp\Notifications/WebPushにある独自クラスである必要がある
        return (new WebPushMessage())
            ->title('Message received | Web push notification example')
            ->body($this->body)
            ->icon('/assets/icons/icon-128x128.png');
    }
}
