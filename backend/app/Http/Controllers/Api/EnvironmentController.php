<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EnvironmentResource;
use Illuminate\Http\Request;

class EnvironmentController extends Controller
{
    public function get() {
        return response()->json([
            'application_server_key' => config('webpush.vapid.public_key'),
        ]);
    }
}
