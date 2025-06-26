import exame from "../models/Exame.js";

class ExamesController {

  static async listarExames(req, res) {
    try {
      const resultados = await exame.find().populate({
        path: "usuarioId",
        select: "cpf nome email telefone"
      });

      res.status(200).json({
        success: true,
        exames: resultados.length,
        data: resultados
      });
    } catch (err) {
      console.error("Erro ao listar exames:", err);
      return res.status(500).json({ success: false, error: "Erro ao listar exames." });
    }
  }

  static async buscarExamePorId(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ success: false, error: "ID do exame ausente." });
      }

      const exameEncontrado = await exame.findById(id).populate("usuarioId");

      if (!exameEncontrado) {
        return res.status(404).json({ success: false, error: "Exame não encontrado." });
      }

      res.status(200).json({
        success: true,
        data: exameEncontrado
      });
    } catch (err) {
      console.error("Erro ao buscar exame por ID:", err);
      return res.status(500).json({ success: false, error: "Erro ao buscar exame." });
    }
  }

  static async buscarExamesDoUsuario(req, res) {
    try {
      const usuarioId = req.params.usuarioId;

      if (!usuarioId) {
        return res.status(400).json({ success: false, error: "ID do usuário ausente." });
      }

      const exames = await exame.find({ usuarioId: usuarioId }).populate({
        path: "usuarioId",
        select: "cpf nome email telefone -_id"
      });

      res.status(200).json({
        success: true,
        data: exames
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar exames." });
    }
  }

  static async cadastrarExame(req, res) {
    try {
      const novoExame = req.body;

      const exameExistente = await exame.findOne({
        usuarioId: novoExame.usuarioId,
        tipo: novoExame.tipo,
        data: novoExame.data,
        local: novoExame.local,
        status: novoExame.status
      });

      if (exameExistente) {
        return res.status(409).json({
          success: false,
          error: "Já existe um exame idêntico cadastrado."
        });
      }

      const exameCriado = await exame.create(novoExame);

      res.status(201).json({
        success: true,
        data: exameCriado
      });
    } catch (err) {
      console.error("Erro ao cadastrar exame:", err);
      return res.status(500).json({ success: false, error: "Erro ao cadastrar exame." });
    }
  }

  static async atualizarExame(req, res) {
    try {
      const id = req.params.id;
      await exame.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        success: true,
        message: "Exame atualizado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao atualizar exame:", err);
      return res.status(500).json({ success: false, error: "Erro ao atualizar exame." });
    }
  }

  static async deletarExame(req, res) {
    try {
      const id = req.params.id;
      const exameDeletado = await exame.findByIdAndDelete(id, {
        projection: { usuarioId: 1, data: 1, local: 1, status: 1 }
      });

      res.status(200).json({
        success: true,
        data: exameDeletado,
        message: "Exame deletado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao deletar exame:", err);
      return res.status(500).json({ success: false, error: "Erro ao deletar exame." });
    }
  }
}

export default ExamesController;
