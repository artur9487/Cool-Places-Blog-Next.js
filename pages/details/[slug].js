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
import { Context } from '../../ContextComp';
import { useMediaQuery } from '@mui/material';
import styles from '/styles/Home.module.scss';

const Details = ({ result, result2, result3 }) => {
	const matches = useMediaQuery('(max-width:900px)');
	const matches3 = useMediaQuery('(max-width:600px)');
	const [email, setEmail] = useState('');
	const [opinion, setOpinion] = useState('');
	const [name, setName] = useState('');
	const [succesMsg, setSuccesMsg] = useState(false);
	const initialErr = {
		name: false,
		email: false,
		opinion: false
	};

	if (succesMsg === true) {
		setTimeout(() => {
			setSuccesMsg(false);
		}, 3000);
	}

	const [errorsy, setErrorsy] = useState(initialErr);

	const { description, localization, photo, createdAt, chips, placeName, id } =
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

	const handleSubmit = async () => {
		if (handleErrors() > 0) {
			return;
		}

		const obj = { name, email, opinion, id };

		const result = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(obj)
		});

		setEmail('');
		setOpinion('');
		setName('');
		setSuccesMsg(true);
		return result.json();
	};
	return (
		<>
			<Context.Provider value={{ matches, matches3 }}>
				<Layout>
					<Box sx={{ p: !matches3 ? 6 : 2 }} className={styles.fade600}>
						<Stack spacing={4} direction='column'>
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
										succesMsg={succesMsg}
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
			</Context.Provider>
		</>
	);
};

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
