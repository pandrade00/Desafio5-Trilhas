import { isTokenValid } from "./index.js";

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

export default refreshToken;