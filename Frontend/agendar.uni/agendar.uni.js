document.addEventListener('DOMContentLoaded', function () {
    const unitOptions = document.querySelectorAll('.unit-option');
    const btnContinuar = document.querySelector('.btn.continuar');
    let selectedUnit = null;

    unitOptions.forEach(option => {
        option.addEventListener('click', function () {
            unitOptions.forEach(opt => opt.classList.remove('selected'));

            this.classList.add('selected');
            selectedUnit = this;

            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    btnContinuar.addEventListener('click', function () {
        if (!selectedUnit && document.querySelector('.unit-option.selected')) {
            selectedUnit = document.querySelector('.unit-option.selected');
        }

        if (!selectedUnit) {
            alert('Por favor, selecione uma unidade antes de continuar');
            return;
        }
        localStorage.setItem('unidadeSelecionada', selectedUnit.querySelector('h2').textContent);
        window.location.href = '../agendar.hora/agendar.hora.html';
    });

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