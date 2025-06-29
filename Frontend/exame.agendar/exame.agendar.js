document.addEventListener('DOMContentLoaded', function () {
    const inputExame = document.getElementById('exame');
    const lupaBtn = document.querySelector('.input-wrapper img');
    const btnContinuar = document.querySelector('.btn.continuar');

    inputExame.placeholder = "Eletrocardiograma (ECG)";
    inputExame.addEventListener('focus', function () {
        if (this.value === "") {
            this.value = "Eletrocardiograma (ECG)";
        }
    });

    lupaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        inputExame.value = "Eletrocardiograma (ECG)";
    });

    // Validação e redirecionamento
    btnContinuar.addEventListener('click', function () {
        if (inputExame.value.trim().toLowerCase() !== "eletrocardiograma (ecg)") {
            alert("No momento, só temos disponível o exame de Eletrocardiograma (ECG)");
            inputExame.value = "Eletrocardiograma (ECG)";
            return;
        }

        localStorage.setItem('exameSelecionado', inputExame.value);

        window.location.href = '../exame.und/exame.und.html';
    });

    // Efeitos visuais do botão
    btnContinuar.addEventListener('mouseover', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });

    btnContinuar.addEventListener('mouseout', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });

    btnContinuar.addEventListener('mousedown', function () {
        this.style.transform = 'translateY(1px)';
    });

    // Estilo para o campo de input
    inputExame.style.cursor = 'pointer';
    inputExame.addEventListener('focus', function () {
        this.style.backgroundColor = '#fff';
    });

    inputExame.addEventListener('blur', function () {
        this.style.backgroundColor = 'transparent';
    });
});