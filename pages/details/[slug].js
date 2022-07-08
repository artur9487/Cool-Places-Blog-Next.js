/** @format */

import { gql, request } from 'graphql-request';
import Layout from '../../components/Layout';
import { Stack, Box } from '@mui/material';
import { useState } from 'react';
import MainDetailComp from '../../components/DetailComp/MainDetailComp';
import GoogleDetailComp from '../../components/DetailComp/GoogleDetailComp';
import SimiliarDetailComp from '../../components/DetailComp/SimiliarDetailComp';
import CommentForm from '../../components/DetailComp/CommentForm';
import AllComments from '../../components/DetailComp/AllComments';
import AnimationComp from '../../components/AnimationComp';
import { handleSubmit } from '../../public/fetchek';
import DetailCard from '../../components/DetailComp/DetailCard';

const Details = ({ result, result2, result3 }) => {
	const [email, setEmail] = useState('');
	const [opinion, setOpinion] = useState('');
	const [name, setName] = useState('');
	const initialErr = {
		name: false,
		email: false,
		opinion: false
	};
	const [errorsy, setErrorsy] = useState(initialErr);

	const { description, localization, photo, createdAt, chips, placeName } =
		result[0].node;

	const { latitude, longitude } = localization;

	const coords = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&amp&output=embed`;

	const handleErrors = () => {
		let errorNum = 0;
		let errors = { ...initialErr };

		if (!name) {
			errors = { ...errors, name: true };
			errorNum++;
		}
		if (!email) {
			errors = { ...errors, email: true };
			errorNum++;
		}
		if (!opinion) {
			errors = { ...errors, opinion: true };
			errorNum++;
		}
		setErrorsy(errors);
		return errorNum;
	};

	/*const handleSubmit = async () => {
		if (handleErrors() > 0) {
			return;
		}

		const obj = { name, email, opinion };
		const result = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ obj })
		});
		setEmail('');
		setOpinion('');
		setName('');
	};*/
	return (
		<>
			<>
				<Layout>
					<Box sx={{ p: 6 }}>
						<Stack spacing={4} sx={{ maxWidth: '70hv' }} direction='column'>
							<AnimationComp>
								<MainDetailComp
									photo={photo}
									createdAt={createdAt}
									description={description}
									placeName={placeName}
									chips={chips}
								/>
							</AnimationComp>
							<AnimationComp>
								<DetailCard title='Localization:'>
									<GoogleDetailComp coords={coords} />
								</DetailCard>
							</AnimationComp>
							<AnimationComp>
								<DetailCard title='Similiar Posts:'>
									<SimiliarDetailComp result2={result2} />
								</DetailCard>
							</AnimationComp>
							<AnimationComp>
								<DetailCard title='Add a Comment:'>
									<CommentForm
										errorsy={errorsy}
										name={name}
										setName={setName}
										email={email}
										setEmail={setEmail}
										opinion={opinion}
										setOpinion={setOpinion}
										handleSubmitt={handleSubmit}
									/>
								</DetailCard>
							</AnimationComp>
							<AnimationComp>
								<DetailCard title='All Comments:'>
									<AllComments result3={result3} />
								</DetailCard>
							</AnimationComp>
						</Stack>
					</Box>
				</Layout>
			</>
		</>
	);
};

/*export async function getStaticPaths() {
	const url = process.env.API;
	const query3 = gql`
		query MyQuery {
			placesSConnection {
				edges {
					node {
						id
					}
				}
			}
		}
	`;
	const proResult3 = await request(url, query3);
	const result3 = proResult3.placesSConnection.edges;

	return {
		paths: result3.map((item) => {
			return { params: { slug: item.node.id } };
		}),

		fallback: true // false or 'blocking'
	};
}*/

export async function getServerSideProps(context) {
	const slug = context.params.slug;
	const url = process.env.API;

	const query = gql`
		query ($slug: ID!) {
			placesSConnection(where: { id: $slug }) {
				edges {
					node {
						description
						id
						localization {
							latitude
							longitude
						}
						photo {
							url
						}
						placeName
						category
						createdAt
						chips
					}
				}
			}
		}
	`;

	const variables = { slug };

	const proResult = await request(url, query, variables);
	const result = proResult.placesSConnection.edges;
	const { category, id } = result[0].node;

	const query2 = gql`
		query ($category: String!, $id: ID!) {
			placesSConnection(first: 4, where: { category: $category }) {
				edges {
					node {
						photo {
							url
						}
						placeName
						createdAt
						id
					}
				}
			}
			commentSConnection(where: { places: { id: $id } }) {
				edges {
					node {
						author
						comment
						email
						createdAt
						places {
							id
						}
					}
				}
			}
		}
	`;

	const variables2 = { category, id };

	const proResult2 = await request(url, query2, variables2);
	const result2 = proResult2.placesSConnection.edges;
	const result3 = proResult2.commentSConnection.edges;

	return {
		props: { result, result2, result3 }
	};
}

export default Details;
