import relatorioJogo from "../models/relatorioJogo.js";
import usuario from "../models/Usuario.js";

class RelatoriosController {

  static async listarRelatorios(req, res) {
    try {
      const resultados = await relatorioJogo.find().populate({
        path: "usuarioId",
        select: "nome email"
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

  static async receberRelatorio(req, res) {
    try {
      const { user, totalScore, diagnoses, riskLevel, timestamp } = req.body;

      const usuarioEncontrado = await usuario.findOne({ email: user.email });

      if (!usuarioEncontrado) { return res.status(201).json({ erro: "Usuario não encontrado." }) }

      const relatorioCriado = await relatorioJogo.create({
        usuarioId: usuarioEncontrado._id,
        pontuacao: totalScore,
        diagnoses: diagnoses.map((d) => ({
          condicao: d.condition,
          recomendacao: d.recommendation
        })),
        nivelDeRisco: riskLevel,
        data: timestamp
      });

      return res.status(201).json({
        mensagem: "Relatório salvo com sucesso.",
        relatorio: relatorioCriado
      });
    } catch (err) {
      console.error("Erro ao receber relatório:", err);
      return res.status(500).json({ erro: "Erro interno ao salvar relatório." });
    }
  }

  static async relatoriosDoUsuario(req, res) {
    try {
      const usuarioId = req.usuario.id;

      if (!usuarioId) {
        return res.status(400).json({ success: false, error: "ID do usuário ausente. Você é suspeito." });
      }

      const relatoriosJogo = await relatorioJogo.find({ usuarioId: usuarioId }).populate({
        path: "usuarioId",
        select: "nome email -_id"
      });

      res.status(200).json({
        success: true,
        relatorios: relatoriosJogo
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar relatorios." });
    }
  }

  static async deletarRelatorio(req, res) {
    try {
      const { id } = req.body;

      const relatorioDeletado = await relatorioJogo.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Relatorio deletado com sucesso.",
        data: relatorioDeletado
      });
    } catch (err) {
      console.error("Erro ao deletar relatorio:", err);
      return res.status(500).json({ success: false, error: "Erro ao deletar relatorio." });
    }
  }
}

export default RelatoriosController;