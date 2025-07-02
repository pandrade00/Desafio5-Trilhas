document.addEventListener('DOMContentLoaded', function () {
    // Recupera os dados do localStorage
    const unidadeData = JSON.parse(localStorage.getItem('unidadeSelecionada'));
    const data = localStorage.getItem('dataSelecionada');
    const hora = localStorage.getItem('horaSelecionada');

    // Atualiza os dados na página
    if (unidadeData) {
        document.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Especialidade:</strong> ${unidadeData.especialidade}`;
        document.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Unidade:</strong> ${unidadeData.nome}`;
        document.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Endereço:</strong> ${unidadeData.endereco}`;
    }

    if (data) {
        document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Data:</strong> ${data.split(' ')[0]}`;
    }
    if (hora) {
        document.querySelector('p:nth-of-type(5)').innerHTML = `<strong>Horário:</strong> ${hora}`;
    }

    const btnVoltar = document.querySelector('.btn.voltar');
    btnVoltar.addEventListener('click', function () {
        window.location.href = '../public/agendar-hora.html';
    });

    const btnConfirmar = document.querySelector('.btn.confirmar');
    btnConfirmar.addEventListener('click', function () {
        // Modal de confirmação
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';

        modal.innerHTML = `
            <div class="modal-content">
                <h2>Agendamento de consulta finalizado</h2>
                <p>Para ver seus agendamentos cheque em "Meus Agendamentos" na página principal ou cheque o seu telefone ou email!</p>
                <button id="modal-ok">OK</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('modal-ok').addEventListener('click', function () {
            // Salvar o agendamento no localStorage
            const agendamentos = JSON.parse(localStorage.getItem('meusAgendamentos')) || [];
            const unidadeData = JSON.parse(localStorage.getItem('unidadeSelecionada'));

            agendamentos.push({
                tipo: 'consulta',
                especialidade: unidadeData.especialidade,
                unidade: unidadeData.nome,
                data: localStorage.getItem('dataSelecionada').split(' ')[0],
                horario: localStorage.getItem('horaSelecionada'),
                status: 'agendado',
                dataAgendamento: new Date().toLocaleDateString()
            });

            localStorage.setItem('meusAgendamentos', JSON.stringify(agendamentos));

            // Limpar os dados temporários
            localStorage.removeItem('unidadeSelecionada');
            localStorage.removeItem('dataSelecionada');
            localStorage.removeItem('horaSelecionada');

            window.location.href = '../public/principais.html';
        });
    });


    // Efeitos visuais dos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });

        button.addEventListener('mouseout', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        button.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(1px)';
        });
    });
});