const conection = require('../database/conection');
const bcrypt = require('bcrypt');

class serviceRegisterUse {
  async register(name, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    await conection.query(sql, [name, email, hashedPassword, role]);

    return { message: 'Usuário cadastrado com sucesso', user: { name, email, role } };
  }
}

module.exports = new serviceRegisterUse();
