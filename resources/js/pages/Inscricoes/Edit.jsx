import { useForm } from "@inertiajs/react";

export default function Edit({
  c_inscricao,
  c_estudantes,
  c_disciplinas,
}) {
  const { data, setData, put, errors } = useForm({
    estudante_id: c_inscricao.estudante_id|| "" ,
    disciplina_id: c_inscricao.disciplina_id|| "",
    data_inscricao: c_inscricao.data_inscricao || "",
    nota: c_inscricao.nota || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/inscricoes/${c_inscricao.id}`);
  };

  return (
    <div>
      <h1>Editar Inscrição</h1>
      <form onSubmit={submit}>
        <label>Estudante:</label><br />
        <select value={data.estudante_id} onChange={e => setData("estudante_id", e.target.value)}>
          <option value="">Selecione um estudante</option>
          {c_estudantes.map(est => <option key={est.id} value={est.id}>{est.nome}{est.apelido}</option>)}
        </select>
        <br />
  
        <select value={data.disciplina_id} onChange={e => setData("disciplina_id", e.target.value)}>
          <option value="">Selecione uma disciplina</option>
          {c_disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
        </select>
        <br />

        <label>Data de Inscrição:</label><br />
        <input
          type="date"
          value={data.data_inscricao}
          onChange={(e) => setData("data_inscricao", e.target.value)}
        />
        {errors.data_inscricao && <div>{errors.data_inscricao}</div>}
        <br />

        <label>Nota:</label><br />
        <input
          type="number"
          step="0.01"
          value={data.nota}
          onChange={(e) => setData("nota", e.target.value)}
        />
        {errors.nota && <div>{errors.nota}</div>}
        <br />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

// import { useForm } from "@inertiajs/react";

// export default function Edit({ c_inscricao, c_estudantes, c_disciplinas }) {
//   const { data, setData, put, errors } = useForm({
//     estudante_id: c_inscricao.estudante_id || "",
//     disciplina_id: c_inscricao.disciplina_id || "",
//     data_inscricao: c_inscricao.data_inscricao || "",
//     nota: c_inscricao.nota || "",
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     put(`/inscricoes/${c_inscricao.id}`);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Inscrição</h1>

//       <form onSubmit={submit} className="space-y-4">
//         {/* Estudante */}
//         <div>
//           <label className="block font-medium mb-1 text-gray-700">Estudante:</label>
//           <select
//             value={data.estudante_id}
//             onChange={(e) => setData("estudante_id", e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Selecione um estudante</option>
//             {c_estudantes.map((est) => (
//               <option key={est.id} value={est.id}>
//                 {est.nome} {est.apelido}
//               </option>
//             ))}
//           </select>
//           {errors.estudante_id && (
//             <p className="text-red-500 text-sm mt-1">{errors.estudante_id}</p>
//           )}
//         </div>

//         {/* Disciplina */}
//         <div>
//           <label className="block font-medium mb-1 text-gray-700">Disciplina:</label>
//           <select
//             value={data.disciplina_id}
//             onChange={(e) => setData("disciplina_id", e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Selecione uma disciplina</option>
//             {c_disciplinas.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.nome}
//               </option>
//             ))}
//           </select>
//           {errors.disciplina_id && (
//             <p className="text-red-500 text-sm mt-1">{errors.disciplina_id}</p>
//           )}
//         </div>

//         {/* Data de inscrição */}
//         <div>
//           <label className="block font-medium mb-1 text-gray-700">Data de Inscrição:</label>
//           <input
//             type="date"
//             value={data.data_inscricao}
//             onChange={(e) => setData("data_inscricao", e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.data_inscricao && (
//             <p className="text-red-500 text-sm mt-1">{errors.data_inscricao}</p>
//           )}
//         </div>

//         {/* Nota */}
//         <div>
//           <label className="block font-medium mb-1 text-gray-700">Nota:</label>
//           <input
//             type="number"
//             step="0.01"
//             value={data.nota}
//             onChange={(e) => setData("nota", e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.nota && (
//             <p className="text-red-500 text-sm mt-1">{errors.nota}</p>
//           )}
//         </div>

//         {/* Botão */}
//         <div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Atualizar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
