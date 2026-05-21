// Banco de dados local para simular respostas imediatas da IA
const bancoDadosAgro = {
    "ureia": `
        <h4>🌱 O que é:</h4> <p>Insumo com alta concentração de Nitrogênio (cerca de 46%).</p>
        <h4>🚜 Recomendação de Uso:</h4> <p>Ideal para culturas que exigem rápido desenvolvimento foliar, como milho e pastagens.</p>
        <h4>⚠️ Cuidados Críticos:</h4> <p>Aplique em solo úmido ou incorpore logo após a aplicação para evitar perdas por volatilização da amônia.</p>
    `,
    "npk 10-10-10": `
        <h4>🌱 O que é:</h4> <p>Adubo mineral NPK balanceado (proporções iguais de Nitrogênio, Fósforo e Potássio).</p>
        <h4>🚜 Recomendação de Uso:</h4> <p>Excelente para manutenção geral de plantas, hortaliças, frutíferas e plantas jovens.</p>
        <h4>⚠️ Cuidados Críticos:</h4> <p>Evite o contato direto do adubo com as raízes ou sementes para prevenir fitotoxicidade (queima).</p>
    `,
    "calcario": `
        <h4>🌱 O que é:</h4> <p>Corretivo agrícola rico em Cálcio e Magnésio.</p>
        <h4>🚜 Recomendação de Uso:</h4> <p>Utilizado para corrigir a acidez do solo (elevar o pH) e fornecer nutrientes essenciais.</p>
        <h4>⚠️ Cuidados Críticos:</h4> <p>Deve ser aplicado com antecedência do plantio (idealmente 3 meses antes) para que reaja perfeitamente com o solo.</p>
    `,
    "gesso agricola": `
        <h4>🌱 O que é:</h4> <p>Condicionador de subsuperfície rico em Cálcio e Enxofre.</p>
        <h4>🚜 Recomendação de Uso:</h4> <p>Melhora o ambiente radicular em camadas profundas do solo, ajudando as raízes a buscarem água em períodos de seca.</p>
        <h4>⚠️ Cuidados Críticos:</h4> <p>Não substitui o calcário na neutralização da acidez da camada superficial do solo.</p>
    `
};

function buscarInsumo(event) {
    // Impede a página de recarregar
    event.preventDefault();

    const input = document.getElementById('insumo-input');
    const resultadoSeccao = document.getElementById('result-section');
    const resultadoConteudo = document.getElementById('result-content');
    
    // Transforma a busca em minúsculas para bater com o banco de dados
    const termoBusca = input.value.trim().toLowerCase();

    // Exibe a seção de resposta
    resultadoSeccao.classList.remove('hidden');

    // Verifica se temos o termo no banco ou gera uma resposta padrão "IA"
    if (bancoDadosAgro[termoBusca]) {
        resultadoConteudo.innerHTML = bancoDadosAgro[termoBusca];
    } else {
        // Resposta genérica inteligente caso o produto não esteja listado acima
        resultadoConteudo.innerHTML = `
            <h4>🌱 Análise do Insumo: "${input.value}"</h4>
            <p>Identificamos este produto como um insumo/adubo potencial.</p>
            <h4>🚜 Orientação Geral:</h4>
            <p>Recomendamos realizar a análise de solo da propriedade antes da aplicação para calcular a dosagem exata por hectare.</p>
            <h4>⚠️ Nota Técnica:</h4>
            <p>Consulte sempre o Engenheiro Agrônomo da sua região para checar a compatibilidade deste produto com a sua cultura.</p>
        `;
    }

    // Rola a tela suavemente até a resposta
    resultadoSeccao.scrollIntoView({ behavior: 'smooth' });
}
