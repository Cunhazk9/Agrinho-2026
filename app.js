const API_KEY = 'AIzaSyD3jjcmtn2fg_ZqecySpM3kU77AuX6AWWU'; // Coloque sua chave real aqui

async function enviarPergunta() {
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    // Mostrar a pergunta do usuário na tela
    chatBox.innerHTML += `<p><strong>Produtor:</strong> ${pergunta}</p>`;
    inputElement.value = '';

    // 1. CRIAR O ELEMENTO DE CARREGAMENTO (Com ID correto para não dar erro ao remover)
    const carregandoId = "carregando_" + Date.now();
    chatBox.innerHTML += `<p id="${carregandoId}"><em>Buscando informações no Google...</em></p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. URL ATUALIZADA (Usando o modelo estável gemini-1.5-flash)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    // 3. ESTRUTURA CORRETA DO CORPO DA REQUISIÇÃO
    const dados = {
        contents: [{
            parts: [{
                text: `Você é um agrônomo especialista em ajudar produtores rurais. Responda de forma clara, prática e em português sobre: ${pergunta}`
            }]
        }],
        // Ativa a busca integrada do Google para trazer dados reais e atualizados
        tools: [{
            googleSearch: {}
        }]
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dados)
        });

        // Remove a mensagem de carregamento antes de processar
        const elementoCarregando = document.getElementById(carregandoId);
        if (elementoCarregando) elementoCarregando.remove();

        // Se o Google responder com erro (tipo 404 ou 400), cai aqui
        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API do Google: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 4. VERIFICAÇÃO DE SEGURANÇA (Evita o erro de "undefined")
        if (resultado.candidates && resultado.candidates[0]?.content?.parts?.[0]?.text) {
            const textoIA = resultado.candidates[0].content.parts[0].text;
            
            // Exibe na tela a resposta formatada
            chatBox.innerHTML += `<p style="background:#e8f5e9; padding:10px; border-radius:5px; margin: 10px 0;"><strong>Assistente Agro:</strong> ${textoIA}</p>`;
        } else {
            chatBox.innerHTML += `<p style="color:orange;">A IA não conseguiu gerar uma resposta adequada para essa pergunta.</p>`;
        }
        
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (erro) {
        console.error("Erro detalhado:", erro);
        
        // Remove o carregando caso tenha dado erro no meio do caminho
        const elementoCarregando = document.getElementById(carregandoId);
        if (elementoCarregando) elementoCarregando.remove();

        chatBox.innerHTML += `<p style="color:red;">Erro ao consultar a IA. Verifique sua chave API ou a conexão.</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}