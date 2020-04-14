<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendMessageRequest;
use App\Notifications\MessageSent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function send(SendMessageRequest $request)
    {
        /** @var \App\User $user */
        $user = User::firstWhere('email', $request->input('to'));

        if ($user != null) {
            $user->notify(new MessageSent($request->input('body')));
        }

        return response()->noContent(201);
    }
}
