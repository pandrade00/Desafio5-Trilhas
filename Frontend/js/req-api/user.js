async function userData() {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/usuario', {
    headers: {
      'Authorization': accessToken
    }
  });

  const responseJson = await response.json();

  if (!response.ok || !responseJson.success) {
    const error = responseJson.error || 'Erro desconhecido';
    throw new Error(error);
  }

  return responseJson.data;
}

export default userData;