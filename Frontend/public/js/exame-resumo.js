document.addEventListener('DOMContentLoaded', function () {
    const exame = localStorage.getItem('exameSelecionado');
    const unidadeData = JSON.parse(localStorage.getItem('unidadeSelecionada'));
    const data = localStorage.getItem('dataExameSelecionada');
    const horario = localStorage.getItem('horarioExameSelecionado');

    // Seleciona todos os parágrafos de informação
    const infoParagrafos = document.querySelectorAll('.info p');

    // Atualiza os dados na página
    if (exame) {
        infoParagrafos[0].innerHTML = `<strong>Exame:</strong> ${exame}`;
    }
    if (unidadeData) {
        infoParagrafos[1].innerHTML = `<strong>Unidade:</strong> ${unidadeData.nome}`;
        infoParagrafos[2].innerHTML = `<strong>Endereço:</strong> ${unidadeData.endereco}`;
    }
    if (data) {
        infoParagrafos[3].innerHTML = `<strong>Data:</strong> ${data}`;
    }
    if (horario) {
        infoParagrafos[4].innerHTML = `<strong>Horário:</strong> ${horario}`;
    }

    // Configurar botão Voltar
    const btnVoltar = document.querySelector('.btn.voltar');
    btnVoltar.addEventListener('click', function () {
        window.location.href = '../public/exame-hora.html';
    });

    // Configurar botão Confirmar
    const btnConfirmar = document.querySelector('.btn.confirmar');
    btnConfirmar.addEventListener('click', function () {
        // Criar modal de confirmação
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h2>Agendamento de exame finalizado</h2>
                <p>Para ver seus agendamentos cheque em "Meus Agendamentos" na página principal ou cheque o seu telefone ou email!</p>
                <button id="modal-ok">OK</button>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        document.getElementById('modal-ok').addEventListener('click', function () {
            const agendamentos = JSON.parse(localStorage.getItem('meusAgendamentos')) || [];

            agendamentos.push({
                tipo: 'exame',
                nome: localStorage.getItem('exameSelecionado'),
                unidade: JSON.parse(localStorage.getItem('unidadeSelecionada')).nome,
                data: localStorage.getItem('dataExameSelecionada'),
                horario: localStorage.getItem('horarioExameSelecionado'),
                status: 'agendado',
                dataAgendamento: new Date().toLocaleDateString()
            });

            localStorage.setItem('meusAgendamentos', JSON.stringify(agendamentos));

            // Limpar os dados temporários
            localStorage.removeItem('exameSelecionado');
            localStorage.removeItem('unidadeSelecionada');
            localStorage.removeItem('dataExameSelecionada');
            localStorage.removeItem('horarioExameSelecionado');

            window.location.href = '../public/principais.html';
        });
    });

    // Efeitos de hover nos botões
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