<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
   protected $table = 'cursos';

    protected $fillable = ['codigo', 'nome', 'duracao'];

    public function estudantes()
    {
        return $this->hasMany(Estudante::class);
    }
}
