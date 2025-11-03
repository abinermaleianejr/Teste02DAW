import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ renovacoes, estatisticas, filters }) {
    const [filtros, setFiltros] = useState({
        estudante_nome: filters.estudante_nome || '',
        ano_lectivo: filters.ano_lectivo || '',
        estado: filters.estado || ''
    });

    const handleFilter = () => {
        router.get('/renovacoes', filtros, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setFiltros({ estudante_nome: '', ano_lectivo: '', estado: '' });
        router.get('/renovacoes');
    };

    const handleAprovar = (renovacaoId) => {
        if (confirm('Tem certeza que deseja aprovar esta renovação?')) {
            router.post(`/renovacoes/${renovacaoId}/aprovar`);
        }
    };

    const handleRejeitar = (renovacaoId) => {
        if (confirm('Tem certeza que deseja rejeitar esta renovação?')) {
            router.post(`/renovacoes/${renovacaoId}/rejeitar`);
        }
    };

    const getEstadoBadge = (estado) => {
        const estados = {
            pendente: { cor: 'bg-yellow-100 text-yellow-800', texto: '⏳ Pendente' },
            aprovada: { cor: 'bg-green-100 text-green-800', texto: '✅ Aprovada' },
            rejeitada: { cor: 'bg-red-100 text-red-800', texto: '❌ Rejeitada' }
        };
        return estados[estado] || estados.pendente;
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Histórico de Renovações de Matrícula</h1>
                <Link
                    href="/renovacoes/create"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    📝 Nova Renovação
                </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-blue-800">Total Renovações</h3>
                    <p className="text-2xl font-bold text-blue-600">{estatisticas.total}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-yellow-800">Pendentes</h3>
                    <p className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes}</p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-green-800">Aprovadas</h3>
                    <p className="text-2xl font-bold text-green-600">{estatisticas.aprovadas}</p>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-red-800">Rejeitadas</h3>
                    <p className="text-2xl font-bold text-red-600">{estatisticas.rejeitadas}</p>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-3 text-gray-700">Filtros</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estudante</label>
                        <input
                            type="text"
                            placeholder="Filtrar por estudante"
                            value={filtros.estudante_nome}
                            onChange={(e) => setFiltros({...filtros, estudante_nome: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ano Lectivo</label>
                        <input
                            type="number"
                            placeholder="Ano lectivo"
                            value={filtros.ano_lectivo}
                            onChange={(e) => setFiltros({...filtros, ano_lectivo: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            min="2000"
                            max={new Date().getFullYear() + 1}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select
                            value={filtros.estado}
                            onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Todos os estados</option>
                            <option value="pendente">Pendente</option>
                            <option value="aprovada">Aprovada</option>
                            <option value="rejeitada">Rejeitada</option>
                        </select>
                    </div>
                    <div className="flex items-end gap-2">
                        <button 
                            onClick={handleFilter} 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1"
                        >
                            🔍 Filtrar
                        </button>
                        <button 
                            onClick={clearFilters} 
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            🗑️ Limpar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabela de Renovações */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudante</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano Lectivo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Renovação</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {renovacoes.map((renovacao) => {
                            const estado = getEstadoBadge(renovacao.estado);
                            return (
                                <tr key={renovacao.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        {renovacao.estudante?.nome} {renovacao.estudante?.apelido}
                                        <br />
                                        <span className="text-xs text-gray-500">{renovacao.estudante?.codigo}</span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        {renovacao.ano_lectivo}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(renovacao.data_renovacao).toLocaleDateString('pt-PT')}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estado.cor}`}>
                                            {estado.texto}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                        {renovacao.observacoes || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {renovacao.estado === 'pendente' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAprovar(renovacao.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Aprovar renovação"
                                                    >
                                                        ✅
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejeitar(renovacao.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Rejeitar renovação"
                                                    >
                                                        ❌
                                                    </button>
                                                </>
                                            )}
                                            <Link 
                                                href={`/renovacoes/${renovacao.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                ✏️
                                            </Link>
                                            <Link
                                                href={`/renovacoes/${renovacao.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={(e) => {
                                                    if (!confirm("Tem certeza que deseja eliminar esta renovação?")) e.preventDefault();
                                                }}
                                            >
                                                🗑️
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mensagem quando não há resultados */}
            {renovacoes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    Nenhuma renovação de matrícula encontrada com os filtros aplicados.
                </div>
            )}
        </div>
    );
}