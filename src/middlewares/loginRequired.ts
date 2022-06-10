import jwt from 'jsonwebtoken'
import User from '../schemas/User'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const dados = jwt.verify(authHeader, process.env.TOKEN_SECRET)

    const { id, email } = dados

    const user = await User.findOne({
      where: {
        id,
        email
      }
    })

    if (!user) {
      return res.status(401).json({
        errors: ['User Invalid']
      })
    }

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
