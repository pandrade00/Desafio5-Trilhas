import { isTokenValid, refreshToken } from "./index.js";

async function searchHospitals(hospital, cidade, bairro, rua, cep) {
  let accessToken = localStorage.getItem('accessToken');

  if (!isTokenValid(accessToken)) {
    await refreshToken();
    accessToken = localStorage.getItem('accessToken');
  }

  // Monta a query string dinamicamente
  const params = new URLSearchParams();

  if (hospital) params.append('hospital', hospital);
  if (cidade) params.append('cidade', cidade);
  if (bairro) params.append('bairro', bairro);
  if (rua) params.append('rua', rua);
  if (cep) params.append('cep', cep);

  try {
    const response = await fetch(`https://desafio5-trilhas-production.up.railway.app/leitos/busca?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': accessToken
      }
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Erro ao buscar UBSs');
    }

    return json.data;

  } catch (err) {
    console.error('Erro ao buscar hospitais:', err);
    alert('Erro ao buscar UBSs. Tente novamente mais tarde.');
  }
}

export default searchHospitals;