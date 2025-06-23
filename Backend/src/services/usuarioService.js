import usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

async function cadastroUsuario(dadosUsuario) {
  const novoUsuario = dadosUsuario;

  const usuarioExistente = await usuario.findOne({ cpf: novoUsuario.cpf });
  if (usuarioExistente) { throw new Error("Usuário já cadastrado com este CPF"); }

  const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);
  novoUsuario.senha = senhaHash;

  const usuarioCriado = await usuario.create({ ...novoUsuario });
  return usuarioCriado;
}

async function atualizarSenha(senha, usuarioId) {
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuarioAtualizar = await usuario.findById(usuarioId);

  usuarioAtualizar.senha = senhaHash;
  return await usuarioAtualizar.save();
}

export { cadastroUsuario, atualizarSenha };