<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;

use App\Models\Pessoa;

class PessoaTestar
{
   

    public function listarTodos(){
        $nomes = Pessoa::pluck('nome');
        foreach($nomes as $nome){
            echo("---------------------------------------\n");
            echo "{$nome}\n ";
        }
    }

//     public function filtroID($id){
//         $pessoa = Pessoa::find($id);
//         return $pessoa;
//     }

//     public function listarFiltrado($chave){
//     //$p = $this->filtroID($chave);
//     $p = Pessoa::findOrFail($chave);

//     echo " ID: {$p->id}\n BI: {$p->bi} \n Nome: {$p->nome}\n Idade: {$p->idade} anos\n";
//     }

//  public function projeccaoColuna($coluna){
//         $pessoas = Pessoa::select($coluna, DB::raw('count(*) as total'))-> groupBy($coluna)->get();
//         return $pessoas;
//     }
//  public function imprimirColunas($coluna){
//  $ps = $this->projeccaoColuna($coluna);
//  foreach($ps as $p){
//     echo " {$p->idade}  {$p->total} \n";
//  }
    
//  }
//   public function imprimirQualquer(){
// //   $pessoas = Pessoa::groupBy('idade')
// //     ->havingRaw('total > 2')
// //     ->select('idade')
// //     ->selectRaw('COUNT(*) as total')
// //     ->get();
// //     foreach($pessoas as $p)
// //     echo "{$p->idade}   {$p->total} \n";  

// $pessoas = Pessoa::toBase()
//     ->select('idade')
//     ->selectRaw('COUNT(*) as total')
//     ->groupBy('idade')
//     ->having('total', '>', 2)
//     ->get();
// foreach($pessoas as $p)
//     echo "{$p->idade}   {$p->total} \n";

// }
}
