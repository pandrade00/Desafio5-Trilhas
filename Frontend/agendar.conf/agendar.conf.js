document.addEventListener('DOMContentLoaded', async function () {
    const btnContinuar = document.querySelector('.btn.continuar');
    const btnEditar = document.querySelector('.btn.editar');
    const token = localStorage.getItem('token');
    
    // Verifica se os botões existem
    if (!btnContinuar || !btnEditar) {
        console.error('Botões não encontrados no DOM');
        return;
    }

    // Redireciona se não tiver token
    if (!token) {
        //window.location.href = '../login/login.html';
        return;
    }

    // Função para buscar dados do usuário com tratamento de token expirado
    async function fetchUserData() {
        try {
            console.log('Tentando buscar dados do usuário com token:', token);
            let response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Se token expirou, tenta renovar
            if (response.status === 401) {
                console.log('Token expirado, tentando renovar...');
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (!refreshToken) {
                    throw new Error('Refresh token não encontrado');
                }

                console.log('Enviando refresh token:', refreshToken);
                const refreshResponse = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken })
                });

                console.log('Resposta do refresh:', refreshResponse);
                
                if (refreshResponse.ok) {
                    const tokens = await refreshResponse.json();
                    console.log('Novos tokens recebidos:', tokens);
                    
                    localStorage.setItem('token', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);
                    
                    console.log('Tentando novamente com novo token:', tokens.accessToken);
                    // Tenta novamente com o novo token
                    response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
                        headers: {
                            'Authorization': `Bearer ${tokens.accessToken}`
                        }
                    });
                } else {
                    const errorData = await refreshResponse.json().catch(() => ({}));
                    console.error('Falha ao renovar token:', errorData);
                    throw new Error('Falha ao renovar token: ' + (errorData.message || refreshResponse.statusText));
                }
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Erro na resposta:', errorData);
                throw new Error('Erro ao buscar dados do usuário: ' + (errorData.message || response.statusText));
            }

            const userData = await response.json();
            console.log('Dados do usuário recebidos:', userData);
            return userData;
        } catch (error) {
            console.error("Erro na requisição:", error);
            // Remove tokens inválidos e redireciona
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            //window.location.href = '../login/login.html';
            return null;
        }
    }

    // Preenche os dados do usuário
    async function populateUserData() {
        const userData = await fetchUserData();
        
        if (userData && userData.success) {
            const user = userData.data;
            
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
        } else {
            alert('Erro ao carregar dados do usuário. Por favor, faça login novamente.');
            //window.location.href = '../login/login.html';
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