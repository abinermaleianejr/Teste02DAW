<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\EstudanteController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\InscricaoController;

Route::get('/', function () {
    return redirect()->route('cursos.index'); // invoca o metodo index do PessoaController
});
Route::get('/estudantes/{estudante}/ver', [EstudanteController::class, 'verEstudante'])
    ->name('estudantes.ver');

Route::get('/estudantes/{estudante}/busca_ano', [EstudanteController::class, 'buscarInscricoes'])
    ->name('estudantes.busca_ano');

Route::resource('pessoas', PessoaController::class);
Route::resource('estudantes', EstudanteController::class);
Route::resource('disciplinas', DisciplinaController::class);
Route::resource('cursos', CursoController::class);
Route::resource('inscricoes', InscricaoController::class)
 ->parameters(['inscricoes' => 'inscricao']); // forcar o bing de controller com modelo