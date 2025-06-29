document.addEventListener('DOMContentLoaded', function () {
    const btnContinuar = document.querySelector('.btn.continuar');

    btnContinuar.addEventListener('click', function () {
        window.location.href = '../agendar.esp/agendar.esp.html';
    });

    //Adiciona evento para o botão "Editar" se necessário
    const btnEditar = document.querySelector('.btn.editar');
    btnEditar.addEventListener('click', function () {
        // Só para aviso!
        alert('Funcionalidade de edição será implementada em breve!');
    });
});