<?php

namespace App\Http\Middleware;

use Closure;
use Laracasts\Utilities\JavaScript\JavaScriptFacade as Javascript;


class AddTokenEmailToScript
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        JavaScript::put([
            'email_fp' => $request->email,
            'token_fp' => $request->token
        ]);
        return $next($request);
    }
}
