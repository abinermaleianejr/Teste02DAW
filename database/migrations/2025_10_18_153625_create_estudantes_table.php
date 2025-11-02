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
         Schema::create('estudantes', function (Blueprint $table) {
        $table->id();
        $table->string('codigo')->unique();      // código do estudante (matrícula)
        $table->string('apelido');
        $table->string('nome');
        $table->foreignId('curso_id')->constrained('cursos');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudantes');
    }
};
