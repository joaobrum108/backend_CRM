const serviceUsuarios = require('../services/serviceUsuarios');

class controllerUsuarios {
   async addUsuario(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const usuario = await serviceUsuarios.addUsuario(name, email, password, role);
      if (!usuario.error)
        return res.status(200).json(usuario)
      else
        return res.status(400).json({ error: true, message: usuario.message });
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message || error || "" });
    }
  }

    async listUsuarios(req, res) {
    try {
      const usuarios = (await serviceUsuarios.listUsuarios()) || [];
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message || error || "" });
    }
  }

  async getUsuario(req, res) {
    try {
      const id = req.query.id;
      const usuario = await serviceUsuarios.getUsuario(Number(id));
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message || error || "" });
    }
  }

   async updateUsuario(req, res) {
    try {
      const usuario = await serviceUsuarios.updateUsuario(req.body);
      if (usuario && !usuario.error) {
        return res.status(200).json(usuario);
      } else {
        return res.status(400).json({ message: usuario?.message || 'Erro desconhecido', error: true });
      }
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message || error || "" });
    }
  }
}


module.exports = new controllerUsuarios();