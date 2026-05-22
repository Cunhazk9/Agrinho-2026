// Simulador de Banco de Dados Gigante (Exemplo com alguns dados)
// Na vida real, estes dados viriam de um banco como MySQL, PostgreSQL ou MongoDB.
const bancoDeDadosAgro = [
    {
        titulo: "Cultivo de Soja: Guia Completo de Manejo",
        descricao: "Aprenda sobre o plantio direto da soja, época de semeadura, calagem, espaçamento ideal e controle fitossanitário para máxima produtividade.",
        tags: ["soja", "plantio", "manejo", "grãos"]
    },
    {
        titulo: "Sistemas de Irrigação por Gotejamento",
        descricao: "Como economizar até 40% de água na lavoura utilizando a tecnologia de irrigação localizada por gotejamento e manejo de solo.",
        tags: ["irrigação", "água", "tecnologia", "gotejamento"]
    },
    {
        titulo: "Como combater a Lagarta-do-Cartucho no Milho",
        descricao: "Métodos biológicos e químicos eficientes para controlar a Spodoptera frugiperda (lagarta-do-cartucho) na sua plantação de milho.",
        tags: ["milho", "pragas", "lagarta", "defensivos"]
    },
    {
        titulo: "Agricultura de Precisão e Drones",
        descricao: "O uso de sensores remotos, mapas de produtividade e drones para mapear falhas e aplicar fertilizantes na quantidade exata.",
        tags: ["tecnologia", "drones", "precisão", "satélite"]
    },
    {
        titulo: "Rotação de Culturas e Cobertura de Solo",
        descricao: "Descubra as vantagens de rotacionar gramíneas e leguminosas para recuperar os nutrientes do solo e evitar a erosão.",
        tags: ["solo", "rotação", "cobertura", "sustentabilidade"]
    }
];

// Seleção de elementos da interface
const inputPesquisa = document.getElementById('inputPesquisa');
const botaoPesquisar = document.getElementById('botaoPesquisar');
const containerResultados = document.getElementById('resultados');

// Função que realiza a busca
function executarBusca() {
    const termoBuscado = inputPesquisa.value.toLowerCase().trim();
    containerResultados.innerHTML = ""; // Limpa os resultados anteriores

    if (termoBuscado === "") {
        containerResultados.innerHTML = "<p style='text-align:center; color:#70757a;'>Digite algo para pesquisar.</p>";
        return;
    }

    // Filtra o banco de dados procurando termos no título, descrição ou tags
    const resultadosFiltrados = bancoDeDadosAgro.filter(item => {
        return item.titulo.toLowerCase().includes(termoBuscado) || 
               item.descricao.toLowerCase().includes(termoBuscado) ||
               item.tags.some(tag => tag.includes(termoBuscado));
    });

    // Exibe os resultados na tela
    if (resultadosFiltrados.length > 0) {
        resultadosFiltrados.forEach(item => {
            const divItem = document.createElement('div');
            divItem.className = 'resultado-item';
            divItem.innerHTML = `
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
            `;
            containerResultados.appendChild(divItem);
        });
    } else {
        containerResultados.innerHTML = "<p style='text-align:center; color:#70757a;'>Nenhum resultado encontrado para esta busca.</p>";
    }
}

// Escutadores de Eventos (Clique no botão ou pressionar a tecla Enter)
botaoPesquisar.addEventListener('click', executarBusca);
inputPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        executarBusca();
    }
});
