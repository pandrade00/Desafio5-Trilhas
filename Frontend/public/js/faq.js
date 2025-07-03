document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um token (usuário logado)
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName');
  const authSection = document.getElementById('auth-section');

  const fazerLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    window.location.href = './login.html';
  };

  // Atualiza a UI com base no estado de login
  const atualizarUI = (logado) => {
    if (logado) {
      authSection.innerHTML = `
        <span style="color:white">${userName}</span>
        <button id="logout-btn">Sair</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', fazerLogout);
    } else {
      authSection.innerHTML = '<a href="./login.html">Login</a>';
    }
  };

  // Verifica login
  if (accessToken) {
    if (userName) {
      atualizarUI(true);
    } else {
      // Busca dados do usuário se tiver token mas não o nome
      fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
        .then(response => {
          if (!response.ok) throw new Error(`Erro ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (data.success) {
            localStorage.setItem('userName', data.data.nome);
            atualizarUI(true);
          }
        })
        .catch(error => {
          console.error("Erro ao buscar dados:", error);
          fazerLogout();
        });
    }
  } else {
    atualizarUI(false);
  }
});