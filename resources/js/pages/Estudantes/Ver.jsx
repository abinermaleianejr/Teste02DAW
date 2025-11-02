import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Ver() {
  const { estudante, disciplinas, ano_filtrado } = usePage().props;
  const anoAtual = new Date().getFullYear();
  const [ano, setAno] = useState(ano_filtrado || anoAtual);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faz nova requisição Inertia, sem reload
    router.get(
      `/estudantes/${estudante.id}/busca_ano`,
      { ano },
      { preserveState: true, replace: true }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {estudante.nome} {estudante.apelido}
      </h1>

      {/* 🔍 Campo de busca por ano */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
        <label className="text-gray-700 font-medium">Filtrar por ano:</label>
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          min="2000"
          max="2100"
          className="border border-gray-300 rounded px-2 py-1 w-28"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3 text-gray-700">
        Disciplinas inscritas em {ano}
      </h2>

      {/* 📋 Tabela */}
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
            <th className="px-4 py-2 text-left">Disciplina</th>
            <th className="px-4 py-2 text-left">Data de Inscrição</th>
            <th className="px-4 py-2 text-left">Nota</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.length > 0 ? (
            disciplinas.map((disc) => (
              <tr key={disc.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{disc.nome}</td>
                <td className="px-4 py-2">{disc.pivot.data_inscricao}</td>
                <td className="px-4 py-2">{disc.pivot.nota ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-4 py-4 text-center text-gray-500 italic"
              >
                Nenhuma disciplina encontrada para este ano.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}