import usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

async function cadastroUsuario(dadosUsuario) {
  const novoUsuario = dadosUsuario;

  const usuarioExistente = await usuario.findOne({ cpf: novoUsuario.cpf });
  if (usuarioExistente) { throw new Error("Usuário já cadastrado com este CPF"); }

  const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);
  novoUsuario.senha = senhaHash;

  const usuarioCriado = await usuario.create({ ...novoUsuario});
  return usuarioCriado;
}

// async function loginUsuario(senha, hash) {
//   const verify = await bcrypt.compare(senha, hash);
//   //console.log(verify);
//   return verify
// }

// async function fluxoUsuario() {
//   const password = "1214";
//   const hash = await cadastroUsuario(password);

//   const loginCerto = await loginUsuario(password, hash);
//   const loginErrado = await loginUsuario("batata", hash);
//   console.log(loginCerto, loginErrado);
// }

export { cadastroUsuario };