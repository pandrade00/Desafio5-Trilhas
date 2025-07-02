import jwt_decode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.esm.js';

function isTokenValid(token) {
  try {
    const decoded = jwt_decode(token); // pega o payload do token
    const currentTime = Math.floor(Date.now() / 1000); // tempo atual em segundos
    return decoded.exp > currentTime; // compara com o tempo de expiração
  } catch (err) {
    // se o token estiver malformado ou inválido
    return false;
  }
}

export default isTokenValid;