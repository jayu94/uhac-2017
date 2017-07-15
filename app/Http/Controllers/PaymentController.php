<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserCart;
use App\PaymentDetails;

class PaymentController extends Controller
{
    public function makePayment(Request $request, $cart_id){
		$account_number = '100500705719';
		$settlement_account = '100174920892';
		
		$cart = UserCart::find($cart_id);
		//return response()->json($cart);
		
		$amount = $cart->totalprice + 50;
		
		if($this->validateAccount($account_number, $amount) == 1){
			$curl = curl_init();
			
			$transaction_id = 'TRN' . time();
			$channel_id = 'SL01';
			

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://api-uat.unionbankph.com/uhac/sandbox/transfers/initiate",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "{\"channel_id\":\"{$channel_id}\",\"transaction_id\":\"{$transaction_id}\",\"source_account\":\"{$account_number}\",\"source_currency\":\"PHP\",\"target_account\":\"{$settlement_account}\",\"target_currency\":\"PHP\",\"amount\":{$amount}}",
			  CURLOPT_HTTPHEADER => array(
				"accept: application/json",
				"content-type: application/json",
				"x-ibm-client-id: 9c248b80-531f-4527-a711-0a10c0affa5d",
				"x-ibm-client-secret: Q1qC8cP2bN6fL0qW7bV6vC8eB3mV8cW0kM3fY6iM5sP2bM6wH5"
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			$temp['status'] = '';
			if ($err) {
			  $temp['status'] = 'failed';
			} else {
			  $response = json_decode($response);
			  
			  if(is_array($response)){
				$response = $response[0];
			  }
			  
			  $payment = new PaymentDetails;
			  
			  $payment->transaction_id = $response->transaction_id;
			  $payment->status = $response->status;
			  $payment->cart_id = $cart_id;
			  $payment->confirmation_no = $response->confirmation_no;
			  $payment->error_message = $response->error_message;
			  $payment->paid_amount = $amount;
			  $payment->created_at = date('Y-m-d H:i:s');
			  $payment->save();
			  
			  if($response->status == 'S'){
					$temp['status'] = 'ok';
			  }else{
					$temp['status'] = 'failed';
			  }
			  
			}
			
			
			
			return response()->json($temp);
		}else{
			$temp['status'] = 'invalid';
			return response()->json($temp);
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
		  
		  if(is_array($response)){
			$response = $response[0];
		  }
		  
		  if($response->status == 'ACTIVE' && $response->current_balance > $amount){
			return 1;
		  }else{
			return 0;
		  }
		  
		}
	
	}
}
