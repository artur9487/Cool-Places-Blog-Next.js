/** @format */

import MainContent from '../components/MainContent';
import { request, gql } from 'graphql-request';
import React from 'react';
import MainLayout from '../components/MainLayout';
import {
	home_schema,
	placeResponse_schema,
	placesOutput_schema,
	categoryResponse_schema,
	categoryNodes_schema,
	mostCommenteArr_schema,
	mostCommentedVaules_schema,
	mostCommentedResponse_schema
} from '../components/globalComponents/globalTypes';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['Alumni Sans', 'sans-serif'].join(',')
	}
});

const Home = ({ placesOutput, categoriesOutput, mostCommentedOutput }) => {
	return (
		<ThemeProvider theme={theme}>
			<MainLayout
				placesOutput={placesOutput}
				categoriesOutput={categoriesOutput}
				mostCommentedOutput={mostCommentedOutput}
				type='all'>
				<MainContent />
			</MainLayout>
		</ThemeProvider>
	);
};

export const getServerSideProps = async () => {
	const url = process.env.API;
	const query = gql`
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

	const placesResponse = await request(url, query);

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

	const categoryResponse = await request(url, query2);

	const categoryNodes = categoryResponse.placesSConnection.edges;
	const categoriesArr = categoryNodes.map((item) => {
		return item.node.category;
	});
	let categoriesOutput = [...new Set(categoriesArr)];

	let mostCommentedArr = categoryNodes.map((item) => {
		return { place: item.node.id, count: item.node.commentS.length };
	});

	let mostCommentedOutput = [];

	const fetchMostCommented = async () => {
		let commentCount = 0;
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
		const variables = { commentedPlace };

		const mostCommentedResponse = await request(url, query3, variables);

		const mostCommentedVaules = mostCommentedResponse.placesSConnection.edges;
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
