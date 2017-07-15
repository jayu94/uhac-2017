<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
use App\MenuIngredient;
use App\Ingredient;
use Illuminate\Support\Facades\DB;

class MenusController extends Controller
{
    //
	public function list(){
		$menus = Menu::all();
		
		
		return response()->json($menus);
	}
	
	public function item(Request $request, $menu_id){
		
		$menu = Menu::find($menu_id);
	
	
		$ingredients = DB::table('menu_ingredients')
		->leftJoin('ingredients', 'ingredients.id', '=', 'menu_ingredients.ingredient_id')
		->where('menu_ingredients.menu_id', '=', $menu->id)
		->get();
		
		$menu->ingredients = $ingredients;

		return response()->json($menu);
	}
}
