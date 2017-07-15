<?php

use Illuminate\Database\Seeder;

class Order_StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
		DB::table('order_statuses')->insert([
            'order_status_name' => 'Pending',            
        ]);
		
		DB::table('order_statuses')->insert([
            'order_status_name' => 'Confirmed',            
        ]);
		
		DB::table('order_statuses')->insert([
            'order_status_name' => 'In Progress',            
        ]);
		
		DB::table('order_statuses')->insert([
            'order_status_name' => 'Completed',            
        ]);
		
		DB::table('order_statuses')->insert([
            'order_status_name' => 'Ready for Pickup',            
        ]);
		
		DB::table('order_statuses')->insert([
            'order_status_name' => 'On the way',            
        ]);
    }
}
