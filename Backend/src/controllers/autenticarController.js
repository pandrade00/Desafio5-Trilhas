import usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function cadastroUsuario(dadosUsuario) {
  const novoUsuario = dadosUsuario;

  const usuarioExistente = await usuario.findOne({ cpf: novoUsuario.cpf });
  if (usuarioExistente) { throw new Error("Usuário já cadastrado com este CPF"); }

  const senhaHash = await bcrypt.hash(novoUsuario.senha, 10);
  novoUsuario.senha = senhaHash;

  const usuarioCriado = await usuario.create(
    {
      ...novoUsuario,
      role: "usuario"
    });
  return usuarioCriado;
}

async function atualizarSenha(senha, usuarioId) {
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuarioAtualizar = await usuario.findById(usuarioId);

  usuarioAtualizar.senha = senhaHash;
  return await usuarioAtualizar.save();
}

async function logarUsuario(email, senha) {
  const usuarioLogar = await usuario.findOne({ email: email }).select("+senha");

  if (!usuarioLogar) { throw new Error("Nenhum usuário encontrado para este email."); }

  const senhaHash = usuarioLogar.senha;
  const verificarSenhas = await bcrypt.compare(senha, senhaHash);

  if (!verificarSenhas) { throw new Error("Senha incorreta."); }

  delete usuarioLogar.senha;

  const token = jwt.sign(
    {
      infoUsuario:
      {
        id: usuarioLogar._id,
        role: usuarioLogar.role
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: 300 }
  );

  return {
    usuario: usuarioLogar,
    token: token
  };
}

export { cadastroUsuario, atualizarSenha, logarUsuario };