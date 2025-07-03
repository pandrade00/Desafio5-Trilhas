document.addEventListener('DOMContentLoaded', function () {
    const exameSelecionado = localStorage.getItem('exameSelecionado');

    // Mapeamento das unidades com seus detalhes completos
    const unidades = {
        "Hospital de Urgência e Emergência Dr. Clementino Moura - Socorrão II": {
            nome: "Hospital de Urgência e Emergência Dr. Clementino Moura - Socorrão II",
            endereco: "R. Santa Helena, 3685 - Cidade Operária, São Luís - MA, 65058-442"
        },
        "Clinica La Ravardiere LTDA": {
            nome: "Clinica La Ravardiere LTDA",
            endereco: "Alameda Mearim, 1 - Olho D'agua, São Luís - MA, 65065-470"
        }
    };

    const unidadesElements = document.querySelectorAll('.unidade');
    const btnContinuar = document.querySelector('.btn.continuar');
    let unidadeSelecionada = document.querySelector('.unidade.selected');

    unidadesElements.forEach(unidade => {
        unidade.addEventListener('click', function () {
            unidadesElements.forEach(u => u.classList.remove('selected'));

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
    btnContinuar.addEventListener('click', function () {
        if (!unidadeSelecionada) {
            alert('Por favor, selecione uma unidade antes de continuar');
            return;
        }

        const nomeUnidade = unidadeSelecionada.querySelector('strong').textContent;
        const unidadeData = unidades[nomeUnidade];
        localStorage.setItem('unidadeSelecionada', JSON.stringify(unidadeData));

        window.location.href = './exame-hora.html';
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
});