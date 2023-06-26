/** @format */

import { Fade } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';

interface fadeWrapperSchema {
	children: JSX.Element;
}

const FadeWrapper: React.FC<fadeWrapperSchema> = ({ children }) => {
	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		setChecked(true);
	}, []);

	return (
		<Fade in={checked} timeout={4000}>
			<Box>{children}</Box>
		</Fade>
	);
};

export default FadeWrapper;
