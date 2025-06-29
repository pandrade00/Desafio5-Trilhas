import leito from "../models/Leito.js";

class LeitosController {

  static async listarLeitos(req, res) {
    try {
      const resultados = await leito.find({});
      res.status(200).json({
        success: true,
        leitos: resultados.length,
        data: resultados
      });
    } catch (err) {
      console.error("Erro ao listar leitos:", err);
      return res.status(500).json({ success: false, error: "Erro ao listar leitos." });
    }
  }

  static async buscarLeitos(req, res) {
    try {
      const { hospital, cidade, bairro, rua, cep } = req.query;

      if (!cidade && !bairro && !rua && !cep && !hospital) {
        return res.status(400).json({ success: false, error: "Requisitos da query ausentes." });
      }

      const criarRegex = (valor) => new RegExp(valor, "i");
      const match = {};
      if (hospital) match["Hospital"] = criarRegex(hospital);
      if (cidade) match["Endereco.Cidade"] = criarRegex(cidade);
      if (bairro) match["Endereco.Bairro"] = criarRegex(bairro);
      if (rua) match["Endereco.Rua"] = criarRegex(rua);
      if (cep) match["Endereco.Cep"] = criarRegex(cep);

      const resultados = await leito.aggregate([
        { $match: match },
        {
          $project: {
            _id: 1,
            Hospital: 1,
            Tipo: 1,
            Natureza: 1,
            CadastroCNES: 1,
            Disponivel: 1,
            Email: 1,
            Telefone: 1,
            Endereco: 1
          }
        }
      ]);

      res.status(200).json({
        success: true,
        data: resultados
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      res.status(500).json({ success: false, error: "Erro ao buscar hospitais." });
    }
  }

  static async buscarLeitoPorId(req, res) {
    try {
      const id = req.params.id;
      const leitoEncontrado = await leito.findById(id);

      if (!leitoEncontrado) {
        return res.status(404).json({ success: false, error: "Leito não encontrado." });
      }

      res.status(200).json({
        success: true,
        data: leitoEncontrado
      });

    } catch (err) {
      console.error("Erro ao buscar leito por ID:", err);
      return res.status(500).json({ success: false, error: "Erro ao buscar leito." });
    }
  }

  static async cadastrarLeito(req, res) {
    try {
      const novoLeito = req.body;
      const leitoExistente = await leito.findOne({ CadastroCNES: novoLeito.CadastroCNES });

      if (leitoExistente) {
        return res.status(400).json({ success: false, error: "Leito já cadastrado com este CNES." });
      }

      const leitoCriado = await leito.create(novoLeito);
      res.status(201).json({
        success: true,
        data: leitoCriado
      });
    } catch (err) {
      console.error("Erro ao cadastrar leito:", err);
      return res.status(500).json({ success: false, error: "Erro ao cadastrar leito." });
    }
  }

  static async atualizarLeito(req, res) {
    try {
      const id = req.params.id;
      await leito.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        success: true,
        message: "Leito atualizado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao atualizar leito:", err);
      return res.status(500).json({ success: false, error: "Erro ao atualizar leito." });
    }
  }

  static async deletarLeito(req, res) {
    try {
      const id = req.params.id;
      const leitoDeletado = await leito.findByIdAndDelete(id, {
        projection: { Hospital: 1, CadastroCNES: 1, Endereco: 1 }
      });

      res.status(200).json({
        success: true,
        data: leitoDeletado,
        message: "Leito deletado com sucesso."
      });
    } catch (err) {
      console.error("Erro ao deletar leito:", err);
      return res.status(500).json({ success: false, error: "Erro ao deletar leito." });
    }
  }
}

export default LeitosController;
