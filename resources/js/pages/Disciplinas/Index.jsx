import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const v_disciplinas = usePage().props.c_disciplinas;

  return (
    <div>
      <h1>Lista de Disciplinas</h1>
      <Link href="/disciplinas/create">➕ Nova Disciplina</Link>

      <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Créditos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {v_disciplinas.map((d) => (
            <tr key={d.id}>
              <td>{d.codigo}</td>
              <td>{d.nome}</td>
              <td>{d.creditos}</td>
              <td>
                <Link href={`/disciplinas/${d.id}/edit`}>✏️ Editar</Link> |{" "}
                <Link
                  href={`/disciplinas/${d.id}`}
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    if (!confirm("Apagar esta disciplina?")) e.preventDefault();
                  }}
                >
                  🗑️ Apagar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}