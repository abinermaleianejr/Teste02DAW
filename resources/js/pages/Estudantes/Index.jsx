import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const v_estudantes = usePage().props.c_estudantes;

  return (
    <div>
      <h1>Lista de Estudantes</h1>
      <Link href="/estudantes/create">➕ Novo Estudante</Link>

      <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Apelido</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {v_estudantes.map((e) => (
            <tr key={e.id}>
              <td>{e.codigo}</td>
              <td>{e.apelido}</td>
              <td>{e.nome}</td>
              <td>{e.curso?.nome || "-"}</td>
              <td>
                  <Link
                    href={`/estudantes/${e.id}/ver`}
                  >
                    👁️ Ver
                  </Link>
                <Link href={`/estudantes/${e.id}/edit`}>✏️ Editar</Link> |{" "}
                <Link
                  href={`/estudantes/${e.id}`}
                  method="delete"
                  as="button"
                  onClick={(ev) => {
                    if (!confirm("Apagar este estudante?")) ev.preventDefault();
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