const API_KEY = 'AIzaSyD3jjcmtn2fg_ZqecySpM3kU77AuX6AWWU'; 

async function enviarPergunta() {
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    // Mostrar a pergunta do usuário na tela
    chatBox.innerHTML += `<p><strong>Produtor:</strong> ${pergunta}</p>`;
    inputElement.value = '';

    // URL da API oficial do Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // Configurando o pedido para a IA agir como especialista e buscar no Google
    const dados = {
        contents: [{
            parts: [{
                text: `Você é um agrônomo especialista em ajudar produtores rurais. Use a busca do Google para trazer respostas precisas, práticas e atualizadas em português sobre: ${pergunta}`
            }]
        }],
        // Ativa a ferramenta de busca do Google (Google Search Grounding)
        tools: [{ googleSearch: {} }] 
    };

    try {
        chatBox.innerHTML += `<p id="carregando"><em>Buscando informações no Google...</em></p>`;
        
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();
        document.getElementById('carregando').remove();

        // Extrai o texto da IA
        const textoIA = resultado.candidates[0].content.parts[0].text;
        
        // Exibe na tela
        chatBox.innerHTML += `<p style="background:#e8f5e9; padding:10px; border-radius:5px;"><strong>Assistente Agro:</strong> ${textoIA}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (erro) {
        console.error(erro);
        document.getElementById('carregando').remove();
        chatBox.innerHTML += `<p style="color:red;">Erro ao consultar a IA. Tente novamente.</p>`;
    }
}