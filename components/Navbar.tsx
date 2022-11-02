/** @format */

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

const Navbar: React.FC = () => {
	return (
		<>
			<Box>
				<Stack
					sx={{
						bgcolor: 'rgba(191, 191, 191,0.6)',
						height: 100,
						px: 0
					}}
					direction='row'
					justifyContent='center'
					alignItems='center'>
					<Box>
						<Typography sx={{ fontFamily: 'Dancing Script' }} variant='h3'>
							Cool Places Blog
						</Typography>
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default Navbar;
