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

document.addEventListener('DOMContentLoaded', function () {
  // Máscara para o SUS (15 dígitos com espaços: XXX XXXX XXXX XXXX)
  VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99");

  // Máscara para o celular ((XX) XXXXX-XXXX)
  VMasker(document.getElementById("numero")).maskPattern("(99) 99999-9999");

  document.querySelector(".btn-entrar").addEventListener("click", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;
    const numero = document.getElementById("numero").value;
    const dia = document.getElementById("dia").value;
    const mes = document.getElementById("mes").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;

    if (!nome || !email || !cpf || !senha || !numero || !dia || !mes || !ano || !genero) {
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

    const usuario = {
      nome,
      email,
      cpf,
      senha,
      telefones: [numero], // Envia como array
      dataNascimento: new Date(`${ano}-${mes}-${dia}`), // Formato ISO
      genero
    };

    try {
      console.log("Dados sendo enviados:", usuario);

      const response = await fetch('https://desafio5-trilhas-production.up.railway.app/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);

      if (!response.ok) {
        const errorMsg = responseData.message || `Erro ${response.status}: ${response.statusText}`;
        throw new Error(errorMsg);
      }

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
      }
      document.getElementById('popupSucesso').classList.add('active');
    } catch (error) {
      console.error("Erro completo:", error);
      alert(`Erro durante o cadastro: ${error.message}`);
    }
  });

  // Redirecionar para login ao clicar no botão
  document.getElementById('btnIrParaLogin').addEventListener('click', function () {
    window.location.href = '../login/login.html';
  });

  // Fechar popup ao clicar fora
  document.getElementById('popupSucesso').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('active');
      window.location.href = '../login/login.html';
    }
  });
});