<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudante extends Model
{
    protected $table='estudantes';
    protected $fillable = ['codigo', 'apelido', 'nome', 'curso_id'];

    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    // relação N-N com Disciplina via inscricoes (pivot)
    public function disciplinas()
    {
        return $this->belongsToMany(Disciplina::class, 'inscricoes', 'estudante_id', 'disciplina_id')
                    ->withPivot('data_inscricao', 'nota')
                    ->withTimestamps();
    }
}
