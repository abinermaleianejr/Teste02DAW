<?php

namespace App\Http\Controllers;

use App\Models\RenovacaoMatricula;
use App\Models\Estudante;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RenovacaoMatriculaController extends Controller
{
    public function index(Request $request)
    {
        $query = RenovacaoMatricula::with('estudante');
        
        // Filtros
        if ($request->has('estudante_nome') && $request->estudante_nome) {
            $query->whereHas('estudante', function($q) use ($request) {
                $q->where('nome', 'LIKE', "%{$request->estudante_nome}%")
                  ->orWhere('apelido', 'LIKE', "%{$request->estudante_nome}%");
            });
        }
        
        if ($request->has('ano_lectivo') && $request->ano_lectivo) {
            $query->where('ano_lectivo', $request->ano_lectivo);
        }
        
        if ($request->has('estado') && $request->estado) {
            $query->where('estado', $request->estado);
        }
        
        $renovacoes = $query->latest()->get();
        
        // Estatísticas
        $totalRenovacoes = RenovacaoMatricula::count();
        $pendentes = RenovacaoMatricula::where('estado', 'pendente')->count();
        $aprovadas = RenovacaoMatricula::where('estado', 'aprovada')->count();
        $rejeitadas = RenovacaoMatricula::where('estado', 'rejeitada')->count();

        return Inertia::render('Renovacoes/Index', [
            'renovacoes' => $renovacoes,
            'filters' => $request->only(['estudante_nome', 'ano_lectivo', 'estado']),
            'estatisticas' => [
                'total' => $totalRenovacoes,
                'pendentes' => $pendentes,
                'aprovadas' => $aprovadas,
                'rejeitadas' => $rejeitadas
            ]
        ]);
    }

    public function create()
    {
        $estudantes = Estudante::whereDoesntHave('renovacoes', function($query) {
            $query->where('ano_lectivo', date('Y'));
        })->get();

        return Inertia::render('Renovacoes/Create', [
            'estudantes' => $estudantes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'estudante_id' => [
                'required', 
                'exists:estudantes,id',
                function ($attribute, $value, $fail) {
                    $exists = RenovacaoMatricula::where('estudante_id', $value)
                        ->where('ano_lectivo', date('Y'))
                        ->exists();
                    if ($exists) {
                        $fail('Este estudante já tem uma renovação de matrícula para o ano corrente.');
                    }
                }
            ],
            'data_renovacao' => 'required|date',
            'observacoes' => 'nullable|string|max:500'
        ]);

        RenovacaoMatricula::create([
            'estudante_id' => $request->estudante_id,
            'ano_lectivo' => date('Y'),
            'data_renovacao' => $request->data_renovacao,
            'observacoes' => $request->observacoes,
            'estado' => 'pendente'
        ]);

        return redirect()->route('renovacoes.index')->with('success', 'Renovação de matrícula registada com sucesso!');
    }

    public function edit(RenovacaoMatricula $renovacao)
    {
        $renovacao->load('estudante');
        
        return Inertia::render('Renovacoes/Edit', [
            'renovacao' => $renovacao
        ]);
    }

    public function update(Request $request, RenovacaoMatricula $renovacao)
    {
        $request->validate([
            'estado' => 'required|in:pendente,aprovada,rejeitada',
            'observacoes' => 'nullable|string|max:500'
        ]);

        $renovacao->update($request->only('estado', 'observacoes'));

        return redirect()->route('renovacoes.index')->with('success', 'Renovação actualizada com sucesso!');
    }

    public function destroy(RenovacaoMatricula $renovacao)
    {
        $renovacao->delete();
        return redirect()->route('renovacoes.index')->with('success', 'Renovação eliminada com sucesso!');
    }

    // Aprovar renovação rapidamente
    public function aprovar(RenovacaoMatricula $renovacao)
    {
        $renovacao->update(['estado' => 'aprovada']);
        return back()->with('success', 'Renovação aprovada com sucesso!');
    }

    // Rejeitar renovação rapidamente  
    public function rejeitar(RenovacaoMatricula $renovacao)
    {
        $renovacao->update(['estado' => 'rejeitada']);
        return back()->with('success', 'Renovação rejeitada!');
    }
}