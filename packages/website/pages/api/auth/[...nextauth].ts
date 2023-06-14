import { NextApiRequest, NextApiResponse } from 'next'

import authOptions from '@pkg/auth/lib/serverside/authOptions'
import { createAuthRouter } from '@pkg/auth/lib/serverside/createAuthRouter'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await createAuthRouter(req, res, authOptions)
}

export default handler
