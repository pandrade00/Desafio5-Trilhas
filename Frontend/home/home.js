document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um nome de usuário salvo
  const userName = localStorage.getItem('userName');
  const titulo = document.querySelector('.box-titulo h2');
  
  // Se existir um nome, personaliza a mensagem
  if (userName) {
    titulo.textContent = `Bem-vindo, ${userName}`;
  }

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