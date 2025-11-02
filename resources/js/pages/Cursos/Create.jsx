import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    codigo: "",
    nome: "",
    duracao: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/cursos");
  };

  return (
    <div>
      <h1>Novo Curso</h1>
      <form onSubmit={submit}>
        <input placeholder="Código" value={data.codigo} onChange={e => setData("codigo", e.target.value)} /> <br />
        {errors.codigo && <div>{errors.codigo}</div>}
        <input placeholder="Nome" value={data.nome} onChange={e => setData("nome", e.target.value)} /> <br />
        {errors.nome && <div>{errors.nome}</div>}
        <input type="number" placeholder="Duração" value={data.duracao} onChange={e => setData("duracao", e.target.value)} /> <br />
        {errors.duracao && <div>{errors.duracao}</div>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}