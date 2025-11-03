import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
  const { c_cursos } = usePage().props;
  const { data, setData, post, errors } = useForm({
    codigo: "",
    apelido: "",
    nome: "",
    curso_id: "",
    sexo: "M",
    nacionalidade: "Moçambicana",
    periodo: "Laboral",
    email: "",
    contacto: "",
    ano_matricula: new Date().getFullYear()
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

        {/* Nome e Apelido */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Sexo e Nacionalidade */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Sexo:</label>
            <select
              value={data.sexo}
              onChange={(e) => setData("sexo", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            {errors.sexo && <p className="text-red-500 text-sm mt-1">{errors.sexo}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Nacionalidade:</label>
            <input
              type="text"
              placeholder="Nacionalidade"
              value={data.nacionalidade}
              onChange={(e) => setData("nacionalidade", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.nacionalidade && <p className="text-red-500 text-sm mt-1">{errors.nacionalidade}</p>}
          </div>
        </div>

        {/* Período e Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Período:</label>
            <select
              value={data.periodo}
              onChange={(e) => setData("periodo", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Laboral">Laboral</option>
              <option value="Pós-Laboral">Pós-Laboral</option>
            </select>
            {errors.periodo && <p className="text-red-500 text-sm mt-1">{errors.periodo}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Contacto e Ano Matrícula */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Contacto:</label>
            <input
              type="text"
              placeholder="Contacto"
              value={data.contacto}
              onChange={(e) => setData("contacto", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.contacto && <p className="text-red-500 text-sm mt-1">{errors.contacto}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Ano Matrícula:</label>
            <input
              type="number"
              placeholder="Ano Matrícula"
              value={data.ano_matricula}
              onChange={(e) => setData("ano_matricula", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="2000"
              max={new Date().getFullYear() + 1}
            />
            {errors.ano_matricula && <p className="text-red-500 text-sm mt-1">{errors.ano_matricula}</p>}
          </div>
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