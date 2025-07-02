import { searchHospitals } from "../req-api/index.js";

document.addEventListener('DOMContentLoaded', function () {

    const accessToken = localStorage.getItem('accessToken');
    const authSection = document.getElementById('auth-section');
    const fazerLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        window.location.href = '../login/login.html';
    };

    if (accessToken) {
        const userName = localStorage.getItem('userName');
        authSection.innerHTML = `
        <span>${userName}</span>
        <button id="logout-btn">Sair</button>
    `;
        document.getElementById('logout-btn').addEventListener('click', fazerLogout);
    } else {
        authSection.innerHTML = '<a href="../login/login.html">Login</a>';
    }
    const hosp = [];

    const searchInput = document.getElementById('hosp-search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const container = document.querySelector('.container');

    /* ========== FUNÇÃO DE AUTCOMPLETE ==========
    function setupAutocomplete() {
        searchInput.addEventListener('input', function () {
            const val = this.value.trim().toLowerCase();
            const autocompleteList = document.getElementById('autocomplete-list');

            if (autocompleteList) autocompleteList.innerHTML = '';

            if (!val) return;

            const suggestions = [];
            hosp.forEach(hosp => {
                if (hosp.name.toLowerCase().includes(val)) {
                    suggestions.push(hosp.Hospital);
                }
                hosp.services.forEach(service => {
                    if (service.toLowerCase().includes(val)) {
                        suggestions.push(`${service} - ${hosp.Hospital}`);
                    }
                });
            });

            const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);

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
                        searchInput.value = suggestion.split(' - ')[0];
                         if (autocompleteList) autocompleteList.innerHTML = '';
                        performSearch();
                    });

                    if (autocompleteList) autocompleteList.appendChild(item);
                });
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target !== searchInput) {
                const autocompleteList = document.getElementById('autocomplete-list');
                if (autocompleteList) autocompleteList.innerHTML = '';
            }
        });
    }*/

    // ========== FUNÇÃO PARA RENDERIZAR RESULTADOS ==========
    function renderResults(results) {
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="hosp-card">
                    <h2>Nenhuma hosp encontrada</h2>
                    <p>Tente alterar os termos da sua busca.</p>
                </div>
            `;
            return;
        }

        results.forEach(hosp => {
            const card = document.createElement('div');

            hosp.Tipo = treatText(hosp.Tipo);
            hosp.Natureza = treatText(hosp.Natureza);

            card.className = 'hosp-card';
            card.innerHTML = `
                <h2>${hosp.Hospital}</h2>
                <p>${hosp.Endereco.Cidade}</p>
                <p>${hosp.Endereco.Rua}</p>
                <p><strong>Email:</strong> ${hosp.Email || "não registrado"}</p>
                <p><strong>Tipo:</strong> ${hosp.Tipo}</p>
                <p><strong>Natureza:</strong> ${hosp.Natureza}</p>
                <button class="btn-saiba-mais">Saiba Mais</button>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // ========== FUNÇÃO PRINCIPAL DE BUSCA ==========
    async function performSearch() {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            resultsContainer.innerHTML = `<p>Digite algo para buscar um hospital.</p>`;
            return;
        }

        try {
            // Chama a função importada passando o termo como hospital
            const results = await searchHospitals(searchTerm, "", "", "", "");

            if (!results || results.length === 0) {
                resultsContainer.innerHTML = `
                <div class="hosp-card">
                    <h2>Nenhum hospital encontrado</h2>
                    <p>Tente alterar os termos da sua busca.</p>
                </div>
            `;
                return;
            }

            renderResults(results);
            container.classList.add('has-results');
        } catch (err) {
            console.error("Erro ao buscar hospitais:", err);
            resultsContainer.innerHTML = `
            <div class="hosp-card">
                <h2>Erro na busca</h2>
                <p>Não foi possível carregar os hospitais. Tente novamente mais tarde.</p>
            </div>
        `;
        }
    }

    // ========== CONFIGURAÇÃO DOS EVENTOS ==========
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            await performSearch();
        }
    });

    function treatText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\uFFFD]/g, "u")
            .replace(/[_-]/g, " ")
            .replace(/[^\x00-\x7F]/g, "")
            .toLowerCase()
            .trim();
    }
    //setupAutocomplete();
});