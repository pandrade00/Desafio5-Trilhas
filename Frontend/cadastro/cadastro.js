window.onload = function () {
  const diaSelect = document.getElementById("dia");
  const anoSelect = document.getElementById("ano");

  // Dias de 1 a 31
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    diaSelect.appendChild(option);
  }

  // Anos de 1950 até o ano atual
  const anoAtual = new Date().getFullYear();
  for (let i = 1950; i <= anoAtual; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    anoSelect.appendChild(option);
  }
};

// Validação simples do email
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

// Evento de clique no botão
document.querySelector(".btn-entrar").addEventListener("click", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;
  const genero = document.getElementById("genero").value;

  if (!nome || !email || !senha || !dia || !mes || !ano || !genero) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Insira um e-mail válido.");
    return;
  }

  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  alert("Cadastro realizado com sucesso!");
});