import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

import bcrypt from 'bcrypt'

class TokenController {
  async store (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        errors: ['Credenciais invalidas']
      })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({
        errors: ['Usuario não existe']
      })
    }

    if (!(await bcrypt.compare(password, user.hashPassword))) {
      return res.status(400).json({
        errors: ['senha invalida']
      })
    }

    const { id } = user

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    })

    return res.json({ token })
  }
}

export default new TokenController()
