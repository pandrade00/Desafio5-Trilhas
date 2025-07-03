document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.querySelector(".btn-entrar");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const emailError = document.getElementById("emailError");

  function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  async function fazerLogin(email, senha) {
    try {
      const response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Email ou senha incorretos!"
        };
      }

      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        usuario: data.usuario
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { success: false, message: "Erro na conexão" };
    }
  }

  btnEntrar.addEventListener("click", async () => {
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

    try {
      const resultado = await fazerLogin(email, senha);

      if (resultado.success) {
        // Armazena os tokens e dados do usuário
        localStorage.setItem('accessToken', resultado.accessToken);
        localStorage.setItem('refreshToken', resultado.refreshToken);
        localStorage.setItem('userName', resultado.usuario.nome);

        window.location.href = "./index.html";
      } else {
        alert(resultado.message || "Email ou senha incorretos!");
      }
    } catch (error) {
      alert("Ocorreu um erro durante o login. Por favor, tente novamente.");
      console.error(error);
    }
  });

  // Redirecionamento para cadastro
  document.querySelector('a[href="./cadastro.html"]').addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./cadastro.html";
  });
});