<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplinaController extends Controller
{
    public function index()
    {
        $disciplinas = Disciplina::all();
        return Inertia::render('Disciplinas/Index', [
            'c_disciplinas' => $disciplinas
        ]);
    }

    public function create()
    {
        return Inertia::render('Disciplinas/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:disciplinas',
            'nome' => 'required',
            'creditos' => 'required|integer|min:1'
        ]);

        Disciplina::create($request->all());

        return redirect()->route('disciplinas.index');
    }

    public function edit(Disciplina $disciplina)
    {
        return Inertia::render('Disciplinas/Edit', [
            'c_disciplina' => $disciplina
        ]);
    }

    public function update(Request $request, Disciplina $disciplina)
    {
        $request->validate([
            'codigo' => 'required|unique:disciplinas,codigo,' . $disciplina->id,
            'nome' => 'required',
            'creditos' => 'required|integer|min:1'
        ]);

        $disciplina->update($request->all());

        return redirect()->route('disciplinas.index');
    }

    public function destroy(Disciplina $disciplina)
    {
        $disciplina->delete();
        return redirect()->route('disciplinas.index');
    }
}