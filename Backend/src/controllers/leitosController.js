import Leito from "../models/Leito.js";

export const buscarLeitos = async (req, res) => {
  try {
    const filtros = {};

    if (req.query.hospital) {
      filtros.hospital = req.query.hospital;
    }
    if (req.query.tipo) {
      filtros.tipo = req.query.tipo;
    }
    filtros.disponivel = "Sim";
  } catch (err) {
    res.status(500).json({ erro : "Erro ao buscar leitos no banco de dados" });
  }
};
