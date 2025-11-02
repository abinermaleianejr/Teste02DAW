import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const v_pessoas = usePage().props.c_pessoas; //const { pessoas } = usePage().props;

  return (
    <div>
      <h1>Lista de Pessoas</h1>
      <Link href="/pessoas/create">➕ Nova Pessoa</Link>
       <table >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>BI</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* {pessoas.data.map((p) para paginacao*/}
          {v_pessoas.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.apelido}</td>
              <td>{p.bi}</td>
              <td>{p.idade} anos</td>
              <td>
                <Link href={`/pessoas/${p.id}/edit`}>✏️ Editar</Link>
                {" | "}
                <Link
                  href={`/pessoas/${p.id}`}
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    if (!confirm("Apagar esta pessoa?")) {
                      e.preventDefault(); // cancela o envio do DELETE
                    }
                  }}>🗑️ Apagar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div style={{ marginTop: "15px" }}>
        {pessoas.links.map((link, i) => (
          <Link
            key={i}
            href={link.url || "#"}
            style={{
              margin: "0 5px",
              textDecoration: link.active ? "underline" : "none",
              color: link.url ? "blue" : "gray",
            }}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div> para paginacao*/}

    </div>
    
  );
}
