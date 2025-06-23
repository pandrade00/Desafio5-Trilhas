import { endereco } from "../models/Endereco.js";
import usuario from "../models/Usuario.js";
import { cadastroUsuario } from "../services/usuarioService.js";

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
        {
          $project: {
            _id: 1,
            nome: 1,
            cpf: 1,
            email: 1,
            senha: 0,
            telefones: 1,
            dataNascimento: 1,
            endereco: 1
          }
        }
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

      res.status(201).json({
        success: true,
        data: novoUsuario
      });
    } catch (err) {
      console.error("Erro ao cadastrar usuario:", err);
      return res.status(500).json({ success: false, error: "Erro ao cadastrar usuario." || err.message });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const id = req.params.id;

      if(req.body.senha) {
        const senhaHash = await gerarHash(req.body.senha);
        req.body.senha = senhaHash;
      }

      await usuario.findByIdAndUpdate(id, req.body);

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
