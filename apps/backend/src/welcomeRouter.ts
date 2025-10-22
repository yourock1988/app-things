import { Router } from 'express'

const welcomeRouter = Router()

welcomeRouter.get('/welcome', (_, res) => res.status(200).send('Welcome!!'))

export default welcomeRouter
