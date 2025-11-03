import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
  const { c_estudantes, estatisticas, filters } = usePage().props;
  const [filtros, setFiltros] = useState({
    nome: filters.nome || '',
    apelido: filters.apelido || '',
    ano_matricula: filters.ano_matricula || ''
  });

  const handleFilter = () => {
    router.get('/estudantes', filtros, {
      preserveState: true,
      replace: true
    });
  };

  const clearFilters = () => {
    setFiltros({ nome: '', apelido: '', ano_matricula: '' });
    router.get('/estudantes');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Estudantes</h1>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-blue-800">Total Estudantes</h3>
          <p className="text-2xl font-bold text-blue-600">{estatisticas.total}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-green-800">Masculino</h3>
          <p className="text-2xl font-bold text-green-600">{estatisticas.masculino}</p>
        </div>
        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-pink-800">Feminino</h3>
          <p className="text-2xl font-bold text-pink-600">{estatisticas.feminino}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-purple-800">Taxa Feminina</h3>
          <p className="text-2xl font-bold text-purple-600">
            {estatisticas.total > 0 ? Math.round((estatisticas.feminino / estatisticas.total) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-3 text-gray-700">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              placeholder="Filtrar por nome"
              value={filtros.nome}
              onChange={(e) => setFiltros({...filtros, nome: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apelido</label>
            <input
              type="text"
              placeholder="Filtrar por apelido"
              value={filtros.apelido}
              onChange={(e) => setFiltros({...filtros, apelido: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano Matrícula</label>
            <input
              type="number"
              placeholder="Ano de matrícula"
              value={filtros.ano_matricula}
              onChange={(e) => setFiltros({...filtros, ano_matricula: e.target.value})}
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

      {/* Botão Novo Estudante */}
      <div className="mb-4">
        <Link 
          href="/estudantes/create" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition inline-flex items-center"
        >
          ➕ Novo Estudante
        </Link>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apelido</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano Mat.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {c_estudantes.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{e.codigo}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.nome}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.apelido}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    e.sexo === 'M' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {e.sexo === 'M' ? ' Masculino' : ' Feminino'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.contacto || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    e.periodo === 'Laboral' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {e.periodo}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.ano_matricula}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.curso?.nome || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/estudantes/${e.id}/ver`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      👁️
                    </Link>
                    <Link 
                      href={`/estudantes/${e.id}/edit`}
                      className="text-green-600 hover:text-green-900"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/estudantes/${e.id}`}
                      method="delete"
                      as="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={(ev) => {
                        if (!confirm("Tem certeza que deseja apagar este estudante?")) ev.preventDefault();
                      }}
                    >
                      🗑️
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensagem quando não há resultados */}
      {c_estudantes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum estudante encontrado com os filtros aplicados.
        </div>
      )}
    </div>
  );
}