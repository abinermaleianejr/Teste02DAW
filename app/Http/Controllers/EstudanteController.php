<?php

namespace App\Http\Controllers;

use App\Models\Estudante;
use App\Models\Curso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstudanteController extends Controller
{
    public function index(Request $request)
    {
        $query = Estudante::with('curso');
        
        // Filtros
        if ($request->has('nome') && $request->nome) {
            $query->where('nome', 'LIKE', "%{$request->nome}%");
        }
        
        if ($request->has('apelido') && $request->apelido) {
            $query->where('apelido', 'LIKE', "%{$request->apelido}%");
        }
        
        if ($request->has('ano_matricula') && $request->ano_matricula) {
            $query->where('ano_matricula', $request->ano_matricula);
        }
        
        $estudantes = $query->get();
        
        // Estatísticas
        $totalEstudantes = Estudante::count();
        $totalMasculino = Estudante::where('sexo', 'M')->count();
        $totalFeminino = Estudante::where('sexo', 'F')->count();
        
        return Inertia::render('Estudantes/Index', [
            'c_estudantes' => $estudantes,
            'filters' => $request->only(['nome', 'apelido', 'ano_matricula']),
            'estatisticas' => [
                'total' => $totalEstudantes,
                'masculino' => $totalMasculino,
                'feminino' => $totalFeminino
            ]
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
            'sexo' => 'required|in:M,F',
            'nacionalidade' => 'required',
            'periodo' => 'required|in:Laboral,Pós-Laboral',
            'email' => 'required|email|unique:estudantes',
            'contacto' => 'nullable',
            'ano_matricula' => 'required|integer|min:2000|max:' . (date('Y') + 1)
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
        $estudante->load('disciplinas');
        return inertia('Estudantes/Ver', [
            'estudante' => $estudante,
            'disciplinas' => $estudante->disciplinas,
        ]);
    }

    public function buscarInscricoes(Request $request, Estudante $estudante)
    {
        $ano = $request->query('ano');
        $disciplinasQuery = $estudante->disciplinas();

        if ($ano) {
            $disciplinasQuery->whereYear('inscricoes.data_inscricao', $ano);
        }

        $disciplinas = $disciplinasQuery->get();

        return inertia('Estudantes/Ver', [
            'estudante' => $estudante,
            'disciplinas' => $disciplinas,
        ]);
    }

    public function update(Request $request, Estudante $estudante)
    {
        $request->validate([
            'codigo' => 'required|unique:estudantes,codigo,' . $estudante->id,
            'apelido' => 'required',
            'nome' => 'required',
            'curso_id' => 'required|exists:cursos,id',
            'sexo' => 'required|in:M,F',
            'nacionalidade' => 'required',
            'periodo' => 'required|in:Laboral,Pós-Laboral',
            'email' => 'required|email|unique:estudantes,email,' . $estudante->id,
            'contacto' => 'nullable',
            'ano_matricula' => 'required|integer|min:2000|max:' . (date('Y') + 1)
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