document.addEventListener('DOMContentLoaded', function () {
    const unidadeSelecionada = localStorage.getItem('unidadeSelecionada');

    if (unidadeSelecionada) {
        console.log('Unidade selecionada:', unidadeSelecionada);
    }

    // Seleção de horários
    const timeButtons = document.querySelectorAll('.schedule-times button');
    const btnContinuar = document.querySelector('.btn.continuar');
    let selectedDate = null;
    let selectedTime = null;

    // Adiciona eventos aos botões de horário
    timeButtons.forEach(button => {
        button.addEventListener('click', function () {
            timeButtons.forEach(btn => {
                btn.style.backgroundColor = '#fff';
                btn.style.color = '#0d47a1';
            });

            this.style.backgroundColor = '#0d47a1';
            this.style.color = '#fff';

            // Armazena a data e hora selecionadas
            selectedDate = this.closest('.schedule-group').querySelector('.schedule-date').textContent;
            selectedTime = this.textContent;
        });
    });

    btnContinuar.addEventListener('click', function () {
        if (!selectedTime || !selectedDate) {
            alert('Por favor, selecione um horário antes de continuar');
            return;
        }

        // Armazena no localStorage
        localStorage.setItem('dataSelecionada', selectedDate);
        localStorage.setItem('horaSelecionada', selectedTime);

        window.location.href = '../agendar.resumo/agendar.resumo.html';
    });

    // Efeitos visuais do botão
    btnContinuar.addEventListener('mouseover', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });

    btnContinuar.addEventListener('mouseout', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });

    btnContinuar.addEventListener('mousedown', function () {
        this.style.transform = 'translateY(1px)';
    });
});