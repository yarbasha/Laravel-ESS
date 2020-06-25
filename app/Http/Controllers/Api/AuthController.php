<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $v = Validator::make($request->all(), [
            'name'=>'required|string|unique:users',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|confirmed|min:6'
        ]);
        if($v->fails()) {
            return response()->json([
                "status"=> "error",
                "errors"=>$v->errors()
            ], 422);
        }
        $user = new User([
            "name"=> $request->name,
            "email"=> $request->email,
            "password"=> bcrypt($request->password)
        ]);
        $user->save();
        // return response()->json([
        //     "message"=> "user created successfully",
        // ], 201);
        return $this->login(request());
    }

    public function login(Request $request) {
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
            'remember_me'=> 'boolean'
        ]);
        $credentials = $request->only("email", "password");
        if($token=$this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json([
            "error"=> "Your Email/Password is wrong"
        ], 401);
    }

    public function logout() {
        $this->guard()->logout();
        return response()->json([
            "status"=>"success",
            "message"=>"Logged out successfully."
        ], 200);
    }

    private function guard() {
        return Auth::guard();
    }

    public function user()
    {
        $user = User::find(Auth::user()->id);
        return response()->json(["user"=>$user]);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL()*60
        ]);
    }
}
