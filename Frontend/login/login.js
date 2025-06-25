document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.querySelector(".btn-entrar");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const emailError = document.getElementById("emailError");

  function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  btnEntrar.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Resetar mensagem de erro
    emailError.style.display = "none";

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      emailError.style.display = "block";
      return;
    }

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (
      usuarioSalvo &&
      usuarioSalvo.email === email &&
      usuarioSalvo.senha === senha
    ) {
      alert("Login realizado com sucesso!");
      // Redirecione para a área logada
      // window.location.href = "dashboard.html";
    } else {
      alert("Email ou senha incorretos!");
    }
  });

  // Redirecionamento para cadastro 
  const linkCadastro = document.querySelector('a[href="#"]:contains("Cadastre-se")');
  if (linkCadastro) {
    linkCadastro.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "cadastro.html";
    });
  }
});