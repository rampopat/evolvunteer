import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box'

const RegistrationStep = ({ children }) => {
    return (
        <StepBox >
            <Box>
                { children }
            </Box>
        </StepBox>
    );
};

const StepBox = styled(Box)`
`;

export default RegistrationStep;