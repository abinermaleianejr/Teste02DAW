import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const { c_disciplinas } = usePage().props;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Disciplinas</h1>
        <Link
          href="/disciplinas/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Nova Disciplina
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscritos ({new Date().getFullYear()})</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {c_disciplinas.map((disciplina) => (
              <tr key={disciplina.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {disciplina.codigo}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {disciplina.nome}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {disciplina.creditos}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    disciplina.inscritos_ano_corrente > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {disciplina.inscritos_ano_corrente || 0}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link 
                      href={`/disciplinas/${disciplina.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/disciplinas/${disciplina.id}`}
                      method="delete"
                      as="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        if (!confirm("Tem certeza que deseja apagar esta disciplina?")) e.preventDefault();
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
      {c_disciplinas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma disciplina encontrada.
        </div>
      )}
    </div>
  );
}