document.addEventListener('DOMContentLoaded', function() {
    // Função para formatar a data no padrão DD/MM/AAAA
    function formatarData(dataString) {
        if (!dataString) return 'Data não informada';
        
        if (dataString.match(/\d{2}\/\d{2}\/\d{4}/)) {
            return dataString;
        }
        
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            return 'Data inválida';
        }
        
        return data.toLocaleDateString('pt-BR');
    }

    // Carregar agendamentos do localStorage
    let agendamentos = [];
    try {
        const agendamentosSalvos = localStorage.getItem('meusAgendamentos');
        agendamentos = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
    } catch (e) {
        console.error('Erro ao ler agendamentos:', e);
    }

    const container = document.querySelector('.corpo');
    
    agendamentos.sort((a, b) => {
        const dataA = a.dataAgendamento ? new Date(a.dataAgendamento) : new Date(0);
        const dataB = b.dataAgendamento ? new Date(b.dataAgendamento) : new Date(0);
        return dataB - dataA;
    });
    
    // Adicionar cada agendamento como um card
    agendamentos.forEach(agendamento => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Determinar classe de status
        let statusClass = 'ausente';
        let statusText = 'Agendada';
        
        if (agendamento.status === 'cancelada') {
            statusClass = 'cancelada';
            statusText = 'Cancelada';
        } else if (agendamento.status === 'realizada') {
            statusClass = 'realizada';
            statusText = 'Concluída';
        }
        
        // Criar conteúdo do card
        card.innerHTML = `
            <div class="date">${formatarData(agendamento.data)}</div>
            <h2>${agendamento.tipo === 'consulta' 
                ? `${agendamento.especialidade || 'Consulta'} - Dr. ${agendamento.medico || 'Médico não especificado'}` 
                : agendamento.nome || 'Exame não especificado'}</h2>
            <p>${agendamento.unidade || 'Unidade não especificada'}</p>
            <p>Horário: ${agendamento.horario || 'Não especificado'}</p>
            <div class="status ${statusClass}">${statusText}</div>
        `;
        
        container.appendChild(card);
    });
    
    // Se não houver agendamentos, mostrar mensagem
    if (agendamentos.length === 0) {
        const mensagem = document.createElement('div');
        mensagem.className = 'card';
        mensagem.innerHTML = '<p>Nenhum agendamento encontrado. Agende sua consulta ou exame para começar!</p>';
        container.appendChild(mensagem);
    }

    // Debug: Mostrar no console o que está no localStorage :0 (headchache)
    console.log('Agendamentos no localStorage:', agendamentos);
});