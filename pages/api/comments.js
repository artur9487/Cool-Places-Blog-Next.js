/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql, request } from 'graphql-request';

const TOKEN = proccess.env.TOKEN;

const API = proccess.env.API;

/*export default async function handler(req, res) {
	const graphQLClient = new GraphQLClient(API, {
		headers: {
			authorization: TOKEN
		}
	});

	const query = gql`
		mutation createCommentss(
			$name: String!
			$email: String!
			$opinion: String!
		) {
			createComments(data: { author: $name, email: $email, comment: $opinion })
		}
	`;
	const result = await graphQLClient.request(query, req.body);
	return res.status(200).send(result);
}
*/
