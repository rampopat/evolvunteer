import React, { Component } from 'react'
import { Box, Card, Button } from '@material-ui/core'
import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'

const ExperienceTile = ({ skill, level, description }) => {
    return (
        <ExperienceCard>
            <Wrapper>
                <Title>
                    {skill || "Cooking"}
                </Title>

                {/* <Description>
                    {description || "Insert description"}
                </Description> */}

                <ExperienceProgress>
                    <ExperienceInfo>{level}/100 experience until next level</ExperienceInfo>
                    <ExperienceBar variant="determinate"
                                    classes={{ root: 'root' }}
                                    value={level === undefined ? 68 : level} />
                </ExperienceProgress>

                {/* <BrowseButton variant="contained" color="primary">Browse</BrowseButton> */}
            </Wrapper>
        </ExperienceCard>
    );
}

const ExperienceCard = styled(Card)`
    max-height: 70px;
    padding: 10px 0;

    transition: all 0.2s ease-in-out !important;

    :hover {

        transform: scale(1.05);
    }
`;

const Wrapper = styled(Box)`
    margin: 0;
    padding: 0;
`;

const Title = styled.h3`
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
`;

const Description = styled.p`
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
    color: #aaa;
`;

const ExperienceProgress = styled.div`
    margin-top: 0px;
    padding: 10px 5px;
`;

const ExperienceBar = styled(LinearProgress)`
    margin-top: 0px;
    margin-bottom: 0px;
    &.root {
        width: 100%;
        height: 10px;
    }
`;

const ExperienceInfo = styled.p`
    margin-top: -8px;
    margin-bottom: 0;
    text-align: right;
    color: #aaa;
    font-size: 0.8rem
`;

const BrowseButton = styled(Button)`
   display: block;
   margin-left: auto;
   margin-top: 6px;
   margin-bottom: 10px;
   margin-right: 6px;
`;

export default ExperienceTile