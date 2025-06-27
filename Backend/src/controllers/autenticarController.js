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

  const { accessToken, refreshToken } = await gerarTokens(usuarioLogar);

  const usuarioSemSenha = usuarioLogar.toObject();
  delete usuarioSemSenha.senha;

  return {
    usuario: {
      role: usuarioSemSenha.role,
      nome: usuarioSemSenha.nome,
      email: usuarioSemSenha.email
    },
    accessToken,
    refreshToken
  };
}

async function renovarToken(refreshToken) {
  let payload;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
  } catch (err) {
    throw new Error("Token inválido ou expirado");
  }

  if (payload.type !== "refresh") {
    throw new Error("Tipo de token inválido");
  }

  const usuarioEncontrado = await usuario.findById(payload.id);

  if (!usuarioEncontrado || !usuarioEncontrado.refreshTokenHash) {
    throw new Error("Usuario não encontrado ou não possui token registrado.");
  }

  const refreshTokenHash = usuarioEncontrado.refreshTokenHash;
  const verificarTokens = await bcrypt.compare(refreshToken, refreshTokenHash)

  if (!verificarTokens) {
    throw new Error("Refresh token incorreto.");
  }

  const { accessToken, refreshToken: refreshTokenCriado } = await gerarTokens(usuarioEncontrado);

  const usuarioSemSenha = usuarioEncontrado.toObject();
  delete usuarioSemSenha.senha;

  return {
    usuario: {
      role: usuarioSemSenha.role,
      nome: usuarioSemSenha.nome,
      email: usuarioSemSenha.email
    },
    accessToken,
    refreshToken: refreshTokenCriado
  };
}

async function gerarTokens(usuario) {
  const payload = {
    id: usuario._id,
    email: usuario.email,
    role: usuario.role
  };

  const accessToken = jwt.sign(
    { ...payload, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    { ...payload, type: "refresh" },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "3d" }
  );

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  usuario.refreshTokenHash = refreshTokenHash;
  await usuario.save();

  return { accessToken, refreshToken }
}


export { cadastroUsuario, atualizarSenha, logarUsuario, renovarToken };