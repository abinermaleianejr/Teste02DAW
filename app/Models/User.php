<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'perfil', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Métodos auxiliares para verificar perfil
    public function isAdmin(): bool
    {
        return $this->perfil === 'admin';
    }

    public function isProfessor(): bool
    {
        return $this->perfil === 'professor';
    }

    public function isEstudante(): bool
    {
        return $this->perfil === 'estudante';
    }
}