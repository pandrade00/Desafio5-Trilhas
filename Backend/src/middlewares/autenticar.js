import jwt from "jsonwebtoken";

function autenticar(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) { return res.status(401).json({ erro: "Token não fornecido" }); }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); //Payload vai ser o objeto { id: usuario._id, role(tipo de usuario): usuario.role,  iat: ..., exp: ...}, ele é uma parte do token JWT
    req.usuario = payload;
    
    next(); //Dentro do contexto que a função autenticar for chamada, o next executa a função seguinte à ela
  } catch (err) {
    console.error(err);
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

export default autenticar;