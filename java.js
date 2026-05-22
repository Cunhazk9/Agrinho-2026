// Seleciona os elementos da página
const botao = document.getElementById('botaoInterativo');
const mensagem = document.getElementById('mensagem');

// Adiciona o evento de clique ao botão
botao.addEventListener('click', () => {
    // Altera a classe para mostrar o texto oculto
    if (mensagem.classList.contains('escondido')) {
        mensagem.className = 'mostrado';
        botao.textContent = 'Fechar';
    } else {
        mensagem.className = 'escondido';
        botao.textContent = 'Clique Aqui';
    }
});
