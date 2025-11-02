import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const  v_cursos  = usePage().props.c_cursos;

  return (
    <div>
      <h1>Lista de Cursos</h1>
      <Link href="/cursos/create">➕ Novo Curso</Link>
      <table border="1" cellPadding="5" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {v_cursos.map((c) => (
            <tr key={c.id}>
              <td>{c.codigo}</td>
              <td>{c.nome}</td>
              <td>{c.duracao} anos</td>
              <td>
                <Link href={`/cursos/${c.id}/edit`}>✏️ Editar</Link> |{" "}
                <Link
                  href={`/cursos/${c.id}`}
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    if (!confirm("Apagar este curso?")) e.preventDefault();
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