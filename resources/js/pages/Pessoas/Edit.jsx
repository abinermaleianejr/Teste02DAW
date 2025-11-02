import { Link, useForm } from "@inertiajs/react";

export default function Edit({ c_pessoa }) {
  const { data, setData, errors } = useForm({
    bi: c_pessoa.bi || "",
    apelido: c_pessoa.apelido || "",
    nome: c_pessoa.nome || "",
    idade: c_pessoa.idade || "",
  });

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px 16px",
    marginBottom: "10px",
    width: "250px",
  };

  return (
    <div>
      <h1>Editar Pessoa</h1>

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

      <Link
        href={`/pessoas/${c_pessoa.id}`}
        method="put"
        data={data}
        as="button"
      >
        Actualizar
      </Link>
    </div>
  );
}
