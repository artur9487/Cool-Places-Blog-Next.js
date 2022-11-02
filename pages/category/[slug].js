/** @format */

import MainContent from '../../components/MainContent';
import MainLayout from '../../components/MainLayout';
import { gql, request } from 'graphql-request';

const CategoryComponent = ({
	placesOutput,
	categoriesOutput,
	mostCommentedOutput
}) => {
	return (
		<MainLayout
			placesOutput={placesOutput}
			categoriesOutput={categoriesOutput}
			mostCommentedOutput={mostCommentedOutput}
			type='category'>
			<MainContent />
		</MainLayout>
	);
};

export async function getStaticPaths() {
	const url = process.env.API;
	const query4 = gql`
		query MyQuery {
			placesSConnection {
				edges {
					node {
						category
					}
				}
			}
		}
	`;
	const proResult7 = await request(url, query4);
	const result4 = proResult7.placesSConnection.edges;

	return {
		paths: result4.map((item) => {
			return { params: { slug: item.node.category } };
		}),

		fallback: false // false or 'blocking'
	};
}

export async function getStaticProps(context) {
	const slug = context.params.slug;
	const url = process.env.API;

	const query = gql`
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

	const response = await request(url, query, variabless);
	const placesOutput = response.placesSConnection.edges;

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
	const proResult3 = await request(url, query2);
	const proResult4 = proResult3.placesSConnection.edges;
	const values = proResult4.map((item) => {
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
				placesSConnection(where: { id: $commentedPlace, category: $slug }) {
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
		const mostCommentedResponse = await request(url, query3, variables);
		const mostCommentedVaules = mostCommentedResponse.placesSConnection.edges;
		mostCommentedOutput.push({ ...mostCommentedVaules, count: commentCount });
	};

	await fetchMostCommented();
	if (mostCommentedArr.length > 0) {
		await fetchMostCommented();
		if (mostCommentedArr.length > 0) {
			await fetchMostCommented();
		}
	}

	return {
		props: { placesOutput, categoriesOutput, mostCommentedOutput }
	};
}

export default CategoryComponent;
