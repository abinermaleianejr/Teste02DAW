import { useForm } from "@inertiajs/react";

export default function Edit({ c_curso }) {
  const { data, setData, put, errors } = useForm({
    codigo: c_curso.codigo || "",
    nome: c_curso.nome || "",
    duracao: c_curso.duracao || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/cursos/${c_curso.id}`);
  };

  return (
    <div>
      <h1>Editar Curso</h1>
      <form onSubmit={submit}>
        <input placeholder="Código" value={data.codigo} onChange={e => setData("codigo", e.target.value)} /> <br />
        <input placeholder="Nome" value={data.nome} onChange={e => setData("nome", e.target.value)} /> <br />
        <input type="number" placeholder="Duração" value={data.duracao} onChange={e => setData("duracao", e.target.value)} /> <br />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}