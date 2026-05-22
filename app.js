const API_KEY = 'AIzaSyCPLPWj6vzWxORq-az-ys-6REjtYmudeIM'; // <--- Cole a nova chave gerada aqui!

async function enviarPergunta() {
    const inputElement = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const pergunta = inputElement.value.trim();

    if (!pergunta) return;

    // 1. Mostra a pergunta na tela
    chatBox.innerHTML += `<p><strong>Produtor:</strong> ${pergunta}</p>`;
    inputElement.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Status de Carregamento
    const loadingText = document.createElement('p');
    loadingText.id = "status-carregando";
    loadingText.innerHTML = "<em>Buscando resposta técnica...</em>";
    chatBox.appendChild(loadingText);

    // 3. URL na rota estável v1beta (Ideal para requisições diretas de chaves gratuitas)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // 4. Estrutura de dados recomendada pelo Google
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

        // Remove carregando
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro na API do Google: ${resposta.status} - ${erroTexto}`);
        }

        const resultado = await resposta.json();

        // 5. Exibe a resposta estruturada na tela
        if (resultado && resultado.candidates && resultado.candidates[0].content.parts[0].text) {
            const textoIA = resultado.candidates[0].content.parts[0].text;
            
            chatBox.innerHTML += `<div style="background:#e8f5e9; padding:12px; border-radius:8px; margin: 10px 0; border-left: 4px solid #2e7d32; text-align: left;">
                <strong>Assistente Agro:</strong><br>${textoIA.replace(/\n/g, '<br>')}
            </div>`;
        } else {
            chatBox.innerHTML += `<p style="color:orange;">O modelo não retornou um formato de texto válido.</p>`;
        }

    } catch (erro) {
        console.error("Erro capturado:", erro);
        
        const elementoLoading = document.getElementById("status-carregando");
        if (elementoLoading) elementoLoading.remove();

        chatBox.innerHTML += `<p style="color:red;">Erro ao consultar a IA. Verifique sua chave API ou se o projeto no AI Studio está ativo.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}