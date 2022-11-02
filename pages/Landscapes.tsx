/** @format */

import MainContent from '../components/MainContent';
import MainLayout from '../components/MainLayout';
import { gql, request } from 'graphql-request';
import { GetServerSideProps } from 'next/types';
import { home_schema } from '../components/globalComponents/globalTypes';
import { categoryFetchFunction } from '../components/globalComponents/globalFunctions';

const Landscapes: React.FC<home_schema> = ({
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

export const getStaticProps: GetServerSideProps = async () => {
	const slug: string = 'Landscapes';
	const url: string = process.env.API;

	const output = await categoryFetchFunction(slug, url);

	return {
		props: output
	};
};

export default Landscapes;
