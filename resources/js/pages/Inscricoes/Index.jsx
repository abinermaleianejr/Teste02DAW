import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
  const { c_inscricoes, filters } = usePage().props;
  const [filtros, setFiltros] = useState({
    disciplina_nome: filters.disciplina_nome || '',
    estudante_nome: filters.estudante_nome || '',
    ano: filters.ano || ''
  });

  const handleFilter = () => {
    router.get('/inscricoes', filtros, {
      preserveState: true,
      replace: true
    });
  };

  const clearFilters = () => {
    setFiltros({ disciplina_nome: '', estudante_nome: '', ano: '' });
    router.get('/inscricoes');
  };

  // Função para determinar resultado (APROVADO/REPROVADO)
  const getResultado = (nota) => {
    if (nota === null || nota === undefined) return { texto: 'N/A', cor: 'text-gray-600' };
    return nota >= 10 
      ? { texto: 'APROVADO', cor: 'text-green-600 font-bold' }
      : { texto: 'REPROVADO', cor: 'text-red-600 font-bold' };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Inscrições</h1>
        <Link
          href="/inscricoes/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Nova Inscrição
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-3 text-gray-700">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Disciplina</label>
            <input
              type="text"
              placeholder="Filtrar por disciplina"
              value={filtros.disciplina_nome}
              onChange={(e) => setFiltros({...filtros, disciplina_nome: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estudante</label>
            <input
              type="text"
              placeholder="Filtrar por estudante"
              value={filtros.estudante_nome}
              onChange={(e) => setFiltros({...filtros, estudante_nome: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input
              type="number"
              placeholder="Filtrar por ano"
              value={filtros.ano}
              onChange={(e) => setFiltros({...filtros, ano: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="2000"
              max={new Date().getFullYear() + 1}
            />
          </div>
          <div className="flex items-end gap-2">
            <button 
              onClick={handleFilter} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1"
            >
              🔍 Filtrar
            </button>
            <button 
              onClick={clearFilters} 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Inscrições */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudante</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplina</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Inscrição</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {c_inscricoes.map((inscricao) => {
              const resultado = getResultado(inscricao.nota);
              return (
                <tr key={inscricao.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {inscricao.estudante?.nome} {inscricao.estudante?.apelido}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {inscricao.disciplina?.nome}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {new Date(inscricao.data_inscricao).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">
                    {inscricao.nota ?? '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <span className={resultado.cor}>
                      {resultado.texto}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/inscricoes/${inscricao.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        ✏️
                      </Link>
                      <Link
                        href={`/inscricoes/${inscricao.id}`}
                        method="delete"
                        as="button"
                        className="text-red-600 hover:text-red-900"
                        onClick={(e) => {
                          if (!confirm("Tem certeza que deseja apagar esta inscrição?")) e.preventDefault();
                        }}
                      >
                        🗑️
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mensagem quando não há resultados */}
      {c_inscricoes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma inscrição encontrada com os filtros aplicados.
        </div>
      )}
    </div>
  );
}