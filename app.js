const API_KEY = 'AIzaSyD3jjcmtn2fg_ZqecySpM3kU77AuX6AWWU'; // Subsitua pela sua chave do Google AI Studio

async function enviarPergunta() {
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    // 1. Exibe a pergunta do produtor rural na tela
    chatBox.innerHTML += `<p><strong>Produtor:</strong> ${pergunta}</p>`;
    inputElement.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Cria a mensagem de carregamento
    const loadingText = document.createElement('p');
    loadingText.id = "status-carregando";
    loadingText.innerHTML = "<em>Pensando na resposta...</em>";
    chatBox.appendChild(loadingText);

    // 3. URL corrigida com o modelo estável aceito em v1
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    // 4. Estrutura de dados limpa
    const dados = {
        contents: [{
            parts: [{
                text: `Você é um engenheiro agrônomo especialista em ajudar produtores rurais. Responda de forma muito clara, prática e em português sobre: ${pergunta}`
            }]
        }]
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        // Remove o carregando
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 5. Exibe a resposta estruturada do Gemini na tela
        if (resultado && resultado.candidates && resultado.candidates[0].content.parts[0].text) {
            const textoIA = resultado.candidates[0].content.parts[0].text;
            
            chatBox.innerHTML += `<div style="background:#e8f5e9; padding:12px; border-radius:8px; margin: 10px 0; border-left: 4px solid #2e7d32; text-align: left;">
                <strong>Assistente Agro:</strong><br>${textoIA.replace(/\n/g, '<br>')}
            </div>`;
        } else {
            chatBox.innerHTML += `<p style="color:orange;">Não foi possível estruturar a resposta recebida.</p>`;
        }

    } catch (erro) {
        console.error("Erro detalhado:", erro);
        
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        chatBox.innerHTML += `<p style="color:red;">Erro ao consultar a IA. Verifique sua chave API ou a conexão.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}