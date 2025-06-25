function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario.infoUsuario;

    if (!usuario || !usuario.role) {
      return res.status(401).json({ erro: "Usuario não autenticado" });
    }

    if (!rolesPermitidos.includes(usuario.role)) {
      return res.status(403).json({ erro: "Acesso negado ao seu usuario" });
    }
    
    next();
  }
}

export default permitirRoles;