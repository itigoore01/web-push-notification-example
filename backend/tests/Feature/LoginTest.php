<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $user = factory(User::class)->make();

        $response = $this->postJson('/api/login', [
            'email' => $user->name,
            'password' => 'password',
            'remember' => false,
        ]);

        $response->dump();
        $response->assertNoContent();
        $this->assertAuthenticatedAs($user, 'auth:api');
    }
}
