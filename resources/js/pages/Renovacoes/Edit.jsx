import { useForm, usePage } from "@inertiajs/react";

export default function Edit({ renovacao }) {
    const { data, setData, put, errors, processing } = useForm({
        estado: renovacao.estado || "pendente",
        observacoes: renovacao.observacoes || ""
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/renovacoes/${renovacao.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Renovação de Matrícula</h1>

            {/* Informações da Renovação */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">📋 Informações da Renovação</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium">Estudante:</span>
                        <p>{renovacao.estudante?.nome} {renovacao.estudante?.apelido}</p>
                        <p className="text-gray-600">{renovacao.estudante?.codigo}</p>
                    </div>
                    <div>
                        <span className="font-medium">Ano Lectivo:</span>
                        <p>{renovacao.ano_lectivo}</p>
                    </div>
                    <div>
                        <span className="font-medium">Data de Renovação:</span>
                        <p>{new Date(renovacao.data_renovacao).toLocaleDateString('pt-PT')}</p>
                    </div>
                    <div>
                        <span className="font-medium">Estado Actual:</span>
                        <p className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            renovacao.estado === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                            renovacao.estado === 'aprovada' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {renovacao.estado}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Estado */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Estado *</label>
                    <select
                        value={data.estado}
                        onChange={(e) => setData("estado", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="pendente">⏳ Pendente</option>
                        <option value="aprovada">✅ Aprovada</option>
                        <option value="rejeitada">❌ Rejeitada</option>
                    </select>
                    {errors.estado && (
                        <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                    )}
                </div>

                {/* Observações */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Observações</label>
                    <textarea
                        placeholder="Observações sobre a renovação"
                        value={data.observacoes}
                        onChange={(e) => setData("observacoes", e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.observacoes && (
                        <p className="text-red-500 text-sm mt-1">{errors.observacoes}</p>
                    )}
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {processing ? 'A actualizar...' : '💾 Actualizar Renovação'}
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