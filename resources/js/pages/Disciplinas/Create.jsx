import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    codigo: "",
    nome: "",
    creditos: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/disciplinas");
  };

  return (
    <div>
      <h1>Nova Disciplina</h1>
      <form onSubmit={submit}>
        <input placeholder="Código" value={data.codigo} onChange={e => setData("codigo", e.target.value)} /> <br />
        <input placeholder="Nome" value={data.nome} onChange={e => setData("nome", e.target.value)} /> <br />
        <input type="number" placeholder="Créditos" value={data.creditos} onChange={e => setData("creditos", e.target.value)} /> <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}