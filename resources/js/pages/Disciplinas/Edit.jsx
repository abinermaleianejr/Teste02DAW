import { useForm } from "@inertiajs/react";

export default function Edit({ c_disciplina }) {
  const { data, setData, put } = useForm({
    codigo: c_disciplina.codigo || "",
    nome: c_disciplina.nome || "",
    creditos: c_disciplina.creditos || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/disciplinas/${c_disciplina.id}`);
  };

  return (
    <div>
      <h1>Editar Disciplina</h1>
      <form onSubmit={submit}>
        <input placeholder="Código" value={data.codigo} onChange={e => setData("codigo", e.target.value)} /> <br />
        <input placeholder="Nome" value={data.nome} onChange={e => setData("nome", e.target.value)} /> <br />
        <input type="number" placeholder="Créditos" value={data.creditos} onChange={e => setData("creditos", e.target.value)} /> <br />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}