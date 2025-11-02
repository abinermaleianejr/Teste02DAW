<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('cursos', function (Blueprint $table) {
        $table->id();
        $table->string('codigo')->unique();      // código do curso
        $table->string('nome');
        $table->integer('duracao');             // duração em semestres/meses (a definir)
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
