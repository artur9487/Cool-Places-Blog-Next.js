/** @format */

import MainContent from '../components/MainContent';
import { request, gql } from 'graphql-request';
import React from 'react';
import MainLayout from '../components/MainLayout';

const Home = ({ result, result2, result3 }) => {
	return (
		<MainLayout result={result} result2={result2} result3={result3} type='all'>
			<MainContent />
		</MainLayout>
	);
};

export async function getStaticProps() {
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

	const proResult = await request(url, query);
	const result = proResult.placesSConnection.edges;

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
	const proResult3 = await request(url, query2);
	const proResult4 = proResult3.placesSConnection.edges;
	const values = proResult4.map((item) => {
		return item.node.category;
	});
	let result2 = [...new Set(values)];

	let values2 = proResult4.map((item) => {
		return { place: item.node.id, count: item.node.commentS.length };
	});

	let result3 = [];

	const fetch1 = async () => {
		let temp1 = 0;
		let place1 = '';

		values2.map((item) => {
			if (temp1 < item.count) {
				temp1 = item.count;
				place1 = item.place;
			}
		});

		const indx1 = values2.findIndex((item) => item.place === place1);
		values2.splice(indx1, 1);

		const query3 = gql`
			query PlaceQuery($place1: ID!) {
				placesSConnection(where: { id: $place1 }) {
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
		const variables = { place1 };
		const proResult5 = await request(url, query3, variables);
		const proResult6 = proResult5.placesSConnection.edges;
		result3.push({ ...proResult6, count: temp1 });
	};

	await fetch1();
	if (values2.length > 0) {
		await fetch1();
		if (values2.length > 0) {
			await fetch1();
		}
	}

	return {
		props: { result, result2, result3 }
	};
}
export default Home;
