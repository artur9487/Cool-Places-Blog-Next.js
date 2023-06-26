/** @format */

import MainContent from '../components/MainContent';
import { request, gql } from 'graphql-request';
import React from 'react';
import MainLayout from '../components/MainLayout';
import { GetServerSideProps } from 'next/types';
import {
	home_schema,
	placeResponse_schema,
	categoryResponse_schema,
	categoryNodes_schema,
	mostCommenteArr_schema,
	mostCommentedVaules_schema,
	mostCommentedResponse_schema
} from '../components/globalComponents/globalTypes';

const Home: React.FC<home_schema> = ({
	placesOutput,
	categoriesOutput,
	mostCommentedOutput
}) => {
	return (
		<MainLayout
			placesOutput={placesOutput}
			categoriesOutput={categoriesOutput}
			mostCommentedOutput={mostCommentedOutput}
			type='all'>
			<MainContent />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const url: string = process.env.API;
	const query: string = gql`
		query PlaceQuery {
			placesSConnection(first: 2, orderBy: createdAt_ASC) {
				edges {
					node {
						description
						id
						photo {
							url
						}
						placeName
						category
						createdAt
					}
				}
			}
		}
	`;

	const placesResponse: placeResponse_schema = await request(url, query);

	const placesOutput = placesResponse.placesSConnection.edges;

	const query2 = gql`
		query PlaceQuery {
			placesSConnection {
				edges {
					node {
						category
						id
						commentS {
							id
						}
					}
				}
			}
		}
	`;

	const categoryResponse: categoryResponse_schema = await request(url, query2);

	const categoryNodes: categoryNodes_schema[] =
		categoryResponse.placesSConnection.edges;

	const categoriesArr: string[] = categoryNodes.map((item) => {
		return item.node.category;
	});

	let categoriesOutput: string[] = [...new Set(categoriesArr)];

	let mostCommentedArr: mostCommenteArr_schema[] = categoryNodes.map((item) => {
		return { place: item.node.id, count: item.node.commentS.length };
	});

	let mostCommentedOutput: any = [];

	const fetchMostCommented: () => Promise<void> = async () => {
		let commentCount: number = 0;
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
			query PlaceQuery($commentedPlace: ID!) {
				placesSConnection(where: { id: $commentedPlace }) {
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
		const variables: { commentedPlace: string } = { commentedPlace };

		const mostCommentedResponse: mostCommentedResponse_schema = await request(
			url,
			query3,
			variables
		);

		const mostCommentedVaules: mostCommentedVaules_schema[] =
			mostCommentedResponse.placesSConnection.edges;

		mostCommentedOutput.push({
			...mostCommentedVaules,
			count: commentCount
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
			mostCommentedOutput
		}
	};
};
export default Home;
