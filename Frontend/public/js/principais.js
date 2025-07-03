document.addEventListener('DOMContentLoaded', function () {

    const accessToken = localStorage.getItem('accessToken');
    const authSection = document.getElementById('auth-section');
    const fazerLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        window.location.href = './login.html';
    };

    if (accessToken) {
        const userName = localStorage.getItem('userName');
        authSection.innerHTML = `
        <span>${userName}</span>
        <button id="logout-btn">Sair</button>
    `;
        document.getElementById('logout-btn').addEventListener('click', fazerLogout);
    } else {
        authSection.innerHTML = '<a href="./login.html">Login</a>';
    }
    // Carregar agendamentos do localStorage
    let agendamentos = [];
    try {
        const agendamentosSalvos = localStorage.getItem('meusAgendamentos');
        agendamentos = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
    } catch (e) {
        console.error('Erro ao ler agendamentos:', e);
    }

    // Atualizar a seção de notificação
    const notificacaoSection = document.querySelector('.notificacao');
    const notificacaoTitulo = notificacaoSection.querySelector('h3');
    const notificacaoTexto = notificacaoSection.querySelector('p');
    const notificacaoBotao = notificacaoSection.querySelector('button');

    if (agendamentos.length > 0) {
        // Ordenar agendamentos por data (mais recente primeiro)
        agendamentos.sort((a, b) => {
            const dataA = a.dataAgendamento ? new Date(a.dataAgendamento) : new Date(0);
            const dataB = b.dataAgendamento ? new Date(b.dataAgendamento) : new Date(0);
            return dataB - dataA;
        });

        // Último agendamento feito
        const ultimoAgendamento = agendamentos[0];

        // Próximo agendamento (futuro mais próximo)
        const hoje = new Date();
        const agendamentosFuturos = agendamentos.filter(ag => {
            const dataAg = new Date(ag.data);
            return dataAg >= hoje;
        }).sort((a, b) => new Date(a.data) - new Date(b.data));

        const proximoAgendamento = agendamentosFuturos[0];

        // Atualizar o conteúdo da notificação
        notificacaoTitulo.textContent = 'Seus Agendamentos';

        let textoNotificacao = '';

        if (ultimoAgendamento) {
            textoNotificacao += `Último: ${ultimoAgendamento.tipo === 'consulta' ? 'Consulta' : 'Exame'} em ${formatarData(ultimoAgendamento.data)}`;
        }

        if (proximoAgendamento) {
            if (textoNotificacao) textoNotificacao += '\n';
            textoNotificacao += `Próximo: ${proximoAgendamento.tipo === 'consulta' ? 'Consulta' : 'Exame'} em ${formatarData(proximoAgendamento.data)}`;
        }

        notificacaoTexto.textContent = textoNotificacao || 'Nenhum agendamento futuro encontrado';

        // Mudar o botão para "Ver Todos"
        notificacaoBotao.textContent = 'Ver Todos';
        notificacaoBotao.addEventListener('click', () => {
            window.location.href = './meus-agendamentos.html';
        });
    } else {
        notificacaoTitulo.textContent = 'Bem-vindo ao Diagnóstix';
        notificacaoTexto.textContent = 'Você ainda não tem agendamentos. Clique em "Agendar Consulta" ou "Agendar Exames" para começar!';
        notificacaoBotao.style.display = 'none';
    }

    // Função para formatar a data
    function formatarData(dataString) {
        if (!dataString) return 'Data não informada';
        if (dataString.match(/\d{2}\/\d{2}\/\d{4}/)) return dataString;

        const data = new Date(dataString);
        if (isNaN(data.getTime())) return 'Data inválida';

        return data.toLocaleDateString('pt-BR');
    }

    // Event listeners para os cards de serviço
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const service = card.querySelector('p').textContent;
            let url;

            switch (service) {
                case 'Agendar Consulta':
                    url = './agendar-conf.html';
                    break;
                case 'Meus Agendamentos':
                    url = './meus-agendamentos.html';
                    break;
                case 'Agendar Exames':
                    url = './exame-conf.html';
                    break;
                case 'Resultados de Exames':
                    url = './resultado.html';
                    break;
                default:
                    url = '#';
            }

            if (url !== '#') {
                window.location.href = url;
            }
        });
    });
});