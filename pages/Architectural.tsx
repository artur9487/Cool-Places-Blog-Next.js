/** @format */

import MainContent from '../components/MainContent';
import MainLayout from '../components/MainLayout';
import { gql, request } from 'graphql-request';
import { home_schema } from '../components/globalComponents/globalTypes';
import { GetStaticProps } from 'next';

const Architectural: React.FC<home_schema> = ({
	placesOutput,
	categoriesOutput,
	mostCommentedOutput,
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

export const getStaticProps: GetStaticProps = async (context) => {
	const slug: string = 'Architectural';
	const url: string = process.env.API;

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

	const categoryNodes = await request(url, query2);
	const categoriesArr = categoryNodes.placesSConnection.edges;
	const values = categoriesArr.map((item) => {
		return item.node.category;
	});
	let categoriesOutput = [...new Set(values)];

	let mostCommentedArr = placesOutput.map((item) => {
		console.log(item);
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
		props: {
			placesOutput,
			categoriesOutput,
			mostCommentedOutput,
			mostCommentedArr,
		},
	};
};

export default Architectural;
