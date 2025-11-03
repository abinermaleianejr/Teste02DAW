import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
  const { c_cursos, filters } = usePage().props;
  const [filtros, setFiltros] = useState({
    codigo: filters?.codigo || '',
    nome: filters?.nome || '',
    duracao: filters?.duracao || ''
  });

  const handleFilter = () => {
    router.get('/cursos', filtros, {
      preserveState: true,
      replace: true
    });
  };

  const clearFilters = () => {
    setFiltros({ codigo: '', nome: '', duracao: '' });
    router.get('/cursos');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Cursos</h1>
        <Link
          href="/cursos/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
        >
          ➕ Novo Curso
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-3 text-gray-700">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input
              type="text"
              placeholder="Filtrar por código"
              value={filtros.codigo}
              onChange={(e) => setFiltros({...filtros, codigo: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              placeholder="Filtrar por nome"
              value={filtros.nome}
              onChange={(e) => setFiltros({...filtros, nome: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
            <select
              value={filtros.duracao}
              onChange={(e) => setFiltros({...filtros, duracao: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Todas as durações</option>
              <option value="1">1 ano</option>
              <option value="2">2 anos</option>
              <option value="3">3 anos</option>
              <option value="4">4 anos</option>
              <option value="5">5 anos</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button 
              onClick={handleFilter} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex-1 flex items-center justify-center gap-2"
            >
              🔍 Filtrar
            </button>
            <button 
              onClick={clearFilters} 
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Cursos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duração
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {c_cursos.map((curso) => (
              <tr key={curso.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {curso.codigo}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {curso.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {curso.duracao} {curso.duracao === 1 ? 'ano' : 'anos'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link 
                      href={`/cursos/${curso.id}/edit`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                      ✏️ Editar
                    </Link>
                    <Link
                      href={`/cursos/${curso.id}`}
                      method="delete"
                      as="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
                      onClick={(e) => {
                        if (!confirm("Tem certeza que deseja apagar este curso?")) e.preventDefault();
                      }}
                    >
                      🗑️ Apagar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensagem quando não há resultados */}
      {c_cursos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
          <p className="text-gray-500 mb-4">
            {filtros.codigo || filtros.nome || filtros.duracao 
              ? "Nenhum curso corresponde aos filtros aplicados." 
              : "Ainda não existem cursos registados."}
          </p>
          {(filtros.codigo || filtros.nome || filtros.duracao) && (
            <button 
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}