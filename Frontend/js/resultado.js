document.addEventListener('DOMContentLoaded', function() {
    // Simular notificações
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('Você não tem novas notificações.');
        });
    }

    // Função para gerar PDF simulado
    function generateSimulatedPDF(examName, date) {
        return new Promise((resolve) => {
            const pdfBlob = new Blob(
                [`Resultado do Exame: ${examName}\nData da Coleta: ${date}\n\nEste é um PDF simulado para demonstração.`], 
                { type: 'application/pdf' }
            );
            resolve(URL.createObjectURL(pdfBlob));
        });
    }

    // Configurar botões de download
    const downloadButtons = document.querySelectorAll('.btn.disponivel');
    downloadButtons.forEach(button => {
        button.addEventListener('click', async function() {
            button.textContent = 'Preparando...';
            button.style.opacity = '0.7';
            button.disabled = true;

            // Obter informações do exame
            const card = button.closest('.card');
            const examName = card.querySelector('h2').textContent.split('–')[0].trim();
            const date = card.querySelector('.date').textContent.replace('Data da coleta: ', '');

            try {
                // Simular tempo de processamento
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Gerar PDF simulado
                const pdfUrl = await generateSimulatedPDF(examName, date);
                
                // Criar link para download
                const a = document.createElement('a');
                a.href = pdfUrl;
                a.download = `Resultado_${examName.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // Liberar memória
                setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
                
                // Feedback visual
                button.textContent = 'Baixado!';
                setTimeout(() => {
                    button.textContent = 'Baixar PDF';
                    button.style.opacity = '1';
                    button.disabled = false;
                }, 2000);
            } catch (error) {
                console.error('Erro ao gerar PDF:', error);
                button.textContent = 'Erro!';
                setTimeout(() => {
                    button.textContent = 'Baixar PDF';
                    button.style.opacity = '1';
                    button.disabled = false;
                }, 2000);
            }
        });
    });

    // Adicionar efeitos de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(1px)';
            }
        });
    });

    // Adicionar animação de carregamento aos cartões
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.3s ease ${index * 0.3}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});