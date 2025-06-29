document.addEventListener('DOMContentLoaded', function() {
    const exameSelecionado = localStorage.getItem('exameSelecionado');
    
    const unidades = document.querySelectorAll('.unidade');
    const btnContinuar = document.querySelector('.btn.continuar');
    let unidadeSelecionada = document.querySelector('.unidade.selected');
    
    unidades.forEach(unidade => {
        unidade.addEventListener('click', function() {
            unidades.forEach(u => u.classList.remove('selected'));
            
            this.classList.add('selected');
            unidadeSelecionada = this;
            
            // Efeito visual de seleção
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Configura o botão Continuar
    btnContinuar.addEventListener('click', function() {
        if (!unidadeSelecionada) {
            alert('Por favor, selecione uma unidade antes de continuar');
            return;
        }
        
        // Armazena a unidade selecionada no localStorage
        const nomeUnidade = unidadeSelecionada.querySelector('strong').textContent;
        localStorage.setItem('unidadeSelecionada', nomeUnidade);
        
        window.location.href = '../exame.hora/exame.hora.html';
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