document.addEventListener('DOMContentLoaded', function() {
    const unidade = localStorage.getItem('unidadeSelecionada');
    const data = localStorage.getItem('dataSelecionada');
    const hora = localStorage.getItem('horaSelecionada');
    
    // Atualiza os dados na página
    if(unidade) {
        document.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Unidade:</strong> ${unidade}`;
    }
    if(data) {
        document.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Data:</strong> ${data.split(' ')[0]}`;
    }
    if(hora) {
        document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Horário:</strong> ${hora}`;
    }

    const btnVoltar = document.querySelector('.btn.voltar');
    btnVoltar.addEventListener('click', function() {
        window.location.href = '../agendar.hora/agendar.hora.html';
    });

    const btnConfirmar = document.querySelector('.btn.confirmar');
    btnConfirmar.addEventListener('click', function() {
        // Cria o modal de confirmação
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; text-align: center;">
                <h2 style="color: #0d47a1; margin-bottom: 20px;">Agendamento de consulta finalizado</h2>
                <p style="font-size: 18px; margin-bottom: 30px;">Para ver seus agendamentos cheque em "Meus Agendamentos" na página principal</p>
                <button id="modal-ok" style="background: #0d47a1; color: white; border: none; padding: 10px 20px; 
                    border-radius: 5px; font-size: 16px; cursor: pointer;">OK</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('modal-ok').addEventListener('click', function() {
            localStorage.removeItem('unidadeSelecionada');
            localStorage.removeItem('dataSelecionada');
            localStorage.removeItem('horaSelecionada');
            
            window.location.href = '../principais.servicos/principais.html';
        });
    });

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