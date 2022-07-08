/** @format */

import { useState } from 'react';
import { Box } from '@mui/material';
import VisibilitySensor from 'react-visibility-sensor';

const AnimationComp = ({ children }) => {
	const [isVisible, setVisible] = useState(false);

	let styl;
	if (isVisible === true) {
		styl = `animation-true`;
	} else {
		styl = `animation-false`;
	}

	return (
		<VisibilitySensor
			active={isVisible ? false : true}
			partialVisibility
			onChange={(isVisible2) => {
				setVisible(isVisible2);
			}}>
			<Box className={styl}>{children}</Box>
		</VisibilitySensor>
	);
};

export default AnimationComp;
