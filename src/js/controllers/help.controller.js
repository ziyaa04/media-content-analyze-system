const Help = require("../tables/help.table");

class HelpController {
  constructor(helpDao) {
    this.helpDao = helpDao;
  }
  async GetAll(req, res) {
    try {
      const [rows] = await this.helpDao.findAll();
      return res.status(200).json(rows);
    } catch (e) {
      return res.status(500).json({ message: "Unexpected error!" });
    }
  }

  async Get(req, res) {
    try {
      const [row] = await this.helpDao.find(req.body.id);
      return res.status(200).json(row);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Unexpected error!" });
    }
  }

  async Post(req, res) {
    try {
      if (!req.body.title || !req.body.description || !req.body.id)
        return res.status(400).json({ message: "Body is not valid!" });
      const help = await this.helpDao.create(
        new Help(req.body.title, req.body.description, req.body.id)
      );
      if (help[0]?.insertId)
        return res.status(201).json({ message: "Success!" });
      throw new Error();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Unexpected error!" });
    }
  }

  async Put(req, res) {
   try{
     if (!req.body.description && !req.body.title) {
       return res.json(400).json({ message: "Body is not valid!" });
     }
     const [row] = await this.helpDao.update(req.body.id, req.body);
     if(row.changedRows)
      return  res.status(200).json({ message: 'Success!' });
     return res.status(400).json({ message: 'Bad request!' });
   }catch(e){
     console.log(e);
     return res.status(500).json({ message:'Unexpected error!' })
   }
  }

  async Delete(req, res) {
    if (!req.body.id)
      return res.status(400).json({ message: "Body is not valid!" });
    const [row] = await this.helpDao.delete(req.body.id);
    if (row.affectedRows) return res.status(200).json({ message: "Success!" });
    return res.status(404).json({ message: "Not found !" });
  }
}

module.exports = HelpController;
