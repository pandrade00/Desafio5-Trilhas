document.addEventListener('DOMContentLoaded', function() {
    const exame = localStorage.getItem('exameSelecionado');
    const unidade = localStorage.getItem('unidadeSelecionada');
    
    const horariosBtns = document.querySelectorAll('.horarios button');
    const btnContinuar = document.querySelector('.btn.continuar');
    let dataSelecionada = null;
    let horarioSelecionado = null;
    
    // Adiciona eventos aos botões de horário
    horariosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            horariosBtns.forEach(b => b.classList.remove('selecionado'));
            
            this.classList.add('selecionado');
            
            // Armazena a data e horário selecionados
            dataSelecionada = this.closest('.dia-bloco').querySelector('strong').textContent;
            horarioSelecionado = this.textContent;
            
            // Efeito visual
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Configura o botão Continuar
    btnContinuar.addEventListener('click', function() {
        if(!horarioSelecionado || !dataSelecionada) {
            alert('Por favor, selecione um horário antes de continuar');
            return;
        }
        
        // Armazena no localStorage
        localStorage.setItem('dataExameSelecionada', dataSelecionada);
        localStorage.setItem('horarioExameSelecionado', horarioSelecionado);
        
        window.location.href = '../exame.resumo/exame.resumo.html';
    });
    
    // Efeitos visuais do botão
    btnContinuar.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });
    
    btnContinuar.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    btnContinuar.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(1px)';
    });
});