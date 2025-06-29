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