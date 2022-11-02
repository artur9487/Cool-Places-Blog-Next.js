/** @format */

import { useState } from 'react';
import { Box } from '@mui/material';
import VisibilitySensor from 'react-visibility-sensor';

interface animationComponent {
	children: JSX.Element;
}

const AnimationComp: React.FC<animationComponent> = ({ children }) => {
	const [isVisible, setVisible] = useState<boolean>(false);

	let style: string;
	if (isVisible === true) {
		style = `animation-true`;
	} else {
		style = `animation-false`;
	}

	return (
		<VisibilitySensor
			active={isVisible ? false : true}
			partialVisibility
			onChange={(isVisible2) => {
				setVisible(isVisible2);
			}}>
			<Box className={style}>{children}</Box>
		</VisibilitySensor>
	);
};

export default AnimationComp;
