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
        sustentabilidade: "S