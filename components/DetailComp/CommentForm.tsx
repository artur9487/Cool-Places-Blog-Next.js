/** @format */

import { TextField, Box, Stack, Typography } from '@mui/material';
import styles from '/styles/Home.module.scss';
import FadeWrapper from '../FadeWrapper';
import { Context } from '../../ContextComp';
import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	useContext,
} from 'react';

const ErrorComp = (title) => {
	return (
		<FadeWrapper>
			<Typography
				sx={{ fontFamily: 'Playfair Display', color: 'red' }}>
				{title}
			</Typography>
		</FadeWrapper>
	);
};

const SuccesComp = () => {
	return (
		<FadeWrapper>
			<Typography
				sx={{ fontFamily: 'Playfair Display', color: 'green' }}>
				Comment succesfuly added
			</Typography>
		</FadeWrapper>
	);
};

interface CommentForm_schema {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	opinion: string;
	setOpinion: Dispatch<SetStateAction<string>>;
	handleSubmitt: MouseEventHandler<HTMLButtonElement>;
	errorsy: {
		name: boolean;
		email: boolean;
		opinion: boolean;
	};
	succesMsg: string;
}

const CommentForm: React.FC<CommentForm_schema> = ({
	name,
	setName,
	email,
	setEmail,
	opinion,
	setOpinion,
	handleSubmitt,
	errorsy,
	succesMsg,
}) => {
	const { maxWidth600 } = useContext(Context);
	const TextComp = ({ title }) => {
		return (
			<Typography
				sx={{
					fontFamily: 'Playfair Display',
					fontStyle: 'italic',
					fontSize: !maxWidth600 ? 18 : 16,
				}}>
				{title}
			</Typography>
		);
	};

	return (
		<Stack direction='column' spacing={4}>
			<Box sx={{ width: '100%' }}>
				<Stack direction='row' sx={{ width: '100%' }} spacing={4}>
					<Box sx={{ width: '50%' }}>
						<TextComp title='Your Name:' />
					</Box>
					<Box sx={{ width: '50%' }}>
						<TextComp title='Your Email:' />
					</Box>
				</Stack>
				<Stack direction='row' sx={{ width: '100%' }} spacing={4}>
					<TextField
						error={errorsy.name ? true : false}
						color='warning'
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						sx={{ bgcolor: 'rgb(240,240,240)', width: '50%' }}
					/>
					<TextField
						error={errorsy.email ? true : false}
						color='warning'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						sx={{ bgcolor: 'rgb(240,240,240)', width: '50%' }}
					/>
				</Stack>
				<Stack direction='row' sx={{ width: '100%' }} spacing={4}>
					<Box sx={{ width: '50%' }}>
						{errorsy.name && <ErrorComp title='Your Name:' />}
					</Box>
					<Box sx={{ width: '50%' }}>
						{errorsy.email && <ErrorComp title='Your Email:' />}
					</Box>
				</Stack>
			</Box>
			<Box sx={{ width: '100%' }}>
				<TextComp title='Your Comment:' />
				<TextField
					error={errorsy.opinion ? true : false}
					color='warning'
					className={styles.textField}
					required
					onChange={(e) => setOpinion(e.target.value)}
					value={opinion}
					multiline
					sx={{
						bgcolor: 'rgb(240,240,240)',
						width: '100%',
					}}
					rows={4}
				/>
				{errorsy.opinion && <ErrorComp title='Incorect Value' />}
			</Box>
			<Stack
				direction='row'
				justifyContent='center'
				sx={{ width: '100%' }}>
				<button className={styles.button} onClick={handleSubmitt}>
					<Typography sx={{ fontFamily: 'Playfair Display' }}>
						Add Comment
					</Typography>
				</button>
			</Stack>
			<Stack
				direction='row'
				justifyContent='center'
				sx={{ width: '100%' }}>
				<Box sx={{ margin: 'auto' }}>
					{succesMsg ? SuccesComp() : null}
				</Box>
			</Stack>
		</Stack>
	);
};

export default CommentForm;
