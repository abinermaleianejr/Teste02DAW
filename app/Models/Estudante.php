<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estudante extends Model
{
    use HasFactory, SoftDeletes;

    protected $table='estudantes';
   protected $fillable = [
    'codigo', 'apelido', 'nome', 'curso_id', 
    'sexo', 'nacionalidade', 'periodo', 'email', 'contacto', 'ano_matricula'
    ];

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

     // NOVO: Relacionamento com renovações de matrícula
    public function renovacoes()
    {
        return $this->hasMany(RenovacaoMatricula::class);
    }
    // Verificar se tem renovação para o ano atual
    public function temRenovacaoAnoCorrente()
    {
        return $this->renovacoes()->where('ano_lectivo', date('Y'))->exists();
    }

    // Obter última renovação
    public function ultimaRenovacao()
    {
        return $this->renovacoes()->latest()->first();
    }

    // Verificar se está ativo (tem renovação aprovada no ano corrente)
    public function estaAtivo()
    {
        return $this->renovacoes()
            ->where('ano_lectivo', date('Y'))
            ->where('estado', 'aprovada')
            ->exists();
    }
}
