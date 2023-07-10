/** @format */

import MainContent from '../../components/MainContent';
import MainLayout from '../../components/MainLayout';
import { gql, request } from 'graphql-request';
import {
	categoryNodes_schema,
	categoryResponse_schema,
	home_schema,
	mostCommenteArr_schema,
} from '../../components/globalComponents/globalTypes';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { placeResponse_schema } from '../../components/globalComponents/globalTypes';
import { placesOutput_schema } from '../../components/globalComponents/globalTypes';

const CategoryComponent: React.FC<home_schema> = ({
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

export const getStaticPaths: GetStaticPaths = async () => {
	const url: string = process.env.API;
	const query4: string = gql`
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

		fallback: false, // false or 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug: string[] | string = context.params.slug;
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

	interface variables_schema {
		slug: string | string[];
	}

	const variabless: variables_schema = { slug };

	const response: placeResponse_schema = await request(
		url,
		query,
		variabless
	);
	const placesOutput: placesOutput_schema[] =
		response.placesSConnection.edges;

	const query2: string = gql`
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
	const categoryResponse: categoryResponse_schema = await request(
		url,
		query2
	);
	const categoryNodes: categoryNodes_schema[] =
		categoryResponse.placesSConnection.edges;

	const categorieArr: string[] = categoryNodes.map((item) => {
		return item.node.category;
	});

	let categoriesOutput: string[] = [...new Set(categorieArr)];

	let mostCommentedArr = categoryNodes.map((item) => {
		return {
			place: item.node.id,
			count: item.node.commentS.length,
		};
	});

	let mostCommentedOutput: string[] = [];

	const fetchMostCommented: () => Promise<void> = async () => {
		let commentCount: number = -1;
		let commentedPlace: string = '';

		mostCommentedArr.map((item) => {
			if (commentCount < item.count) {
				commentCount = item.count;
				commentedPlace = item.place;
			}
		});

		const commentedPlaceIndx: number = mostCommentedArr.findIndex(
			(item) => item.place === commentedPlace
		);
		mostCommentedArr.splice(commentedPlaceIndx, 1);

		const query3: string = gql`
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

	await fetchMostCommented();
	if (mostCommentedArr.length > 0) {
		await fetchMostCommented();
		if (mostCommentedArr.length > 0) {
			await fetchMostCommented();
		}
	}

	return {
		props: { placesOutput, categoriesOutput, mostCommentedOutput },
	};
};

export default CategoryComponent;
