// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {GraphQLClient, gql} from "graphql-request";

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res) {
  const {nome, email, slug, comment} = req.body
  const graphQLClient = new GraphQLClient(graphQLAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation CreateComment($nome: String!, $email: String!, $comentario: String!, $slug: String!) {
      createComentario(data: {nome: $nome, email: $email, comentario: $comentario, post: {connect: {slug: $slug}}}) {id}
    }
  `
  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}
