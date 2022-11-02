/** @format */

import { Container } from '@mui/material';

interface layoutSchema {
	children: JSX.Element;
}

const Layout: React.FC<layoutSchema> = ({ children }) => {
	return <Container sx={{ mt: 4 }}>{children}</Container>;
};

export default Layout;
