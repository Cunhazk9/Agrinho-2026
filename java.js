// Banco de dados completo dos adubos para a busca dinâmica
const catalogoAdubos = [
    {
        nome: "Ureia Agrícola",
        tipo: "Mineral Simples",
        nutrientes: "Nitrogênio (46%)",
        aparencia: "Pequenas esferas brancas e cristalinas",
        uso: "Fundamental na fase de crescimento vegetativo (folhas e caules). Muito usado em milho, pastagens, cana-de-açúcar e gramados.",
        sustentabilidade: "Dica Sustentável: Incorpore a ureia ao solo ou irrigue logo após a aplicação, reduzindo a perda por volatilização de gases na atmosfera."
    },
    {
        nome: "NPK 10-10-10",
        tipo: "Mineral Misto (Equilibrado)",
        nutrientes: "Nitrogênio (10%), Fósforo (10%), Potássio (10%)",
        aparencia: "Grânulos cinzas ou coloridos misturados",
        uso: "Recomendado para plantas já estabelecidas, manutenção de jardins, árvores frutíferas e folhagens. Promove a manutenção contínua e saudável.",
        sustentabilidade: "Atenção: Por ser altamente solúvel, evite aplicar antes de tempestades para evitar que a chuva lave os nutrientes para rios e lagos."
    },
    {
        nome: "NPK 04-14-08",
        tipo: "Mineral Misto (Arrancada)",
        nutrientes: "Nitrogênio (4%), Fósforo (14%), Potássio (8%)",
        aparencia: "Grânulos cinzas ou marrons",
        uso: "Ideal para a base do plantio (fundação). O alto teor de Fósforo estimula o crescimento forte das raízes e o estabelecimento inicial da cultura.",
        sustentabilidade: "Uso Inteligente: Garanta que o adubo fique posicionado próximo à linha de semeadura, mas sem tocar direto na semente para não queimá-la."
    },
    {
        nome: "Farinha de Ossos",
        tipo: "Orgânico",
        nutrientes: "Fósforo e Cálcio",
        aparencia: "Pó fino de coloração bege a marrom clara",
        uso: "Excelente para o desenvolvimento de raízes, floração e frutificação. Muito utilizado em hortas domésticas, pomares e transplante de mudas.",
        sustentabilidade: "Sustentabilidade Nota 10: Insumo orgânico de liberação lenta que regenera a microbiota benéfica do solo e reduz o risco de superdosagem."
    },
    {
        nome: "Esterco de Curral / Galinha",
        tipo: "Orgânico Composto",
        nutrientes: "Nutrientes variados e Matéria Orgânica",
        aparencia: "Massa escura texturizada ou farelo marrom",
        uso: "Melhoria geral da estrutura do solo. Deve ser misturado à terra semanas antes do plantio para condicionar o solo.",
        sustentabilidade: "Regra de Ouro: Use sempre esterco bem curtido (compostado). O uso de esterco fresco pode introduzir pragas, sementes de plantas daninhas e queimar as raízes."
    },
    {
        nome: "Calcário Agrícola",
        tipo: "Corretivo de Solo",
        nutrientes: "Cálcio e Magnésio",
        aparencia: "Pó fino branco, cinza ou levemente amarelado",
        uso: "Aplicado na fase de preparação do solo (calagem) para reduzir a acidez excessiva e elevar o pH, preparando a terra para receber os adubos.",
        sustentabilidade: "Eficiência Prática: Solos corrigidos com calcário aumentam a eficiência da absorção dos outros adubos em até 50%, evitando desperdício de dinheiro."
    }
];

// Função que filtra os adubos de acordo com o que o usuário digita
function filtrarAdubos() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();
    const containerResultados = document.getElementById('lista-resultados');
    
    // Limpa a tela de resultados anteriores
    containerResultados.innerHTML = "";

    // Filtra o banco de dados buscando por nome, aparência ou tipo
    const adubosFiltrados = catalogoAdubos.filter(adubo => {
        return adubo.nome.toLowerCase().includes(termoBusca) || 
               adubo.aparencia.toLowerCase().includes(termoBusca) ||
               adubo.tipo.toLowerCase().includes(termoBusca);
    });

    // Se não encontrar nada
    if (adubosFiltrados.length === 0) {
        containerResultados.innerHTML = `<p class="sem-resultado">Nenhum adubo encontrado para "${termoBusca}". Tente termos como 'Ureia', 'Pó', 'Grânulos' ou 'Orgânico'.</p>`;
        return;
    }

    // Gera o HTML dinamicamente para cada adubo encontrado
    adubosFiltrados.forEach(adubo => {
        const cartaoAdubo = document.createElement('div');
        cartaoAdubo.className = 'card-adubo';

        cartaoAdubo.innerHTML = `
            <div class="card-header">
                <h2>${adubo.nome}</h2>
                <span class="badge-tipo">${adubo.tipo}</span>
            </div>
            <div class="card-body">
                <p><strong>🧪 Nutrientes Principais:</strong> ${adubo.nutrientes}</p>
                <p><strong>👁️ Aparência Física:</strong> ${adubo.aparencia}</p>
                <hr>
                <p><strong>🚜 Onde e Como Usar:</strong> ${adubo.uso}</p>
                <div class="alerta-sustentavel">
                    <h5>🌱 Foco Sustentável & Eficiência:</h5>
                    <p>${adubo.sustentabilidade}</p>
                </div>
            </div>
        `;

        containerResultados.appendChild(cartaoAdubo);
    });
}

// Inicializa a página mostrando todos os adubos do catálogo ao carregar
window.onload = function() {
    filtrarAdubos();
};