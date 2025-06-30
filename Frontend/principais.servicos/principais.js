document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const service = card.querySelector('p').textContent;
        let url;

        switch(service) {
            case 'Agendar Consulta':
                url = '../agendar.conf/agendar.conf.html';
                break;
            case 'Meus Agendamentos':
                url = '../meus.agendamentos/meus.agendamentos.html';
                break;
            case 'Agendar Exames':
                url = '../exame.conf/exame.conf.html';
                break;
            case 'Resultados de Exames':
                url = '../resultado.de.exames/resultado.html';
                break;
            default:
                url = '#'; // Fallback
        }

        if(url !== '#') {
            window.location.href = url;
        }
    });
});