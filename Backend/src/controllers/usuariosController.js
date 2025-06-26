import usuario from "../models/Usuario.js";
import { cadastroUsuario, atualizarSenha, logarUsuario } from "./autenticarController.js";

class UsuariosController {

  static async listarUsuarios(req, res) {
    try {
      const resultados = await usuario.find({});
      res.status(200).json({
        success: true,
        usuarios: resultados.length,
        data: resultados
      });
    } catch (err) {
      console.error("Erro ao listar usuarios:", err);
      return res.status(500).json({ success: false, error: "Erro ao listar usuarios." });
    }
  }

  static async buscarUsuarioPorId(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ success: false, error: "ID do usuário ausente." });
      }

      const usuarioEncontrado = await usuario.findById(id);

      if (!usuarioEncontrado) {
        return res.status(404).json({ success: false, error: "Usuário não encontrado." });
      }

      res.status(200).json({
        success: true,
        data: usuarioEncontrado
      });
    } catch (err) {
      console.error("Erro ao buscar usuario por ID:", err);
      return res.status(500).json({ success: false, error: "Erro ao buscar usuario." });
    }
  }

  static async buscarUsuarios(req, res) {
    try {
      const { nome, cpf, email, telefone } = req.query;

      if (!nome && !cpf && !email && !telefone) {
        return res.status(400).json({ success: false, error: "Requisitos da query ausentes." });
      }

      const criarRegex = (valor) => new RegExp(valor, "i");
      const match = {};
      if (nome) match["nome"] = criarRegex(nome);
      if (cpf) match["cpf"] = criarRegex(cpf);
      if (email) match["email"] = criarRegex(email);
      if (telefone) match["telefone"] = criarRegex(telefone);

      const resultados = await usuario.aggregate([
        { $match: match },
        { $project: { senha: 0 } }
      ]);

      res.status(200).json({
        success: true,
        data: resultados
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar usuarios." });
    }
  }

  static async cadastrarUsuario(req, res) {
    try {
      const novoUsuario = await cadastroUsuario(req.body);

      const objtUsuario = novoUsuario.toObject();
      delete objtUsuario.senha;

      res.status(201).json({
        success: true,
        data: objtUsuario
      });
    } catch (err) {
      console.error("Erro ao cadastrar usuario:", err);
      return res.status(500).json({ success: false, error: "Erro ao cadastrar usuario." || err.message });
    }
  }

  static async logarUsuario(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ success: false, error: "Email e senha são obrigatórios." });
      }

      const { usuario, token } = await logarUsuario(email, senha);

      res.status(201).json({
        success: true,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          role: usuario.role
        },
        acessToken: token
      });
    } catch (err) {
      console.error("Erro ao logar usuario:", err);
      return res.status(500).json({ success: false, error: "Erro ao logar usuario: Credenciais inválidas" });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const id = req.params.id;

      if (req.body.senha) {
        await atualizarSenha(req.body.senha, id);
        delete req.body.senha;
      }

      await usuario.findByIdAndUpdate(id, req.body, { runValidators: true });

      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao atualizar usuario:", err);
      return res.status(500).json({ success: false, error: "Erro ao atualizar usuario." });
    }
  }

  static async deletarUsuario(req, res) {
    try {
      const id = req.params.id;
      const usuarioDeletado = await usuario.findByIdAndDelete(id, {
        projection: { nome: 1, cpf: 1, email: 1, telefone: 1, endereco: 1 }
      });

      res.status(200).json({
        success: true,
        data: usuarioDeletado,
        message: "Usuário deletado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao deletar usuario:", err);
      return res.status(500).json({ success: false, error: "Erro ao deletar usuario." });
    }
  }
}

export default UsuariosController;
