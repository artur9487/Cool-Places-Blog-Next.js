/** @format */

import { Context } from '../../ContextComp';
import React, { useContext } from 'react';

interface googleDetailCompSchema {
	coords: string;
}

const GoogleDetailComp: React.FC<googleDetailCompSchema> = ({ coords }) => {
	const { maxWidth600 } = useContext(Context);
	return (
		<>
			<iframe
				src={coords}
				width='100%'
				height={!maxWidth600 ? 400 : 300}
				loading='lazy'></iframe>
		</>
	);
};

export default GoogleDetailComp;
