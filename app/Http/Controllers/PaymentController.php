<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserCart;

class PaymentController extends Controller
{
    public function makePayment(Request $request, $cart_id){
		$account_number = '100500705719';
		$settlement_account = '100174920892';
		
		$cart = UserCart::find($cart_id);
		return response()->json($cart);
		
		if($this->validateAccount($account_number, $cart->id)){
			
		}
		
	}
	
	function validateAccount($account_number, $amount){
		
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api-uat.unionbankph.com/uhac/sandbox/accounts/{$account_number}",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
			"accept: application/json",
			"x-ibm-client-id: 9c248b80-531f-4527-a711-0a10c0affa5d",
			"x-ibm-client-secret: Q1qC8cP2bN6fL0qW7bV6vC8eB3mV8cW0kM3fY6iM5sP2bM6wH5"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  return -1;
		} else {
		  $response = json_decode($response);
		  if($response->status == 'ACTIVE' && $response->current_balance > $amount){
			return 1;
		  }else{
			return 0;
		  }
		  
		}
	
	}
}
