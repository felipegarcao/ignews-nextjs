import {  NextApiRequest, NextApiResponse} from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);
  

  const users = [
    {id: 1, name: 'Luis Felipe'},
    {id: 2, name: 'Roberto'},
    {id: 3, name: 'Maria Helena'}
  ]

  return response.json(users);
}