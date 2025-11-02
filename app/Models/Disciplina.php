<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disciplina extends Model
{
    protected $table='disciplinas'; 
    protected $fillable = ['codigo', 'nome', 'creditos'];

    public function estudantes()
    {
        return $this->belongsToMany(Estudante::class, 'inscricoes', 'disciplina_id', 'estudante_id')
                    ->withPivot('data_inscricao', 'nota')
                    ->withTimestamps();
    }
}
