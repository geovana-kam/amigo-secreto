let amigos = [];

function adicionarAmigo() {
    const nomeInput = document.getElementById('nomeAmigo');
    const nome = nomeInput.value.trim();
    
    if (nome === '') {
        animateShake(nomeInput);
        return;
    }
    
    if (amigos.includes(nome)) {
        animateShake(nomeInput);
        alert('Este amigo já foi adicionado!');
        return;
    }
    
    amigos.push(nome);
    nomeInput.value = '';
    
    atualizarListaAmigos();
    criarConfete(5);
}

function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${amigo}
            <button class="remove-btn" onclick="removerAmigo(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarListaAmigos();
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    
    if (amigos.length < 2) {
        resultado.textContent = '⚠️ Adicione pelo menos 2 amigos para sortear!';
        resultado.style.color = '#e74c3c';
        resultado.style.opacity = '1';
        animateShake(document.querySelector('.sortear'));
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceSorteado];
    
    resultado.innerHTML = `
        <h3 style="font-size: 24px; color: #2ecc71; font-weight: bold;">
            🎉 Amigo Sorteado: ${amigoSorteado} 🎉
        </h3>
    `;
    
    resultado.style.opacity = '1';
    criarConfete(50);
}
function animateShake(element) {
    element.classList.add('shake');
    element.style.animation = 'shake 0.5s';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function criarConfete(quantidade) {
    const cores = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    
    document.querySelectorAll('.confetti').forEach(c => c.remove());

    for (let i = 0; i < Math.min(quantidade, 20); i++) {
        const confete = document.createElement('div');
        confete.classList.add('confetti');
        
        const tamanho = Math.random() * 10 + 5;
        const cor = cores[Math.floor(Math.random() * cores.length)];
        const posicaoX = Math.random() * 100;
        const duracao = Math.random() * 3 + 2;
        
        confete.style.width = `${tamanho}px`;
        confete.style.height = `${tamanho}px`;
        confete.style.backgroundColor = cor;
        confete.style.left = `${posicaoX}%`;
        confete.style.animationDuration = `${duracao}s`;
        
        document.body.appendChild(confete);
        
        setTimeout(() => {
            confete.remove();
        }, (duracao * 1000));
    }
}

document.getElementById('nomeAmigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    criarConfete(10);
});
