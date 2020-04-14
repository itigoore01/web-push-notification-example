<?php

namespace App\Notifications;

use App\Notifications\WebPush\WebPushMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushChannel;

class Reminder extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string
     */
    private $content;

    /**
     * Create a new notification instance.
     *
     * @param string $content
     */
    public function __construct(string $content)
    {
        $this->content = $content;
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

    /**
     * @return WebPushMessage
     */
    public function toWebPush()
    {
        return (new WebPushMessage())
            ->title('Reminder | Web push notification example')
            ->body($this->content)
            ->icon('/assets/icons/icon-128x128.png');
    }
}
