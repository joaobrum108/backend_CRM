const conection = require('../database/conection');
const bcrypt = require('bcryptjs');
const utils = require('../utils');

class servicesUsuarios {
  async addUsuario(name, email, password, role) {
    try {
      if (email && name && password && role) {
        const emailExistente = await this.findUsuario(email);
        if (emailExistente) {
          throw new Error("Email já cadastrado");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await conection.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
          [name, email, hashedPassword, role]
        );

        return { error: false, message: "Usuário criado com sucesso" };
      } else {
        throw new Error("Dados incompletos");
      }
    } catch (error) {
      console.log(error.message || error);
      return { error: true, message: error.message };
    }
  }

  async findUsuario(email) {
    try {
      const { rows } = await conection.query("SELECT * FROM users WHERE email = $1", [email]);
      return rows.length > 0;
    } catch (error) {
      console.log(error.message || error);
      return false;
    }
  }

  async listUsuarios() {
  try {
    const { rows } = await conection.query("SELECT * FROM users");
    return rows || [];
  } catch (error) {
    console.log(error.message || error);
    return [];
  }
  
}

 async getUsuario(id) {
  try {
     console.log("Buscando usuário com ID:", id); 
    const { rows } = await conection.query("SELECT * FROM users WHERE id = $1", [id]);

    if (rows.length === 0) {
      return null;
    }

    const usuario = rows[0];

    return {
      ...usuario,
      dataAlteracao: utils.formatarData(usuario.dataAlteracao),
      dataCadastro: utils.formatarData(usuario.dataCadastro)
    };
  } catch (error) {
    console.log(error.message || error);
    return null;
  }
}


  

async updateUsuario(payload) {
  try {
    const { id, name, password, senhaAtual } = payload;
    if (!id || !password) {
      throw new Error("ID e nova senha são obrigatórios");
    }
    const usuario = await this.getUsuario(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    if (senhaAtual) {
      const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaCorreta) {
        throw new Error("Senha atual incorreta");
      }
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    await conection.query(
      "UPDATE users SET nome = $1, senha = $2 WHERE id = $3",
      [name, hashedPassword, id]
    );
    return { error: false, message: "Usuário atualizado com sucesso" };
  } catch (error) {
    console.log(error.message || error);
    return {
      error: true,
      message: error.message || "Erro ao atualizar usuário"
    };
  }
}


}

module.exports = new servicesUsuarios();
