document.addEventListener('DOMContentLoaded', function () {
    const unitOptions = document.querySelectorAll('.unit-option');
    const btnContinuar = document.querySelector('.btn.continuar');
    let selectedUnit = null;

    // Mapeamento das unidades com seus detalhes completos
    const unidades = {
        "Hospital de Urgência e Emergência Dr. Clementino Moura - Socorrão II": {
            nome: "Hospital de Urgência e Emergência Dr. Clementino Moura - Socorrão II",
            endereco: "R. Santa Helena, 3685 - Cidade Operária, São Luís - MA, 65058-442",
            especialidade: "Clínico Geral"
        },
        "Clinica La Ravardiere LTDA": {
            nome: "Clinica La Ravardiere LTDA",
            endereco: "Alameda Mearim, 1 - Olho D'agua, São Luís - MA, 65065-470",
            especialidade: "Clínico Geral"
        }
    };

    unitOptions.forEach(option => {
        option.addEventListener('click', function () {
            unitOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedUnit = this;

            // Efeito visual
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

        // Salva todos os dados da unidade no localStorage
        const nomeUnidade = selectedUnit.querySelector('h2').textContent;
        const unidadeData = unidades[nomeUnidade];
        
        localStorage.setItem('unidadeSelecionada', JSON.stringify(unidadeData));
        window.location.href = './agendar-hora.html';
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