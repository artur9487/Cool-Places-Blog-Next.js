/** @format */

import { gql, request } from 'graphql-request';

export const categoryFetchFunction: (
	slug: any,
	url: any
) => Promise<{
	placesOutput: any;
	categoriesOutput: unknown[];
	mostCommentedOutput: any[];
}> = async (slug, url) => {
	const query: string = gql`
		query ($slug: String!) {
			placesSConnection(where: { category: $slug }) {
				edges {
					node {
						id
						photo {
							url
						}
						placeName
						createdAt
						commentS {
							id
						}
					}
				}
			}
		}
	`;

	const variabless = { slug };

	const placesResponse = await request(url, query, variabless);

	const placesOutput = placesResponse.placesSConnection.edges;

	const query2 = gql`
		query PlaceQuery {
			placesSConnection {
				edges {
					node {
						category
						id
					}
				}
			}
		}
	`;
	const categoryNodes = await request(url, query2);
	const categoryNodes2 = categoryNodes.placesSConnection.edges;
	const values = categoryNodes2.map((item) => {
		return item.node.category;
	});
	let categoriesOutput = [...new Set(values)];

	let mostCommentedArr = placesOutput.map((item) => {
		return { place: item.node.id, count: item.node.commentS.length };
	});

	let mostCommentedOutput = [];

	const fetchMostCommented = async () => {
		let commentCount = -1;
		let commentedPlace = '';

		mostCommentedArr.map((item) => {
			if (commentCount < item.count) {
				commentCount = item.count;
				commentedPlace = item.place;
			}
		});

		const commentedPlaceIndx = mostCommentedArr.findIndex(
			(item) => item.place === commentedPlace
		);
		mostCommentedArr.splice(commentedPlaceIndx, 1);

		const query3 = gql`
			query PlaceQuery($commentedPlace: ID!, $slug: String!) {
				placesSConnection(
					where: { id: $commentedPlace, category: $slug }
				) {
					edges {
						node {
							placeName
							createdAt
							id
							photo {
								url
							}
						}
					}
				}
			}
		`;
		const variables = { commentedPlace, slug };
		const mostCommentedResponse = await request(
			url,
			query3,
			variables
		);
		const mostCommentedVaules =
			mostCommentedResponse.placesSConnection.edges;
		mostCommentedOutput.push({
			...mostCommentedVaules,
			count: commentCount,
		});
	};

	for (let i = 0; i <= 2; i++) {
		if (mostCommentedArr.length > i) {
			await fetchMostCommented();
		}
	}
	return {
		placesOutput,
		categoriesOutput,
		mostCommentedOutput,
		placesResponse,
	};
};
