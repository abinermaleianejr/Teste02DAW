<?php

namespace App\Http\Controllers;

use App\Models\Pessoa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PessoaController extends Controller
{
    public function index()
    {
        $pessoas = Pessoa::all(); //  $pessoas = Pessoa::paginate(3); para paginacao
        return Inertia::render('Pessoas/Index', [
            'c_pessoas' => $pessoas,
        ]);
        
    }

    public function create()
    {
        return Inertia::render('Pessoas/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'bi' => 'required|unique:pessoas',
            'apelido' => 'required',
            'nome' => 'required',
            'idade' => 'required|integer',
        ]);

        Pessoa::create($request->all());

        return redirect()->route('pessoas.index');
    }

    public function edit(Pessoa $pessoa)
    {
        return Inertia::render('Pessoas/Edit', [
            'c_pessoa' => $pessoa,
        ]);
    }

    public function update(Request $request, Pessoa $pessoa)
    {
        $request->validate([
            'bi' => 'required|unique:pessoas,bi,' . $pessoa->id,
            'apelido' => 'required',
            'nome' => 'required',
            'idade' => 'required|integer',
        ]);

        $pessoa->update($request->all());

        return redirect()->route('pessoas.index');
    }

    public function destroy(Pessoa $pessoa)
    {
        $pessoa->delete();
        return redirect()->route('pessoas.index');
    }

    public function show(Pessoa $pessoa)
    {
        return Inertia::render('Pessoas/Show', [
            'c_pessoa' => $pessoa,
        ]);
    }

}
