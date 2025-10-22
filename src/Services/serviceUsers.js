const connection = require('../database/conection'); // Corrigido nome do arquivo
const bcrypt = require('bcrypt');

class ServiceRegisterUser {
  async register(name, email, password, role) {
    try {

      if (!name || !email || !password || !role) {
        throw new Error('Todos os campos são obrigatórios.');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }


      const hashedPassword = await bcrypt.hash(password, 10);


      const sql = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const result = await connection.query(sql, [name, email, hashedPassword, role]);
      const userId = result.rows[0].id;

      return {
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: userId,
          name,
          email,
          role
        }
      };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      throw new Error('Não foi possível cadastrar o usuário.');
    }
  }

 async listarById(id) {
  try {
    const sql = 'SELECT id, name, email, role FROM users WHERE id = $1';
    const result = await connection.query(sql, [id]);

    if (result.rows.length === 0) {
      return null; 
    }

    return {
      message: 'Usuário encontrado com sucesso',
      user: result.rows[0]
    };
  } catch (error) {
    console.error('Erro ao listar usuário por ID:', error.message);
    throw new Error('Não foi possível listar o usuário por ID.');
  }
}


  async listar() {
    try {
      const sql = 'SELECT id, name, email, role FROM users';
      const result = await connection.query(sql);

      return {
        message: 'Usuários encontrados com sucesso',
        users: result.rows
      };
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      throw new Error('Não foi possível listar os usuários.');
    }
  }

  async atualizarUser(id, name, email, password, role) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `
        UPDATE users
        SET name = $1, email = $2, password = $3, role = $4
        WHERE id = $5
        RETURNING id, name, email, role
      `;
      const result = await connection.query(sql, [name, email, hashedPassword, role, id]);

      if (result.rows.length === 0) {
        return null; 
      }

      return {
        message: 'Usuário atualizado com sucesso',
        user: result.rows[0]
      };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error('Não foi possível atualizar o usuário.');
    }
  }

  async deletarUser(id) {
    try {
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING id, name, email, role';
      const result = await connection.query(sql, [id]);

      if (result.rows.length === 0) {
        return null; 
      }

      return {
        message: 'Usuário excluído com sucesso',
        user: result.rows[0]
      };
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
      throw new Error('Não foi possível excluir o usuário.');
    }
  }

}

module.exports = new ServiceRegisterUser();
