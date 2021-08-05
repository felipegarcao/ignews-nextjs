import { Client } from 'faunadb'


export const fauan = new Client({
  secret: process.env.FAUNADB_KEY
})