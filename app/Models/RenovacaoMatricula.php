<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RenovacaoMatricula extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'renovacoes_matricula';

    protected $fillable = [
        'estudante_id',
        'ano_lectivo', 
        'data_renovacao',
        'estado',
        'observacoes'
    ];

    protected $casts = [
        'data_renovacao' => 'date',
    ];

    public function estudante()
    {
        return $this->belongsTo(Estudante::class);
    }

    // Escopo para renovações do ano atual
    public function scopeAnoCorrente($query)
    {
        return $query->where('ano_lectivo', date('Y'));
    }

    // Escopo para renovações aprovadas
    public function scopeAprovadas($query)
    {
        return $query->where('estado', 'aprovada');
    }
}