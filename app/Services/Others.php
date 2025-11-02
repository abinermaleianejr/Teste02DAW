<?php

namespace App\Services;

use App\Models\Pessoa;

class PessoaTester
{
    public function run()
    {

    echo "\n=== INICIO DOS TESTES ===\n";
        // 1️⃣ Criar
        $this->createPessoa();
        $this->listarPessoas();

        echo "\n=== FIM DOS TESTES ===\n";
    }

    // --------------------------------------------------
    // 1️⃣ CREATE
    // --------------------------------------------------
    private function createPessoa()
    {
        echo "\n[CREATE]\n";

        $pessoa = Pessoa::create([
            'bi' => 'BI' . rand(1000, 9999),
            'nome' => 'João Teste',
            'apelido' => 'Silva',
            'idade' => 25,
        ]);

        echo "Pessoa criada: {$pessoa->id} - {$pessoa->nome}\n";
    }

    // --------------------------------------------------
    // 2️⃣ READ (listar)
    // --------------------------------------------------
    private function listarPessoas()
    {
        echo "\n[LISTA DE PESSOAS]\n";

        $pessoas = Pessoa::all();
        foreach ($pessoas as $p) {
            echo("----------------------------------\n");
            echo "ID: {$p->id} \n BI: $p->bi \n Nome: {$p->nome} \n Idade: ({$p->idade} anos)\n";
        }
    }

    // --------------------------------------------------
    // 3️⃣ FIND, WHERE, FIRST
    // --------------------------------------------------
    private function buscarPessoas()
    {
        echo "\n[BUSCAR]\n";

        // Buscar pelo ID
        $pessoa = Pessoa::first();
        if ($pessoa) {
            $byId = Pessoa::find($pessoa->id);
            echo "Find por ID: {$byId->nome}\n";
        }

        // Buscar por outro campo (BI)
        $byBi = Pessoa::where('bi', $pessoa->bi)->first();
        echo "Where por BI: {$byBi->nome}\n";
    }

    // --------------------------------------------------
    // 4️⃣ UPDATE
    // --------------------------------------------------
    private function atualizarPessoa()
    {
        echo "\n[UPDATE]\n";

        $pessoa = Pessoa::first();
        if ($pessoa) {
            $pessoa->update(['idade' => $pessoa->idade + 1]);
            echo "Idade atualizada para: {$pessoa->idade}\n";
        }
    }

    // --------------------------------------------------
    // 5️⃣ DELETE
    // --------------------------------------------------
    private function apagarPessoa()
    {
        echo "\n[DELETE]\n";

        $pessoa = Pessoa::latest()->first();
        if ($pessoa) {
            $pessoa->delete();
            echo "Pessoa {$pessoa->nome} apagada!\n";
        }
    }

    // --------------------------------------------------
    // 6️⃣ AGREGAÇÕES
    // --------------------------------------------------
    private function agregacoes()
    {
        echo "\n[AGREGAÇÕES]\n";

        $total = Pessoa::count();
        $max = Pessoa::max('idade');
        $min = Pessoa::min('idade');
        $avg = Pessoa::avg('idade');

        echo "Total: $total | Máx: $max | Mín: $min | Média: $avg\n";
    }

    // --------------------------------------------------
    // 7️⃣ FILTROS AVANÇADOS
    // --------------------------------------------------
    private function filtrosAvancados()
    {
        echo "\n[FILTROS]\n";

        $pessoas = Pessoa::where('idade', '>', 18)
                         ->orderBy('idade', 'desc')
                         ->take(3)
                         ->get();

        foreach ($pessoas as $p) {
            echo "{$p->nome} ({$p->idade})\n";
        }

        // Consulta SQL gerada
        $sql = Pessoa::where('idade', '>', 18)->toSql();
        echo "\nSQL: $sql\n";
    }
}
