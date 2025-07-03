// dados-saude.js
function resizeIframes() {
    const iframes = document.querySelectorAll('.dashboard-iframe iframe');
    iframes.forEach(iframe => {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
    });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    // Mostra a primeira iframe por padrão
    document.getElementById('coberturaIframe').classList.add('active');

    // Redimensiona os iframes
    resizeIframes();

    // Configura os eventos dos cards
    const options = document.querySelectorAll('.dashboard-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove a classe active de todas as iframes
            document.querySelectorAll('.dashboard-iframe').forEach(iframe => {
                iframe.classList.remove('active');
            });

            // Adiciona a classe active na iframe selecionada
            const dashboard = option.getAttribute('data-dashboard');
            const targetIframe = document.getElementById(`${dashboard}Iframe`);
            targetIframe.classList.add('active');

            // Força um redimensionamento
            setTimeout(() => {
                const iframe = targetIframe.querySelector('iframe');
                iframe.style.height = targetIframe.offsetHeight + 'px';
            }, 100);

            // Rolagem suave
            targetIframe.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Verificação de login
    const accessToken = localStorage.getItem('accessToken');
    const authSection = document.getElementById('auth-section');
    const fazerLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        window.location.href = './login.html';
    };

    if (accessToken) {
        const userName = localStorage.getItem('userName');
        authSection.innerHTML = `
        <span>${userName}</span>
        <button id="logout-btn">Sair</button>
    `;
        document.getElementById('logout-btn').addEventListener('click', fazerLogout);
    } else {
        authSection.innerHTML = '<a href="./login.html">Login</a>';
    }
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.dashboard-iframe.active iframe').forEach(iframe => {
        iframe.style.height = iframe.parentElement.offsetHeight + 'px';
    });
});