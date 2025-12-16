import { User } from '../models/userModel.js'
import { randomUUID } from 'node:crypto'

export class UserService {
  constructor(db) {
    this.db = db
  }

  async getAll() {
    return Array.from(this.db.users.values())
  }

  async getById(id) {
    return this.db.users.get(id) || null
  }

  async create(data) {
    const user = User.fromData({
      id: randomUUID(),
      ...data,
    })
    this.db.users.set(user.id, user.toJSON())
    return user.toJSON()
  }

  async update(id, data) {
    const existing = this.db.users.get(id)
    if (!existing) return null

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    }
    this.db.users.set(id, updated)
    return updated
  }

  async delete(id) {
    if (!this.db.users.has(id)) return false
    this.db.users.delete(id)
    return true
  }
}
