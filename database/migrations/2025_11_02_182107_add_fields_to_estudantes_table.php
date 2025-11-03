<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('estudantes', function (Blueprint $table) {
        $table->enum('sexo', ['M', 'F'])->default('M');
        $table->string('nacionalidade')->default('Moçambicana');
        $table->enum('periodo', ['Laboral', 'Pós-Laboral'])->default('Laboral');
        $table->string('email')->unique();
        $table->string('contacto')->nullable();
        $table->integer('ano_matricula')->default(2025);
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudantes', function (Blueprint $table) {
            //
        });
    }
};
