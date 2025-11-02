import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
  const { c_estudantes, c_disciplinas } = usePage().props;
  const { data, setData, post } = useForm({
    estudante_id: "",
    disciplina_id: "",
    data_inscricao: "",
    nota: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/inscricoes");
  };

  return (
    <div>
      <h1>Nova Inscrição</h1>
      <form onSubmit={submit}>
        <select value={data.estudante_id} onChange={e => setData("estudante_id", e.target.value)}>
          <option value="">Selecione o estudante</option>
          {c_estudantes.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select> <br />

        <select value={data.disciplina_id} onChange={e => setData("disciplina_id", e.target.value)}>
          <option value="">Selecione a disciplina</option>
          {c_disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
        </select> <br />

        <input type="date" value={data.data_inscricao} onChange={e => setData("data_inscricao", e.target.value)} /> <br />
        <input type="number" placeholder="Nota (opcional)" value={data.nota} onChange={e => setData("nota", e.target.value)} /> <br />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}


// import { useForm, usePage } from "@inertiajs/react";

// export default function Create() {
//   const { c_estudantes, c_disciplinas } = usePage().props;
//   const { data, setData, post, errors } = useForm({
//     estudante_id: "",
//     disciplina_id: "",
//     data_inscricao: "",
//     nota: "",
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     post("/inscricoes");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Nova Inscrição</h1>

//       <form onSubmit={submit} className="space-y-4">
//         {/* Estudante */}
//         <div>
//           <label className="block font-medium mb-1 text-gray-700">Estudante:</label>
//           <select
//             value={data.estudante_id}
//             onChange={(e) => setData("estudante_id", e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Selecione o estudante</option>
//             {c_estudantes.map((e) => (
//               <option key={e.id} value={e.id}>
//                 {e.nome}
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
//             <option value="">Selecione a disciplina</option>
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
//           <label className="block font-medium mb-1 text-gray-700">Nota (opcional):</label>
//           <input
//             type="number"
//             step="0.01"
//             placeholder="Digite a nota"
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
//             Salvar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
