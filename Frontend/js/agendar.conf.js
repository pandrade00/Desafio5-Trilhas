import { isTokenValid, userData, refreshToken } from "../req-api/index.js";

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

    // Inicialização
    await populateUserData();
});