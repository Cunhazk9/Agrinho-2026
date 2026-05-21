// Banco de Dados Inteligente contendo o portfólio de insumos agrícolas
const bancoInsumos = [
    {
        chaves: ["ureia", "ureia agricola", "nitrogenio"],
        nome: "Ureia Agrícola Granulada",
        tipo: "Fertilizante Mineral Nitrogenado (46% de N)",
        propriedades: "A maior fonte de nitrogênio concentrado do mercado. Composta por grânulos brancos altamente solúveis. Favorece o desenvolvimento celular e o esverdeamento rápido das folhas.",
        uso: "Fundamental para culturas na fase de crescimento vegetativo acelerado (ex: milho, pastagens, cana, trigo e gramados). Deve ser aplicada em cobertura sobre solo úmido.",
        sustentabilidade: "Estratégia ESG: A ureia sofre forte volatilização se exposta ao sol direto, virando gás poluente. Para um manejo verde, incorpore o produto ao solo ou aplique imediatamente antes de chuvas previstas ou irrigação programada para fixar o elemento."
    },
    {
        chaves: ["npk 10-10-10", "10-10-10", "npk equilibrado"],
        nome: "Formulação NPK 10-10-10",
        tipo: "Fertilizante Mineral Misto Balanceado",
        propriedades: "Contém proporções iguais de Nitrogênio (N), Fósforo (P) e Potássio (K). Atua de forma homogênea tanto no crescimento de folhas quanto no fortalecimento de raízes e frutos.",
        uso: "Excelente para a manutenção de plantas já adultas, árvores frutíferas instaladas, folhagens arbustivas e perenes. Aplique espalhado na projeção da copa, sem tocar no tronco.",
        sustentabilidade: "Estratégia ESG: Como possui alta solubilidade, evite o uso em dias de pancadas de chuva severas. Isso previne o efeito de lixiviação, impedindo que o fósforo e o nitrogênio contaminem lençóis freáticos e rios locais."
    },
    {
        chaves: ["calcario", "calcario agricola", "calagem", "corretivo"],
        nome: "Calcário Agrícola (Dolomítico / Calcítico)",
        tipo: "Corretivo de Acidez do Solo",
        propriedades: "Rico em Carbonato de Cálcio e Magnésio. Neutraliza o alumínio tóxico da terra e eleva o pH, deixando o solo propício para a vida biológica e absorção de nutrientes.",
        uso: "Deve ser incorporado uniformemente nas camadas aráveis durante a fase de preparo do solo, preferencialmente de 60 a 90 dias antes de realizar qualquer semeadura.",
        sustentabilidade: "Estratégia ESG: A calagem correta aumenta a eficiência de todos os outros fertilizantes minerais em até 50%. Usá-lo evita o desperdício crônico de insumos industriais e preserva a saúde mineral natural da propriedade."
    },
    {
        chaves: ["esterco", "organico", "esterco de galinha", "esterco de curral", "humus"],
        nome: "Matéria Orgânica Compostada (Estercos/Húmus)",
        tipo: "Fertilizante Orgânico Regenerativo",
        propriedades: "Composto rico em microrganismos benéficos, ácidos fúlvicos e húmicos. Melhora a física do solo, criando agregados que retêm água por muito mais tempo e arejam as raízes.",
        uso: "Indicado para a base de hortas biológicas, pomares integrados, covas de mudas florestais e recuperação de solos compactados ou arenosos.",
        sustentabilidade: "Estratégia ESG: O ápice da economia circular no campo. É obrigatório o uso de estercos totalmente curados (compostados). O uso de composto cru gera emissões severas de gás metano e pode queimar o sistema radicular devido à fermentação tardia."
    },
    {
        chaves: ["npk 04-14-08", "04-14-08", "adubo de plantio"],
        nome: "Formulação NPK 04-14-08",
        tipo: "Fertilizante Mineral Misto Potencializador de Raiz",
        propriedades: "Fórmula de arrancada com altíssima concentração de Fósforo (14%). Este elemento fornece a energia molecular (ATP) necessária para o início da vida vegetal.",
        uso: "Específico para a base do plantio (fundação/sulco). Muito utilizado no plantio de grãos (soja/milho), tubérculos e transplante de mudas arbóreas.",
        sustentabilidade: "Estratégia ESG: O fósforo move-se pouquíssimo no solo. Depositar o adubo na profundidade correta (logo abaixo da semente) otimiza o recurso, reduzindo a necessidade de reaplicações por deficiência e gerando economia energética na lavoura."
    }
];

// Captura dos elementos do HTML
const campoBusca = document.getElementById('search-input');
const secaoResultados = document.getElementById('results-section');
const secaoErro = document.getElementById('no-results');

const txtNome = document.getElementById('insumo-nome');
const txtTipo = document.getElementById('insumo-tipo');
const txtPropriedades = document.getElementById('insumo-propriedades');
const txtUso = document.getElementById('insumo-uso');
const txtSustentavel = document.getElementById('insumo-sustentavel');

// Escuta a digitação do usuário em tempo real
campoBusca.addEventListener('input', function() {
    const buscaUsuario = campoBusca.value.trim().toLowerCase();

    // Se o campo estiver totalmente vazio, esconde os blocos informativos
    if (buscaUsuario === "") {
        secaoResultados.classList.add('hidden');
        secaoErro.classList.add('hidden');
        return;
    }

    // Procura no banco de dados se alguma das palavras-chave bate com a busca
    const insumoEncontrado = bancoInsumos.find(insumo => 
        insumo.chaves.some(chave => chave.includes(buscaUsuario))
    );

    if (insumoEncontrado) {
        // Alimenta o layout semântico com os dados correspondentes imediatamente
        txtNome.innerText = insumoEncontrado.nome;
        txtTipo.innerText = insumoEncontrado.tipo;
        txtPropriedades.innerText = insumoEncontrado.propriedades;
        txtUso.innerText = insumoEncontrado.uso;
        txtSustentavel.innerText = insumoEncontrado.sustentabilidade;

        // Gerencia as classes para exibir o resultado e sumir com o erro
        secaoResultados.classList.remove('hidden');
        secaoErro.classList.add('hidden');
    } else {
        // Se não encontrar, esconde o card técnico e exibe o aviso amigável
        secaoResultados.classList.add('hidden');
        secaoErro.classList.remove('hidden');
    }
});