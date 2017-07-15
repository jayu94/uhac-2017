<?php

use Illuminate\Database\Seeder;

class User_TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_types')->insert([
            'type_name' => 'Regular',            
        ]);
		
		DB::table('user_types')->insert([
            'type_name' => 'Chef',            
        ]);
		
		DB::table('user_types')->insert([
            'type_name' => 'Shopper',            
        ]);
    }
}
