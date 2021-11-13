import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import cache from '../server/cache'
const prisma = new PrismaClient()
const separator = ':'
const ttl = 50

export default {
  async getAll(req: Request<{}, {}, {}>, res: Response) {
    try {
      const clienteCache = await cache.get('users')
      if (!clienteCache) {
        let user = await prisma.user.findMany()
        cache.set('users', JSON.stringify(user), 'EX', ttl)
        return res.status(200).json(user)
      }
      return res.status(200).json(JSON.parse(clienteCache))
    } catch (error) {
      return res.status(400).json({ error: 'Any user Found!!!' })
    }
  },

  async getById(req: Request<{ user_id: number }, {}, {}>, res: Response) {

  },

  async store(req: Request<{}, {}, {}>, res: Response) {

  }
}