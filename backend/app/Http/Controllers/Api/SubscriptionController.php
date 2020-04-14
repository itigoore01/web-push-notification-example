<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSubscriptionRequest;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function update(UpdateSubscriptionRequest $request)
    {
        /** @var \App\User $user */
        $user = auth()->user();

        $user->updatePushSubscription(
            $request->input('endpoint'),
            $request->input('keys.p256dh'),
            $request->input('keys.auth')
        );

        return response()->noContent();
    }

    public function delete(string $endpoint)
    {
        /** @var \App\User $user */
        $user = auth()->user();

        $user->deletePushSubscription($endpoint);

        return response()->noContent();
    }
}
