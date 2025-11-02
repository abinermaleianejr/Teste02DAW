<?php

namespace Database\Seeders;

use App\Models\Pessoa;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Pessoa::firstOrCreate(
            ['bi' => '00000'],
            [
                'apelido' => 'Cossa',
                'nome' => Hash::make('password'),
                'idade' => 10,
            ]
        );
    }
}
