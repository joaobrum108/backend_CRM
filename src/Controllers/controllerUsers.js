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
}

module.exports = new controllerUsers();
