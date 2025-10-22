const e = require('express');
const serviceUsers = require('../Services/serviceUsers');

class controllerUsers {
  async RegisterUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const result = await serviceUsers.register(name, email, password, role);
      res.status(201).json(result); 
    } catch (e) {
      res.status(500).json({ error: e.message }); 
    }
  }

  async listUserId(req, res) {
  try {
    const { id } = req.params; 

    const result = await serviceUsers.listarById(id);

    if (!result) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao listar usuário por ID:', error.message);

    return res.status(500).json({
      message: 'Erro interno ao buscar usuário',
      error: error.message
    });
  }
}


 async listUsuario(req, res) {
  try {
    const result = await serviceUsers.listar();

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);

    return res.status(500).json({
      message: 'Erro interno ao listar usuários',
      error: error.message
    });
  }
}

 async updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const result = await serviceUsers.atualizarUser(id, name, email, password, role);

    if (!result) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.message);
    return res.status(500).json({
      message: 'Erro interno ao atualizar o usuário',
      error: error.message
    });
  }


}

async deleteUser(req, res) {
  try {
    const { id } = req.params;

    const result = await serviceUsers.deletarUser(id);

    if (!result) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao excluir usuário:', error.message);
    return res.status(500).json({
      message: 'Erro interno ao excluir o usuário',
      error: error.message
    });
  }
}

}

module.exports = new controllerUsers();
