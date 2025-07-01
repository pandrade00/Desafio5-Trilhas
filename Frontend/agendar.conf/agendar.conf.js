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
        //window.location.href = '../login/login.html';
        return;
    }

    // Função para buscar dados do usuário com tratamento de token expirado
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
            const cardElements = document.querySelectorAll('.card p');
            if (cardElements.length >= 5) {
                cardElements[0].innerHTML = `<strong>Nome Completo:</strong> ${user.nome}`;
                cardElements[1].innerHTML = `<strong>Data de Nascimento:</strong> ${formattedDob}`;
                cardElements[2].innerHTML = `<strong>CPF:</strong> ${user.cpf || 'Não informado'}`;
                cardElements[3].innerHTML = `<strong>Contato:</strong> ${phone}`;
                cardElements[4].innerHTML = `<strong>Email:</strong> ${user.email}`;
            }
        } catch (err) {
            console.error(err);
            alert("Por favor, faça login novamente.");
        }
    }

    // Event listeners
    btnContinuar.addEventListener('click', () => {
        window.location.href = '../agendar.esp/agendar.esp.html';
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
            //window.location.href = '../login/login.html';
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
            const decoded = jwt_decode(token); // pega o payload do token
            const currentTime = Math.floor(Date.now() / 1000); // tempo atual em segundos
            return decoded.exp > currentTime; // compara com o tempo de expiração
        } catch (err) {
            // se o token estiver malformado ou inválido
            return false;
        }
    }

    // Inicialização
    await populateUserData();
});