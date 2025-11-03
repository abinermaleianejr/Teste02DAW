<?php

namespace App\Http\Controllers;

use App\Models\Inscricao;
use App\Models\Estudante;
use App\Models\Disciplina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InscricaoController extends Controller
{
   public function index(Request $request)
{
    $query = Inscricao::with(['estudante', 'disciplina']);
    
    // Filtros
    if ($request->has('disciplina_nome') && $request->disciplina_nome) {
        $query->whereHas('disciplina', function($q) use ($request) {
            $q->where('nome', 'LIKE', "%{$request->disciplina_nome}%");
        });
    }
    
    if ($request->has('estudante_nome') && $request->estudante_nome) {
        $query->whereHas('estudante', function($q) use ($request) {
            $q->where('nome', 'LIKE', "%{$request->estudante_nome}%")
              ->orWhere('apelido', 'LIKE', "%{$request->estudante_nome}%");
        });
    }
    
    if ($request->has('ano') && $request->ano) {
        $query->whereYear('data_inscricao', $request->ano);
    }
    
    $inscricoes = $query->get();

    return Inertia::render('Inscricoes/Index', [
        'c_inscricoes' => $inscricoes,
        'filters' => $request->only(['disciplina_nome', 'estudante_nome', 'ano'])
    ]);
}

    public function create()
    {
        $estudantes = Estudante::all();
        $disciplinas = Disciplina::all();

        return Inertia::render('Inscricoes/Create', [
            'c_estudantes' => $estudantes,
            'c_disciplinas' => $disciplinas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'estudante_id' => 'required|exists:estudantes,id',
            'disciplina_id' => 'required|exists:disciplinas,id',
            'data_inscricao' => 'required|date',
            'nota' => 'nullable|numeric|min:0|max:20',
        ]);

        Inscricao::create($request->all());
        return redirect()->route('inscricoes.index');
    }

    public function edit(Inscricao $inscricao)
    {
        $inscricao->load(['estudante', 'disciplina']);
        $disciplinas = Disciplina::orderBy('nome')->get();
        $estudantes = Estudante::orderBy('nome')->get();


        // dd($inscricao->toArray());
        //  $disciplinas = Disciplina::all();
        //  $estudantes = Estudante::all();
        return Inertia::render('Inscricoes/Edit', [
            'c_inscricao' => $inscricao,
            'c_estudantes' => $estudantes,
            'c_disciplinas' => $disciplinas,
        ]);
    
    }

    
    public function update(Request $request, Inscricao $inscricao)
    {
        $request->validate([
            'estudante_id' => 'required|exists:estudantes,id',
            'disciplina_id' => 'required|exists:disciplinas,id',
            'data_inscricao' => 'required|date',
            'nota' => 'nullable|numeric|min:0|max:20',
        ]);

        $inscricao->update($request->all());

        return redirect()->route('inscricoes.index');
    }

    public function destroy(Inscricao $inscricao)
    {
        $inscricao->delete();
        return redirect()->route('inscricoes.index');
    }
}