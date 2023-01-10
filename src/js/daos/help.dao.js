const pool = require("../pool");

class HelpDao {
  async findAll() {
    return pool.execute("SELECT * FROM help");
  }
  async find(id) {
    return pool.execute("SELECT * FROM help WHERE `id` = ?", [id]);
  }

  async create(help) {
    return pool.execute(
      "INSERT INTO help (`title`,`description`, `id`) VALUES (?,?,?)",
      [help.title, help.description, help.id]
    );
  }

  async update(id,updateObject) {
    const values = [];
    let query =
      "UPDATE  help SET " +
      (updateObject.title
        ? (values.push(updateObject.title), "`title` = ?")
        : "") +
      (updateObject.description
        ? (values.push(updateObject.description), ", `description` = ?")
        : "") + " WHERE `id` = ?";
    return pool.execute(query, [...values, id]);
  }

  async delete(id) {
    return pool.query("DELETE  FROM help WHERE `id` = ?", [id]);
  }
}

module.exports = HelpDao;
