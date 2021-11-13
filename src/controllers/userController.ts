import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import cache from '../server/cache'
// import User from '../models/User'
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

  async getById(req: Request<{user_id: string}, {}, {}>, res: Response) {
    const user_id = req.params
    try {
      const clienteCache = await cache.get('user' + separator + user_id)
      if (!clienteCache) {
        let user = await prisma.user.findFirst({
          //@ts-ignore
          where: { uuid: user_id }
        })
        cache.set('user' + separator + user_id, JSON.stringify(user), 'EX', ttl)
        return res.status(200).json(user)
      }
      return res.status(200).json(JSON.parse(clienteCache))
    } catch (error) {
      return res.status(400).json({ error: 'Any user Found!!!' })
    }
  },

  async store(req: Request<{}, {}, {
    name: string, email: string, password: string, rg: string, cpf: string, sexo: string
  }>, res: Response) {
    const { name, email, password, rg, cpf, sexo } = req.body
    try {
      let user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
          rg: rg,
          cpf: cpf,
          sexo: sexo
        }
      })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: 'error to create a new user' })
    }
  },

  async deleteUser(req: Request<{user_id: string}, {}, {}>, res: Response) {
    const user_id = req.params
    try {
      let deleteUser = await prisma.user.delete({
        //@ts-ignore
        where: { uuid: user_id }
      })
      return res.status(201).json({message: 'User deleted!!!'})
    } catch (error) {
      return res.status(400).json({ error: 'error to delete user' })
    }
  },
}