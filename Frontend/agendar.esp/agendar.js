document.addEventListener('DOMContentLoaded', function () {
    const inputEspecialidade = document.getElementById('especialidade');
    const btnContinuar = document.querySelector('.btn.continuar');
    const lupaBtn = document.querySelector('.search-box button');

    inputEspecialidade.placeholder = "Clínico Geral";
    inputEspecialidade.addEventListener('focus', function () {
        if (this.value === "") {
            this.value = "Clínico Geral";
        }
    });

    inputEspecialidade.addEventListener('blur', function () {
        if (this.value.trim() === "") {
            this.value = "Clínico Geral";
        }
    });

    lupaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        inputEspecialidade.value = "Clínico Geral";
    });

    btnContinuar.addEventListener('click', function () {
        if (inputEspecialidade.value.trim().toLowerCase() !== "clínico geral") {
            alert("No momento, só temos disponível a especialidade de Clínico Geral");
            inputEspecialidade.value = "Clínico Geral";
            return;
        }

        window.location.href = "../agendar.uni/agendar.uni.html";
    });

    const btnEffects = function () {
        btnContinuar.addEventListener('mouseover', function () {
            this.style.transform = "translateY(-2px)";
            this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        });

        btnContinuar.addEventListener('mouseout', function () {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "none";
        });

        btnContinuar.addEventListener('mousedown', function () {
            this.style.transform = "translateY(1px)";
        });
    };
    btnEffects();
});