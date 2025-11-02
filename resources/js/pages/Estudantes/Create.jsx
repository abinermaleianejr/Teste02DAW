import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
  const { c_cursos } = usePage().props;
  const { data, setData, post, errors } = useForm({
    codigo: "",
    apelido: "",
    nome: "",
    curso_id: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/estudantes");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Novo Estudante</h1>

      <form onSubmit={submit} className="space-y-4">
        {/* Código */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Código:</label>
          <input
            type="text"
            placeholder="Código"
            value={data.codigo}
            onChange={(e) => setData("codigo", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.codigo && <p className="text-red-500 text-sm mt-1">{errors.codigo}</p>}
        </div>

        {/* Apelido */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Apelido:</label>
          <input
            type="text"
            placeholder="Apelido"
            value={data.apelido}
            onChange={(e) => setData("apelido", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.apelido && <p className="text-red-500 text-sm mt-1">{errors.apelido}</p>}
        </div>

        {/* Nome */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            value={data.nome}
            onChange={(e) => setData("nome", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>

        {/* Curso */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Curso:</label>
          <select
            value={data.curso_id}
            onChange={(e) => setData("curso_id", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecione um curso</option>
            {c_cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          {errors.curso_id && <p className="text-red-500 text-sm mt-1">{errors.curso_id}</p>}
        </div>

        {/* Botão */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
