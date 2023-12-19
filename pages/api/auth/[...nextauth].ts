import { NextApiRequest, NextApiResponse } from 'next'

import authOptions from '@/lib/auth/serverside/authOptions'
import { createAuthRouter } from '@/lib/auth/serverside/createAuthRouter'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await createAuthRouter(req, res, authOptions)
}

export default handler
