export class User {
  constructor({ id, name, email, createdAt, updatedAt }) {
    this.id = id
    this.name = name
    this.email = email
    this.createdAt = createdAt || new Date().toISOString()
    this.updatedAt = updatedAt || new Date().toISOString()
  }

  static fromData(data) {
    return new User(data)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
