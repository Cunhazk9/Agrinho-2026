let streamDeVideo = null;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btn-capturar');
const linhaEscaneamento = document.getElementById('linha-escaneamento');

// Banco de dados simulado para a resposta da IA baseada na luz do ambiente
const catalogoAdubos = [
    {
        nome: "N-P-K 10-10-10 (Fertilizante Mineral Misto)",
        precisao: "94.2%",
        descricao: "Grânulos cinzas/coloridos de liberação rápida. Contém uma fórmula totalmente equilibrada com partes iguais de Nitrogênio, Fósforo e Potássio.",
        uso: "Recomendado para plantas já estabelecidas, manutenção de jardins, árvores frutíferas e folhagens. Promove manutenção contínua.",
        sustentabilidade: "Atenção: Por ser altamente solúvel, evite aplicar antes de tempestades para evitar a lixiviação (lavagem) dos nutrientes para rios."
    },
    {
        nome: "Ureia Agrícola (Alta Concentração de Nitrogênio)",
        precisao: "89.7%",
        descricao: "Pequenas esferas brancas cristalinas. É a maior fonte de Nitrogênio para o solo disponível no mercado.",
        uso: "Fundamental na fase de crescimento vegetativo (folhas e caules). Muito usado em milho, pastagens e gramados.",
        sustentabilidade: "Dica Sustentável: Incorpore a ureia ao solo ou irrigue logo após a aplicação, reduzindo a perda por volatilização de gases na atmosfera."
    },
    {
        nome: "Farinha de Ossos / Adubo Orgânico",
        precisao: "91.5%",
        descricao: "Pó fino de coloração bege a marrom escura. Fonte natural riquíssima em Fósforo e Cálcio de liberação lenta.",
        uso: "Excelente para o desenvolvimento de raízes, floração e frutificação. Misture bem à terra no momento do plantio de mudas.",
        sustentabilidade: "Sustentabilidade Nota 10: Insumo orgânico que regenera a microbiota benéfica do solo e não oferece riscos de queima das raízes."
    }
];

// Ativa o fluxo da câmera real do dispositivo
async function iniciarCamera() {
    try {
        streamDeVideo = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" }, // Prioriza a câmera traseira no celular
            audio: false 
        });
        video.srcObject = streamDeVideo;
        btnCapturar.disabled = false;
        document.getElementById('btn-carregar-camera').innerText = "Câmera Ativa";
        document.getElementById('btn-carregar-camera').style.backgroundColor = "#2e7d32";
    } catch (err) {
        alert("Erro ao acessar a câmera. Certifique-se de dar permissão ou use um navegador moderno.");
        console.error(err);
    }
}

// Simula o processamento de visão computacional da IA
function analisarAdubo() {
    // Ativa a animação visual do scanner (linha vermelha)
    linhaEscaneamento.style.display = "block";
    btnCapturar.innerText = "Processando Imagem...";
    btnCapturar.disabled = true;

    // Oculta resultados anteriores enquanto processa
    document.getElementById('resultado-ia').classList.add('hidden');

    // Espera 2.5 segundos (tempo dramático para fingir o cálculo da IA)
    setTimeout(() => {
        linhaEscaneamento.style.display = "none";
        btnCapturar.innerText = "Analisar Insumo 🌱";
        btnCapturar.disabled = false;

        // Escolhe um adubo aleatório do banco de dados (Simulando uma leitura de visão computacional)
        const itemSorteado = catalogoAdubos[Math.floor(Math.random() * catalogoAdubos.length)];

        // Preenche a tela com a resposta
        document.getElementById('adubo-detectado').innerText = itemSorteado.nome;
        document.getElementById('porcentagem-precisao').innerText = itemSorteado.precisao;
        document.getElementById('adubo-descricao').innerText = itemSorteado.descricao;
        document.getElementById('adubo-uso').innerText = itemSorteado.uso;
        document.getElementById('adubo-sustentavel').innerText = itemSorteado.sustentabilidade;

        // Exibe o painel de resultados e rola a tela até ele
        const painel = document.getElementById('resultado-ia');
        painel.classList.remove('hidden');
        painel.scrollIntoView({ behavior: 'smooth' });

    }, 2500);
}