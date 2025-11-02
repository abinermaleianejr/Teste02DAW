<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::all();
        return Inertia::render('Cursos/Index', [
            'c_cursos' => $cursos
        ]);
    }

    public function create()
    {
        return Inertia::render('Cursos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:cursos',
            'nome' => 'required',
            'duracao' => 'required|integer|min:1'
        ]);

        Curso::create($request->all());

        return redirect()->route('cursos.index');
    }

    public function edit(Curso $curso)
    {
        return Inertia::render('Cursos/Edit', [
            'c_curso' => $curso
        ]);
    }

    public function update(Request $request, Curso $curso)
    {
        $request->validate([
            'codigo' => 'required|unique:cursos,codigo,' . $curso->id,
            'nome' => 'required',
            'duracao' => 'required|integer|min:1'
        ]);

        $curso->update($request->all());

        return redirect()->route('cursos.index');
    }

    public function destroy(Curso $curso)
    {
        $curso->delete();
        return redirect()->route('cursos.index');
    }
}