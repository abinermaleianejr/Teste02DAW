import { useForm, usePage } from "@inertiajs/react";

export default function Edit({ c_estudante, c_cursos }) {
  const { data, setData, put } = useForm({
    codigo: c_estudante.codigo || "",
    apelido: c_estudante.apelido || "",
    nome: c_estudante.nome || "",
    curso_id: c_estudante.curso_id || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/estudantes/${c_estudante.id}`);
  };

  return (
    <div>
      <h1>Editar Estudante</h1>
      <form onSubmit={submit}>
        <input placeholder="Código" value={data.codigo} onChange={e => setData("codigo", e.target.value)} /> <br />
        <input placeholder="Apelido" value={data.apelido} onChange={e => setData("apelido", e.target.value)} /> <br />
        <input placeholder="Nome" value={data.nome} onChange={e => setData("nome", e.target.value)} /> <br />
        <select value={data.curso_id} onChange={e => setData("curso_id", e.target.value)}>
          <option value="">Selecione um curso</option>
          {c_cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <br />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}