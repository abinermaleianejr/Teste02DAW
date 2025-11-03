<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Disciplina extends Model
{  
    use HasFactory, SoftDeletes;

    protected $table = 'disciplinas';
    protected $fillable = ['codigo', 'nome', 'creditos'];

    public function estudantes()
    {
        return $this->belongsToMany(Estudante::class, 'inscricoes', 'disciplina_id', 'estudante_id')
                    ->withPivot('data_inscricao', 'nota')
                    ->withTimestamps();
    }

     // Relacionamento direto com inscrições
    public function inscricoes()
    {
        return $this->hasMany(Inscricao::class);
    }
}
