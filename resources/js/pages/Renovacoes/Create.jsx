import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { estudantes } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        estudante_id: "",
        data_renovacao: new Date().toISOString().split('T')[0],
        observacoes: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post("/renovacoes");
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Nova Renovação de Matrícula</h1>

            <form onSubmit={submit} className="space-y-4">
                {/* Estudante */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Estudante *</label>
                    <select
                        value={data.estudante_id}
                        onChange={(e) => setData("estudante_id", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione um estudante</option>
                        {estudantes.map((estudante) => (
                            <option key={estudante.id} value={estudante.id}>
                                {estudante.codigo} - {estudante.nome} {estudante.apelido}
                            </option>
                        ))}
                    </select>
                    {errors.estudante_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.estudante_id}</p>
                    )}
                    {estudantes.length === 0 && (
                        <p className="text-yellow-600 text-sm mt-1">
                            Não há estudantes disponíveis para renovação este ano.
                        </p>
                    )}
                </div>

                {/* Data de Renovação */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Data de Renovação *</label>
                    <input
                        type="date"
                        value={data.data_renovacao}
                        onChange={(e) => setData("data_renovacao", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.data_renovacao && (
                        <p className="text-red-500 text-sm mt-1">{errors.data_renovacao}</p>
                    )}
                </div>

                {/* Observações */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Observações</label>
                    <textarea
                        placeholder="Observações sobre a renovação (opcional)"
                        value={data.observacoes}
                        onChange={(e) => setData("observacoes", e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.observacoes && (
                        <p className="text-red-500 text-sm mt-1">{errors.observacoes}</p>
                    )}
                </div>

                {/* Informações */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                    <h3 className="font-semibold text-blue-800 mb-2">📋 Informações</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• A renovação será criada com estado <strong>Pendente</strong></li>
                        <li>• O ano lectivo será automaticamente definido como o ano corrente</li>
                        <li>• Apenas estudantes sem renovação para o ano corrente são mostrados</li>
                    </ul>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {processing ? 'A processar...' : '📝 Registar Renovação'}
                    </button>
                    <a
                        href="/renovacoes"
                        className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
                    >
                        ↩️ Voltar
                    </a>
                </div>
            </form>
        </div>
    );
}