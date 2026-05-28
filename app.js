async function enviarPergunta() {
    const keyInput = document.getElementById('apiKeyInput');
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    
    const API_KEY = keyInput.value.trim();
    const pergunta = inputElement.value.trim();

    // Validações obrigatórias antes de rodar
    if (!pergunta) return;
    
    if (!API_KEY) {
        chatBox.innerHTML += `<div class="mensagem-sistema" style="color:red; background:#ffebee;">Erro: Insira sua chave API do Gemini no topo da tela.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        return;
    }

    // 1. Adiciona a pergunta do produtor formatada na tela
    chatBox.innerHTML += `<div class="balao-produtor"><strong>Produtor:</strong><br>${pergunta}</div>`;
    inputElement.value = ''; // Limpa o campo de texto
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Cria o indicador visual de carregamento
    const loadingText = document.createElement('div');
    loadingText.id = "status-carregando";
    loadingText.className = "status-carregando";
    loadingText.innerHTML = "<em>Buscando resposta técnica...</em>";
    chatBox.appendChild(loadingText);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Define a URL usando o modelo gemini-1.5-flash
    const url = `https://googleapis.com{API_KEY}`;

    // 4. Estrutura de dados corrigida para a API oficial do Gemini
    const dados = {
        contents: [{
            parts: [{
                text: `Você é um engenheiro agrônomo especialista em ajudar produtores rurais. Responda de forma clara, prática, direta e em português sobre: ${pergunta}`
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

        // Remove o indicador de carregamento
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 5. Captura do nó correto da resposta JSON (Corrigido estruturalmente)
        if (resultado?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const textoIA = resultado.candidates[0].content.parts[0].text;
            
            // Renderiza a resposta convertendo quebras de linha em tags HTML <br>
            chatBox.innerHTML += `<div class="balao-assistente">
                <strong>Assistente Agro:</strong><br>${textoIA.replace(/\n/g, '<br>')}
            </div>`;
        } else {
            chatBox.innerHTML += `<div class="mensagem-sistema" style="color:orange;">Não foi possível interpretar a estrutura do retorno da IA.</div>`;
        }

    } catch (erro) {
        console.error("Erro detalhado na requisição:", erro);
        
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        chatBox.innerHTML += `<div class="mensagem-sistema" style="color:red; background:#ffebee;">Erro ao consultar a IA. Verifique se sua chave API é válida e se possui permissões.</div>`;
    }

    // Rola o chat para o fim da tela
    chatBox.scrollTop = chatBox.scrollHeight;
}
