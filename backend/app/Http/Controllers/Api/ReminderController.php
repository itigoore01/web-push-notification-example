<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReminderRequest;
use App\Notifications\Reminder;
use Illuminate\Http\Request;

class ReminderController extends Controller
{
    public function store(StoreReminderRequest $request)
    {
        /** @var \App\User $user */
        $user = auth()->user();

        $remindAt = $request->input('remind_at');
        $when = now()->diff($remindAt);

        $user->notify(
            (new Reminder($request->input('content')))
                ->delay($when)
        );

        return response()->noContent(201);
    }
}
