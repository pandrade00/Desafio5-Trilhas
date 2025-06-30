document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um token (usuário logado)
  const token = localStorage.getItem('token');
  const titulo = document.querySelector('.box-titulo h2');
  const userName = localStorage.getItem('userName');
  const authSection = document.getElementById('auth-section');

  const fazerLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '../login/login.html';
  };

  // Atualiza a UI com base no estado de login
  const atualizarUI = (logado) => {
    if (logado) {
      // Mostra botão de logout
      authSection.innerHTML = `
        <span style="color:white">${userName}</span>
        <button id="logout-btn">Sair</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', fazerLogout);
      titulo.textContent = `Bem-vindo, ${userName}`;
    } else {
      // Mostra link de login
      authSection.innerHTML = '<a href="../login/login.html">Login</a>';
      titulo.textContent = 'Bem-Vindo ao Diagnóstix';
    }
  };

  // Verifica login
  if (token) {
    if (userName) {
      atualizarUI(true);
    } else {
      // Busca dados do usuário se tiver token mas não o nome
      fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
        headers: { 'Authorization': `Bearer ${token}` }
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

  const loginPopup = document.getElementById('loginPopup');
  const showLoginPopup = () => {
    loginPopup.classList.add('active');
  };

  const hideLoginPopup = () => {
    loginPopup.classList.remove('active');
  };

  // Configura botões do popup
  document.querySelector('.popup-btn-login').addEventListener('click', () => {
    hideLoginPopup();
    window.location.href = '../login/login.html';
  });

  document.querySelector('.popup-btn-cancel').addEventListener('click', hideLoginPopup);

  // Fecha popup ao clicar fora
  loginPopup.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
      hideLoginPopup();
    }
  });

  // Cards - requerem login
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!localStorage.getItem('token')) {
        e.preventDefault();
        showLoginPopup();
        return;
      }

      const title = card.querySelector('h3').textContent;
      let url;
      if (title.includes('Buscar')) url = '../buscar.ubs/buscar.ubs.html';
      else if (title.includes('Consultas')) url = '../principais.servicos/principais.html';
      else if (title.includes('Dados')) url = '../dashboard/dados-saude.html';

      if (url) {
        window.location.href = url;
      }
    });
  });
});