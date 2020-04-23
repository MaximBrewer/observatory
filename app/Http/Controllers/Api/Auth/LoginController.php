<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User as UserResource;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;


    public function login(Request $request)
    {
        // Проверяем существует ли пользователь с указанным email адресом
        $user = User::whereEmail(request('email'))->first();

        if (!$user) {
            return response()->json([
                'message' => 'Wrong email or password',
                'status' => 422,
                'errors' => [
                    'password' => [__("Wrong email or password")],
                    'email' => [__("Wrong email or password")]
                ]
            ], 422);
        }

        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (
            method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)
        ) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if (!$this->attemptLogin($request)) {
            return response()->json([
                'message' => 'Wrong email or password',
                'status' => 422,
                'errors' => [
                    'password' => [__("Wrong email or password")],
                    'email' => [__("Wrong email or password")]
                ]
            ], 422);
        }

        // Внутренний API запрос для получения токенов
        $client = DB::table('oauth_clients')
            ->where('password_client', true)
            ->first();

        // Убедимся, что Password Client существует в БД (т.е. Laravel Passport
        // установлен правильно)
        if (!$client) {
            return response()->json([
                'message' => 'Laravel Passport is not setup properly.',
                'status' => 500
            ], 500);
        }

        $data = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => request('email'),
            'password' => request('password'),
        ];

        $request = Request::create('/oauth/token', 'POST', $data);

        $response = app()->handle($request);

        // Проверяем был ли внутренний запрос успешным
        if ($response->getStatusCode() != 200) {
            return response()->json([
                'message' => 'Wrong email or password',
                'status' => 422,
                'errors' => [
                    'password' => [__("Wrong email or password")],
                    'email' => [__("Wrong email or password")]
                ]
            ], 422);
        }

        // Вытаскиваем данные из ответа
        $data = json_decode($response->getContent());

        // Формируем окончательный ответ в нужном формате
        return response()->json([
            'token' => $data->access_token,
            'user' => new UserResource($user),
            'status' => 200
        ]);
    }

    public function logout()
    {
        $accessToken = Auth::user()->token();

        $refreshToken = DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        return response()->json(['status' => 200]);
    }
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
