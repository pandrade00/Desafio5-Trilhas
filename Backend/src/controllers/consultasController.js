import consulta from "../models/Consulta.js";

class ConsultasController {

  static async listarConsultas(req, res) {
    try {
      const resultados = await consulta.find().populate({
        path: "usuarioId",
        select: "cpf nome email telefone"
      });

      res.status(200).json({
        success: true,
        consultas: resultados.length,
        data: resultados
      });
    } catch (err) {
      console.error("Erro ao listar consultas:", err);
      return res.status(500).json({ success: false, error: "Erro ao listar consultas." });
    }
  }

  static async buscarConsultasDoUsuario(req, res) {
    try {
      const usuarioId = req.params.usuarioId;

      if (!usuarioId) {
        return res.status(400).json({ success: false, error: "ID do usuário ausente." });
      }

      const consultas = await consulta.find({ usuarioId: usuarioId }).populate({
        path: "usuarioId",
        select: "cpf nome email telefone -_id"
      });

      res.status(200).json({
        success: true,
        data: consultas
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar consultas." });
    }
  }

  static async cadastrarConsulta(req, res) {
    try {
      const novaConsulta = req.body;

      const consultaExistente = await consulta.findOne({
        usuarioId: novaConsulta.usuarioId,
        data: novaConsulta.data,
        hora: novaConsulta.hora
      });

      if (consultaExistente) {
        return res.status(409).json({
          success: false,
          error: "Já existe uma consulta agendada para este usuário na mesma data e horário."
        });
      }

      const consultaCriada = await consulta.create(novaConsulta);

      res.status(201).json({
        success: true,
        data: consultaCriada
      });
    } catch (err) {
      console.error("Erro ao cadastrar consulta:", err);
      return res.status(500).json({ success: false, error: "Erro ao cadastrar consulta." });
    }
  }

  static async atualizarConsulta(req, res) {
    try {
      const id = req.params.id;
      await consulta.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        success: true,
        message: "Consulta atualizada com sucesso."
      });
    } catch (err) {
      console.error("Erro ao atualizar consulta:", err);
      return res.status(500).json({ success: false, error: "Erro ao atualizar consulta." });
    }
  }

  static async deletarConsulta(req, res) {
    try {
      const id = req.params.id;
      const consultaDeletada = await consulta.findByIdAndDelete(id, {
        projection: { usuarioId: 1, data: 1, hora: 1, status: 1 }
      });

      res.status(200).json({
        success: true,
        data: consultaDeletada,
        message: "Consulta deletada com sucesso."
      });
    } catch (err) {
      console.error("Erro ao deletar consulta:", err);
      return res.status(500).json({ success: false, error: "Erro ao deletar consulta." });
    }
  }
}

export default ConsultasController;
