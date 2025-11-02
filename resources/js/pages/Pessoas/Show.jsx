import { Link, usePage } from "@inertiajs/react";

export default function Show() {
  // Pega os dados enviados pelo Laravel (PessoaController@show)
  const { c_pessoa } = usePage().props;

  if (!c_pessoa) {
    return <div>Carregando...</div>;
  }

  // Estilo simples para visualização
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "20px",
    width: "350px",
    marginTop: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const labelStyle = { fontWeight: "bold", display: "block", marginTop: "10px" };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detalhes da Pessoa</h1>

      <div style={cardStyle}>
        <p>
          <span style={labelStyle}>ID:</span>
          {c_pessoa.id}
        </p>
        <p>
          <span style={labelStyle}>BI:</span>
          {c_pessoa.bi}
        </p>
        <p>
          <span style={labelStyle}>Nome:</span>
          {c_pessoa.nome}
        </p>
        <p>
          <span style={labelStyle}>Apelido:</span>
          {c_pessoa.apelido}
        </p>
        <p>
          <span style={labelStyle}>Idade:</span>
          {c_pessoa.idade} anos
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link
          href={`/pessoas/${c_pessoa.id}/edit`}
          style={{
            marginRight: "10px",
            padding: "8px 12px",
            backgroundColor: "#ffc107",
            color: "black",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          ✏️ Editar
        </Link>

        <Link
          href="/pessoas"
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          ⬅️ Voltar
        </Link>
      </div>
    </div>
  );
}