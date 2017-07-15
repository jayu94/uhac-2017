<?php

use Illuminate\Database\Seeder;

class Logistic_TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('logistic_types')->insert([
            'logistic_type_name' => 'Pick-up',            
        ]);
		
		DB::table('logistic_types')->insert([
            'logistic_type_name' => 'Delivery',            
        ]);
    }
}
