document.addEventListener('DOMContentLoaded', function () {
    // Dados simulados de UBS
    const ubsList = [
        {
            name: "Hospital de Urgência e Emergência Dr. Clementino Moura - Socorrão II",
            address: "R. Santa Helena, 3685 – Cidade Operária, São Luís - MA, 65058-442",
            services: ["Emergências 24h", "Exames laboratoriais", "Raios-X"],
            phone: "(98) 3212-8000"
        },
        {
            name: "UBS Jardim América",
            address: "Av. dos Portugueses, s/n - Jardim América, São Luís - MA",
            services: ["Consultas médicas", "Vacinação", "Curativos"],
            phone: "(98) 3215-5555"
        },
        {
            name: "UBS Cohab-Anil",
            address: "R. 7, Qd 25 - Cohab-Anil, São Luís - MA",
            services: ["Pediatria", "Ginecologia", "Atendimento odontológico"],
            phone: "(98) 3235-7070"
        }
    ];

    const searchInput = document.getElementById('ubs-search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const container = document.querySelector('.container');

    // ========== FUNÇÃO DE AUTCOMPLETE ==========
    function setupAutocomplete() {
        searchInput.addEventListener('input', function () {
            const val = this.value.trim().toLowerCase();
            const autocompleteList = document.getElementById('autocomplete-list');

            // Limpa sugestões anteriores
            if (autocompleteList) autocompleteList.innerHTML = '';

            if (!val) return;

            // Filtra sugestões
            const suggestions = [];
            ubsList.forEach(ubs => {
                if (ubs.name.toLowerCase().includes(val)) {
                    suggestions.push(ubs.name);
                }
                ubs.services.forEach(service => {
                    if (service.toLowerCase().includes(val)) {
                        suggestions.push(`${service} - ${ubs.name}`);
                    }
                });
            });

            // Remove duplicatas e limita a 5 sugestões
            const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);

            // Exibe sugestões
            if (uniqueSuggestions.length > 0) {
                uniqueSuggestions.forEach(suggestion => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.innerHTML = `
        <span class="autocomplete-match">${suggestion.substring(0, val.length)}</span>
        <span class="autocomplete-rest">${suggestion.substring(val.length)}</span>
    `;
                    item.innerHTML = `<strong>${suggestion.substring(0, val.length)}</strong>${suggestion.substring(val.length)}`;

                    item.addEventListener('click', function () {
                        searchInput.value = suggestion.split(' - ')[0]; // Pega apenas o nome do serviço se for o caso
                        if (autocompleteList) autocompleteList.innerHTML = '';
                        performSearch();
                    });

                    if (autocompleteList) autocompleteList.appendChild(item);
                });
            }
        });

        // Fecha sugestões ao clicar fora
        document.addEventListener('click', function (e) {
            if (e.target !== searchInput) {
                const autocompleteList = document.getElementById('autocomplete-list');
                if (autocompleteList) autocompleteList.innerHTML = '';
            }
        });
    }

    // ========== FUNÇÃO PARA RENDERIZAR RESULTADOS ==========
    function renderResults(results) {
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="ubs-card">
                    <h2>Nenhuma UBS encontrada</h2>
                    <p>Tente alterar os termos da sua busca.</p>
                </div>
            `;
            return;
        }

        results.forEach(ubs => {
            const card = document.createElement('div');
            card.className = 'ubs-card';
            card.innerHTML = `
                <h2>${ubs.name}</h2>
                <p>${ubs.address}</p>
                <p><strong>Telefone:</strong> ${ubs.phone}</p>
                <p><strong>Serviços:</strong> ${ubs.services.join(', ')}</p>
                <button class="btn-saiba-mais">Saiba Mais</button>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // ========== FUNÇÃO PRINCIPAL DE BUSCA ==========
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            renderResults(ubsList); // Mostra todos se busca vazia
            return;
        }

        const filteredResults = ubsList.filter(ubs =>
            ubs.name.toLowerCase().includes(searchTerm) ||
            ubs.address.toLowerCase().includes(searchTerm) ||
            ubs.services.some(service => service.toLowerCase().includes(searchTerm))
        );

        renderResults(filteredResults);
        container.classList.add('has-results');
    }

    // ========== CONFIGURAÇÃO DOS EVENTOS ==========
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    setupAutocomplete();
});