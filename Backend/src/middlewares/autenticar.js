import jwt from "jsonwebtoken";

function autenticar(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) { return res.status(401).json({ erro: "Token não fornecido" }); }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

export default autenticar;