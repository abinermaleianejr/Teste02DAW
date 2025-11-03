<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\EstudanteController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\InscricaoController;
use App\Http\Controllers\RenovacaoMatriculaController;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 🔐 TODAS AS ROTAS PROTEGIDAS POR AUTENTICAÇÃO
Route::middleware(['auth', 'verified'])->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Suas rotas CRUD existentes
    Route::resource('pessoas', PessoaController::class);
    Route::resource('cursos', CursoController::class);
    Route::resource('estudantes', EstudanteController::class);
    Route::resource('disciplinas', DisciplinaController::class);
    Route::resource('inscricoes', InscricaoController::class);

    // ✅ NOVO: Sistema de Renovação de Matrícula
    Route::resource('renovacoes', RenovacaoMatriculaController::class);
    Route::post('/renovacoes/{renovacao}/aprovar', [RenovacaoMatriculaController::class, 'aprovar'])->name('renovacoes.aprovar');
    Route::post('/renovacoes/{renovacao}/rejeitar', [RenovacaoMatriculaController::class, 'rejeitar'])->name('renovacoes.rejeitar');

    // Rota principal redireciona para dashboard
    Route::get('/home', function () {
        return redirect()->route('dashboard');
    });
});

require __DIR__.'/auth.php';