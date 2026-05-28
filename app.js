async function enviarPergunta() {
    const keyInput = document.getElementById('apiKeyInput');
    const inputElement = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    const API_KEY = keyInput.value.trim();
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;
    
    if (!API_KEY) {
        alert("Por favor, cole sua chave API do Gemini na barra lateral esquerda antes de enviar.");
        return;
    }

    // Esconde a tela de boas-vindas no primeiro envio
    if (welcomeScreen) {
        welcomeScreen.remove();
    }

    // 1. Renderiza a pergunta do usuário na tela
    chatContainer.innerHTML += `<div class="msg-user">${pergunta}</div>`;
    inputElement.value = ''; // Limpa campo de texto
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 2. Cria balão de carregamento da IA
    const loadingDiv = document.createElement('div');
    loadingDiv.id = "status-carregando";
    loadingDiv.className = "msg-ai status-loading";
    loadingDiv.innerHTML = `<div class="ai-icon-wrapper"><i class="fa-solid fa-leaf"></i></div> <span>Analisando dados agrícolas...</span>`;
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 3. Define URL do endpoint usando o modelo Gemini 1.5 Flash
    const url = `https://googleapis.com{API_KEY}`;

    // 4. Monta o Prompt de engenheiro agrônomo
    const dados = {
        contents: [{
            parts: [{
                text: `Você é o Agro Tech, uma inteligência artificial especialista em agronegócio e engenharia agronômica. Responda o produtor rural com clareza técnica, formatação amigável, tópicos estruturados e em português de Portugal ou Brasil sobre: ${pergunta}`
            }]
        }]
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        // Remove balão de carregamento
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 5. Trata e renderiza a resposta retornada
        if (resultado?.candidates?.[0]?.content?.parts?.[0]?.text) {
            let textoIA = resultado.candidates[0].content.parts[0].text;
            
            // Converte quebras de linha normais em tags HTML <br> para manter parágrafos
            let textoFormatado = textoIA.replace(/\n/g, '<br>');

            chatContainer.innerHTML += `
                <div class="msg-ai">
                    <div class="ai-icon-wrapper"><i class="fa-solid fa-leaf"></i></div>
                    <div class="ai-response-text">
                        <strong>Agro Tech:</strong><br><br>${textoFormatado}
                    </div>
                </div>
            `;
        } else {
            chatContainer.innerHTML += `<div class="msg-ai" style="color:orange;">O modelo não retornou uma resposta válida estruturada.</div>`;
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        chatContainer.innerHTML += `<div class="msg-ai" style="color:#ff6b6b;"><i class="fa-solid fa-circle-exclamation"></i> Ocorreu um erro. Verifique sua chave API e sua conexão de rede.</div>`;
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Preenche a barra com as sugestões dos cards rápidos
function sugerirPergunta(texto) {
    document.getElementById('userInput').value = texto;
    document.getElementById('userInput').focus();
}

// Reseta o estado do aplicativo limpando o histórico
function limparChat() {
    location.reload();
}
