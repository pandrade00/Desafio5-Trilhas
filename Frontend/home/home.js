document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um token (usuário logado)
  const token = localStorage.getItem('token');
  const titulo = document.querySelector('.box-titulo h2');

  if (token) {
    // Se estiver logado, busca o nome do usuário
    fetch('https://desafio5-trilhas-production.up.railway.app/usuario', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          titulo.textContent = `Bem-vindo, ${data.data.nome}`;
          localStorage.setItem('userName', data.data.nome);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados do usuário:", error);
        // Usa o nome salvo localmente se a requisição falhar
        const userName = localStorage.getItem('userName');
        if (userName) {
          titulo.textContent = `Bem-vindo, ${userName}`;
        }
      });
  }

  document.querySelector('.card-sobre').addEventListener('click', (e) => {
    // Evita que o link seja acionado se clicar em algo que não seja a imagem
    if (e.target.tagName === 'IMG') {
      console.log('Usuário clicou no banner do jogo');

      // Opcional: abrir em uma nova janela com configurações específicas
      window.open('https://felipe-bispo.itch.io/diagnstix', '_blank', 'noopener,noreferrer');
    }
  });

  // Seu código existente dos cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      let url;

      if (title.includes('Buscar')) url = '../buscar.ubs/buscar.ubs.html';
      else if (title.includes('Consultas')) url = '../principais.servicos/principais.html';
      else if (title.includes('Dados')) url = '#';

      window.location.href = url;
    });
  });
});