document.addEventListener('DOMContentLoaded', function () {
    const btnEditar = document.querySelector('.btn.editar');
    const btnContinuar = document.querySelector('.btn.continuar');

    // Configura o botão Editar
    btnEditar.addEventListener('click', function () {
        alert('Funcionalidade de edição será implementada em breve!');
    });

    // Configura o botão Continuar
    btnContinuar.addEventListener('click', function () {
        window.location.href = '../exame.agendar/exame.agendar.html';
    });

    // Efeitos visuais para os botões
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