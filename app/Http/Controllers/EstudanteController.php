<?php

namespace App\Http\Controllers;

use App\Models\Estudante;
use App\Models\Curso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstudanteController extends Controller
{
    public function index()
    {
        $estudantes = Estudante::with('curso')->get();
        return Inertia::render('Estudantes/Index', [
            'c_estudantes' => $estudantes
        ]);
    }

    public function create()
    {
        $cursos = Curso::all();
        return Inertia::render('Estudantes/Create', [
            'c_cursos' => $cursos
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:estudantes',
            'apelido' => 'required',
            'nome' => 'required',
            'curso_id' => 'required|exists:cursos,id',
        ]);

        Estudante::create($request->all());
        return redirect()->route('estudantes.index');
    }

    public function edit(Estudante $estudante)
    {
        $cursos = Curso::all();
        return Inertia::render('Estudantes/Edit', [
            'c_estudante' => $estudante,
            'c_cursos' => $cursos
        ]);
    }

public function verEstudante(Estudante $estudante)
{
    // Carregar o estudante e suas disciplinas (via tabela pivot 'inscricoes')
    $estudante->load('disciplinas');

    // Retornar os dados para o componente Inertia
    return inertia('Estudantes/Ver', [
        'estudante' => $estudante,
        'disciplinas' => $estudante->disciplinas,
    ]);
}
public function buscarInscricoes(Request $request, Estudante $estudante)
{
    $ano = $request->query('ano');

    // Cria a query base do relacionamento
    $disciplinasQuery = $estudante->disciplinas();

    // Se o ano foi informado, filtra pelo ano na data de inscrição (campo pivot)
    if ($ano) {
        $disciplinasQuery->whereYear('inscricoes.data_inscricao', $ano);
    }

    $disciplinas = $disciplinasQuery->get();

    // Retorna os dados para o componente Inertia
    return inertia('Estudantes/Ver', [
        'estudante' => $estudante,
        'disciplinas' => $disciplinas,
        // 'ano_filtrado' => $ano,
    ]);
}
    public function update(Request $request, Estudante $estudante)
    {
        $request->validate([
            'codigo' => 'required|unique:estudantes,codigo,' . $estudante->id,
            'apelido' => 'required',
            'nome' => 'required',
            'curso_id' => 'required|exists:cursos,id',
        ]);

        $estudante->update($request->all());
        return redirect()->route('estudantes.index');
    }

    public function destroy(Estudante $estudante)
    {
        $estudante->delete();
        return redirect()->route('estudantes.index');
    }


}