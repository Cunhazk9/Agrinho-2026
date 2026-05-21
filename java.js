// Banco de dados dos adubos (Simulando o que a IA traria de resposta)
const bancoAdubos = {
    ureia: {
        nome: "Ureia (Fonte de Nitrogênio - 46%)",
        caracteristicas: "É um adubo mineral sólido, granulado e altamente concentrado em Nitrogênio. Tem rápida absorção pelas plantas, mas é altamente volátil (evapora fácil se ficar exposto ao sol e calor).",
        uso: "Ideal para culturas de crescimento rápido como milho, cana-de-açúcar, pastagens e hortaliças. Deve ser incorporado ao solo ou aplicado logo antes de uma chuva ou irrigação para evitar perdas."
    },
    npk: {
        nome: "NPK (Fórmulas Balanceadas)",
        caracteristicas: "Adubo misto composto por Nitrogênio (N), Fósforo (P) e Potássio (K). As proporções mudam de acordo com o número (ex: 04-14-08 é rico em Fósforo, ótimo para raízes).",
        uso: "Usado na base do plantio (fundação) de quase todas as culturas (soja, café, frutíferas). Garante que a planta nasça com todos os nutrientes essenciais disponíveis desde o início."
    },
    organico: {
        nome: "Adubo Orgânico (Esterco, Húmus, Compostagem)",
        caracteristicas: "Feito a partir de matéria orgânica decomposta. Libera os nutrientes de forma lenta e sustentável, além de melhorar drasticamente a estrutura física do solo e reter água.",
        uso: "Excelente para a agricultura familiar, hortas orgânicas, pomares e recuperação de solos degradados. Pode ser usado misturado à terra semanas antes do plantio."
    },
    calcario: {
        nome: "Calcário (Corretivo de Solo)",
        caracteristicas: "Não é exatamente um adubo, mas um corretivo. Fornece Cálcio e Magnésio ao mesmo tempo em que reduz a acidez excessiva do solo (eleva o pH).",
        uso: "Deve ser aplicado na fase de preparação do solo (calagem), geralmente de 2 a 3 meses antes do plantio técnico, espalhado de forma uniforme e misturado ao solo."
    }
};

// Função para exibir os detalhes do adubo clicado
function mostrarDetalhes(idAdubo) {
    const adubo = bancoAdubos[idAdubo];
    
    if (adubo) {
        // Alimenta as tags HTML com as informações do objeto
        document.getElementById('detalhe-nome').innerText = adubo.nome;
        document.getElementById('detalhe-caracteristicas').innerText = adubo.caracteristicas;
        document.getElementById('detalhe-uso').innerText = adubo.uso;
        
        // Remove a classe 'hidden' para fazer o painel aparecer
        const painel = document.getElementById('painel-detalhes');
        painel.classList.remove('hidden');
        
        // Faz a tela rolar suavemente até o painel de informações
        painel.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para fechar o painel de detalhes
function fecharDetalhes() {
    document.getElementById('painel-detalhes').classList.add('hidden');
}