class CarsDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, image, brand, model, price, stock FROM cars')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, image, brand, model, price, stock FROM cars WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (car) {
    const response = await this.db.query('INSERT INTO cars (image, brand, model, price, stock) VALUES (?, ?, ?, ?, ?)', [car.image, car.brand, car.model, car.price, car.stock])
    const result = response[0]
    return result.insertId
  }

  async update (car) {
    const response = await this.db.query('UPDATE cars SET image = ?, brand = ?, model = ?, price = ?, stock = ? WHERE id = ?', [car.image, car.brand, car.model, car.price, car.stock, car.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM cars WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = CarsDAO
