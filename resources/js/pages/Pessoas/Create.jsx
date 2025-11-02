import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    bi: "",
    apelido: "",
    nome: "",
    idade: "",
  });

  function submit(e) {
    e.preventDefault();
    post("/pessoas");
  }

  // estilo base para os inputs
  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px 16px",
    marginBottom: "10px",
    width: "250px",
  };

  return (
    <div>
      <h1 style={{ padding: "8px 16px", marginTop: "10px" }}>Criar Pessoa</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="BI"
          value={data.bi}
          onChange={(e) => setData("bi", e.target.value)}
          style={inputStyle}
        />
        {errors.bi && <div>{errors.bi}</div>}
        <br />

        <input
          type="text"
          placeholder="Apelido"
          value={data.apelido}
          onChange={(e) => setData("apelido", e.target.value)}
          style={inputStyle}
        />
        {errors.apelido && <div>{errors.apelido}</div>}
        <br />

        <input
          type="text"
          placeholder="Nome"
          value={data.nome}
          onChange={(e) => setData("nome", e.target.value)}
          style={inputStyle}
        />
        {errors.nome && <div>{errors.nome}</div>}
        <br />

        <input
          type="number"
          placeholder="Idade"
          value={data.idade}
          onChange={(e) => setData("idade", e.target.value)}
          style={inputStyle}
        />
        {errors.idade && <div>{errors.idade}</div>}
        <br />

        <button type="submit" style={{ padding: "8px 16px", marginTop: "10px" }}>Salvar</button>
      </form>
    </div>
  );
}
