document.addEventListener('DOMContentLoaded', function() {
    const exame = localStorage.getItem('exameSelecionado');
    const unidade = localStorage.getItem('unidadeSelecionada');
    const data = localStorage.getItem('dataExameSelecionada');
    const horario = localStorage.getItem('horarioExameSelecionado');
    
    // Atualizar os dados na página
    if(exame) {
        document.querySelector('.info p:nth-of-type(1)').innerHTML = `<strong>Exame:</strong> ${exame}`;
    }
    if(unidade) {
        document.querySelector('.info p:nth-of-type(2)').innerHTML = `<strong>Unidade:</strong> ${unidade}`;
    }
    if(data) {
        document.querySelector('.info p:nth-of-type(3)').innerHTML = `<strong>Data:</strong> ${data}`;
    }
    if(horario) {
        document.querySelector('.info p:nth-of-type(4)').innerHTML = `<strong>Horário:</strong> ${horario}`;
    }

    // Configurar botão Voltar
    const btnVoltar = document.querySelector('.btn.voltar');
    btnVoltar.addEventListener('click', function() {
        window.location.href = '../exame.hora/exame.hora.html';
    });

    // Configurar botão Confirmar
    const btnConfirmar = document.querySelector('.btn.confirmar');
    btnConfirmar.addEventListener('click', function() {
        // Criar modal de confirmação
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h2>Agendamento de exame finalizado</h2>
                <p>Para ver seus agendamentos cheque em "Meus Agendamentos" na página principal</p>
                <button id="modal-ok">OK</button>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        document.getElementById('modal-ok').addEventListener('click', function() {
            localStorage.removeItem('exameSelecionado');
            localStorage.removeItem('unidadeSelecionada');
            localStorage.removeItem('dataExameSelecionada');
            localStorage.removeItem('horarioExameSelecionado');
            
            window.location.href = '../principais.servicos/principais.html';
        });
    });

    // Efeitos de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
    });
});