import { Link, usePage } from "@inertiajs/react";

export default function Index() {
  const { c_inscricoes } = usePage().props;

  return (
    <div>
      <h1>Lista de Inscrições</h1>
      <Link href="/inscricoes/create">➕ Nova Inscrição</Link>

      <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Estudante</th>
            <th>Disciplina</th>
            <th>Data</th>
            <th>Nota</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {c_inscricoes.map((i) => (
            <tr key={i.id}>
              <td>{i.estudante?.nome} {i.estudante?.apelido}</td>
              <td>{i.disciplina?.nome}</td>
              <td>{i.data_inscricao}</td>
              <td>{i.nota ?? "-"}</td>
              <td>
                <Link href={`/inscricoes/${i.id}/edit`}>✏️ Editar</Link> |{" "}
                <Link
                  href={`/inscricoes/${i.id}`}
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    if (!confirm("Apagar esta inscrição?")) e.preventDefault();
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

// import { Link, usePage } from "@inertiajs/react";

// export default function Index() {
//   const { c_inscricoes } = usePage().props;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Lista de Inscrições</h1>
//         <Link
//           href="/inscricoes/create"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           ➕ Nova Inscrição
//         </Link>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
//           <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
//             <tr>
//               <th className="py-3 px-6 text-left">Estudante</th>
//               <th className="py-3 px-6 text-left">Disciplina</th>
//               <th className="py-3 px-6 text-left">Data</th>
//               <th className="py-3 px-6 text-left">Nota</th>
//               <th className="py-3 px-6 text-left">Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {c_inscricoes.map((i) => (
//               <tr
//                 key={i.id}
//                 className="border-b border-gray-200 hover:bg-gray-50 transition"
//               >
//                 <td className="py-3 px-6">
//                   {i.estudante?.nome} {i.estudante?.apelido}
//                 </td>
//                 <td className="py-3 px-6">{i.disciplina?.nome}</td>
//                 <td className="py-3 px-6">{i.data_inscricao}</td>
//                 <td className="py-3 px-6">{i.nota ?? "-"}</td>
//                 <td className="py-3 px-6 flex gap-2">
//                   <Link
//                     href={`/inscricoes/${i.id}/edit`}
//                     className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
//                   >
//                     ✏️ Editar
//                   </Link>
//                   <Link
//                     href={`/inscricoes/${i.id}`}
//                     method="delete"
//                     as="button"
//                     onClick={(e) => {
//                       if (!confirm("Apagar esta inscrição?")) e.preventDefault();
//                     }}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     🗑️ Apagar
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//             {c_inscricoes.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   Nenhuma inscrição encontrada.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }