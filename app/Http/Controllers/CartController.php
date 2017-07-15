<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Menu;
use App\UserCart;

class CartController extends Controller
{
    public function getcart($user_id){
		$cart = DB::table('user_carts')
		->leftJoin('menus', 'menus.id', '=', 'user_carts.menu_id')
		->where('user_carts.user_id', '=', $user_id)
		->get();
		
		return response()->json($cart);
		
	}
}
