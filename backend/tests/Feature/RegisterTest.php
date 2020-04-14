<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegister()
    {
        $request = [
            'email' => 'test_user@localhost',
            'password' => 'password'
        ];
        $response = $this->get('/api/register', $request);

        $response->assertCreated();
        $this->assertDatabaseHas('users', [
            'email' => $request['email']
        ]);
        $this->assertAuthenticatedAs(User::firstWhere('email', $request['email']));
    }
}
