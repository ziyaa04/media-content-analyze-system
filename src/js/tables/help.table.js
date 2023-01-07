class Help {
  id;
  title;
  description;
  constructor(title, description, id = null) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

module.exports = Help;
