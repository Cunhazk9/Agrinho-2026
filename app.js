const API_KEY = 'AIzaSyAiabDwOSb1ewNchApzsLxNZik2iib20P4'; // Insira a sua chave gerada no Google AI Studio

async function enviarPergunta() {
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    // 1. Mostra a pergunta no chat
    chatBox.innerHTML += `<p><strong>Produtor:</strong> ${pergunta}</p>`;
    inputElement.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Texto informativo de processamento
    const loadingText = document.createElement('p');
    loadingText.id = "status-carregando";
    loadingText.innerHTML = "<em>Buscando resposta técnica...</em>";
    chatBox.appendChild(loadingText);

    // 3. Endpoint alternativo de alta compatibilidade para requisições Front-end
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${API_KEY}`;

    // 4. Estrutura limpa de dados requerida pela API
    const dados = {
        contents: [{
            parts: [{
                text: `Você é um engenheiro agrônomo especialista em ajudar produtores rurais. Responda de forma clara, prática e em português sobre: ${pergunta}`
            }]
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

        // Limpa o indicador de carregamento
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 5. Exibe a resposta final na tela
        if (resultado && resultado.candidates && resultado.candidates[0].content.parts[0].text) {
            const textoIA = resultado.candidates[0].content.parts[0].text;
            
            chatBox.innerHTML += `<div style="background:#e8f5e9; padding:12px; border-radius:8px; margin: 10px 0; border-left: 4px solid #2e7d32; text-align: left;">
                <strong>Assistente Agro:</strong><br>${textoIA.replace(/\n/g, '<br>')}
            </div>`;
        } else {
            chatBox.innerHTML += `<p style="color:orange;">Não foi possível interpretar a estrutura do retorno da IA.</p>`;
        }

    } catch (erro) {
        console.error("Erro detalhado:", erro);
        
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        chatBox.innerHTML += `<p style="color:red;">Erro ao consultar a IA. Garanta que inseriu uma chave API válida.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
