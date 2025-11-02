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
        Schema::create('inscricoes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('estudante_id')->constrained('estudantes');
        $table->foreignId('disciplina_id')->constrained('disciplinas');
        $table->timestamp('data_inscricao')->useCurrent(); // data da inscrição
        $table->decimal('nota', 3, 1)->nullable();
        $table->timestamps();

        // evita duplicação da mesma inscrição (opcional)
        $table->unique(['estudante_id', 'disciplina_id', 'data_inscricao']);
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscricoes');
    }
};
