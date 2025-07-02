document.addEventListener('DOMContentLoaded', async function () {
    const btnContinuar = document.querySelector('.btn.continuar');
    const btnEditar = document.querySelector('.btn.editar');
    const accessToken = localStorage.getItem('accessToken');

    // Verifica se os botões existem
    if (!btnContinuar || !btnEditar) {
        console.error('Botões não encontrados no DOM');
        return;
    }

    // Redireciona se não tiver token
    if (!accessToken) {
        window.location.href = '../login/login.html';
        return;
    }

    async function fetchUserData() {
        if (!isTokenValid(accessToken)) {
            await refreshToken();
        }

        const user = await userData();
        return user;
    }

    // Preenche os dados do usuário
    async function populateUserData() {
        try {
            const user = await fetchUserData();

            // Formatação dos dados
            const dob = new Date(user.dataNascimento);
            const formattedDob = `${dob.getDate().toString().padStart(2, '0')}/${(dob.getMonth() + 1).toString().padStart(2, '0')}/${dob.getFullYear()}`;
            const phone = user.telefones?.[0] || 'Não informado';

            // Atualiza o DOM
            document.getElementById('user-name').textContent = user.nome;
            document.getElementById('user-dob').textContent = formattedDob;
            document.getElementById('user-cpf').textContent = user.cpf || 'Não informado';
            document.getElementById('user-phone').textContent = phone;
            document.getElementById('user-email').textContent = user.email;
        } catch (err) {
            console.error(err);
            alert("Por favor, faça login novamente.");
            window.location.href = '../login/login.html';
        }
    }

    // Event listeners
    btnContinuar.addEventListener('click', () => {
        window.location.href = '../exame.agendar/exame.agendar.html';
    });

    btnEditar.addEventListener('click', () => {
        window.location.href = '../editar-perfil/editar-perfil.html';
    });

    async function userData() {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
            headers: {
                'Authorization': accessToken
            }
        });

        const responseJson = await response.json();

        if (!response.ok || !responseJson.success) {
            const error = responseJson.error || 'Erro desconhecido';
            throw new Error(error);
        }

        return responseJson.data;
    }

    async function refreshToken() {
        let refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken || !isTokenValid(refreshToken)) {
            throw new Error('Refresh token não encontrado ou expirado, faça login novamente.');
            window.location.href = '../login/login.html';
        }

        const refreshResponse = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (refreshResponse.ok) {
            const response = await refreshResponse.json();

            const accessToken = response.accessToken;
            refreshToken = response.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            const errorData = await refreshResponse.json().catch(() => ({}));
            console.error('Falha ao renovar token:', errorData);
            throw new Error('Falha ao renovar token: ' + (errorData.message || refreshResponse.statusText));
        }
    }

    function isTokenValid(token) {
        try {
            const decoded = jwt_decode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (err) {
            return false;
        }
    }

    // Efeitos visuais para os botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });

        button.addEventListener('mouseout', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        button.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(1px)';
        });
    });

    // Inicialização
    await populateUserData();
});