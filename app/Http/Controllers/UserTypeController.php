<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserType;
use Illuminate\Support\Facades\Auth;

class UserTypeController extends Controller
{
    public function list(Request $request){
		$types = UserType::all();
		return response()->json($types);
	}
	
	public function dologin(Request $request){
		$email = $request->input('email');
		$password = $request->input('password');
		if (Auth::attempt(['email' => $email, 'password' => $password])) {
            // Authentication passed...
			$temp = array();
			$temp['login'] = 'ok';
            return response()->json($temp);
        }else{
			$temp = array();
			$temp['login'] = 'failed';
            return response()->json($temp);
		}
	}
}