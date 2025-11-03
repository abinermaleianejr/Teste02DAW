<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('renovacoes_matricula', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estudante_id')->constrained('estudantes')->onDelete('cascade');
            $table->integer('ano_lectivo');
            $table->date('data_renovacao');
            $table->enum('estado', ['pendente', 'aprovada', 'rejeitada'])->default('pendente');
            $table->text('observacoes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Evitar duplicação de renovação no mesmo ano
            $table->unique(['estudante_id', 'ano_lectivo']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('renovacoes_matricula');
    }
};