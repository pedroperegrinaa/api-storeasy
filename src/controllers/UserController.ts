import { Request, Response } from 'express'
import { InvalidParamError } from '../errors'
import bcrypt from 'bcrypt'

import { badRequest } from '../helpers/http-helper'

import User from '../schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json(badRequest(new InvalidParamError('Nome, email e password não podem ser vazios')))
    }
    const hashPassword = await bcrypt.hash(password, 8)

    if (await User.findOne({ email })) {
      return res.json(badRequest(new InvalidParamError('Usuário já cadastrado')))
    }

    try {
      const user = await User.create({ name, email, hashPassword })

      return res.json(user)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    if (!id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    try {
      let user
      if (!(user = await User.findById(id))) {
        return res.json(badRequest(new InvalidParamError('Usuário não encontrado')))
      }

      return res.json(user)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    if (!id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    const { name, email } = req.body

    if (!name) {
      return res.json(badRequest(new InvalidParamError('Nome não informado')))
    }

    try {
      let user
      if (!(user = await User.findByIdAndUpdate(id, { name, email }, { new: true }))) {
        return res.json(badRequest(new InvalidParamError('Usuário não encontrado')))
      }

      return res.json(user)
    } catch (error) {
      return res.json(badRequest(new InvalidParamError(error.message)))
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    if (!id) {
      return res.json(badRequest(new InvalidParamError('Id não informado')))
    }

    await User.findByIdAndDelete(id)

    return res.json({ message: 'Usuário deletado com sucesso' })
  }

  private async verifyID (id: string): Promise<boolean> {
    const user = await User.findById(id)

    return !!user
  }
}

export default new UserController()
