import React, { Component } from 'react'
import { Card, CardMedia, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import achievement1 from './achievement_icons/achievement1.png'
import achievement2 from './achievement_icons/achievement2.png'

export class Userinfo extends Component {
    
    render() {
      console.log(this.props.profile)
        return (
            <UserCard p={3}>
                <ProfilePicContainer>
                    <ProfilePic src={this.props.profile.image} alt="Miru Nevesely" />
                </ProfilePicContainer>

                <Name>
                    { this.props.profile.name + ' ' + this.props.profile.surname}
                </Name>

                <Bio>
                    {this.props.profile.dob}
                </Bio>

                <Bio>
                    {this.props.profile.home}
                </Bio>
                
                <Bio>
                    { this.props.profile.bio || "asdafsdajflkas;dfjakls;dfjas;" }
                </Bio>

                {/* <Achievements>
                    <AchievementIcon src={ achievement1 } alt="achievement1" />
                    <AchievementIcon src={ achievement2 } alt="achievement2" />
                </Achievements> */}
                {/* <Bio><a href="https://www.flickr.com/photos/50838842@N06/39585958590">"Jake Bonello"</a><span>by <a href="https://www.flickr.com/photos/50838842@N06">USFWS Headquarters</a></span> is licensed under <a href="https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=html">CC BY 2.0</a><a href="https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=html" target="_blank" rel="noopener noreferrer"></a></Bio> */}
            </UserCard>
        )
    }
}



const UserCard = styled(Card)`
    min-height: 200px;
`;

const ProfilePicContainer = styled.div`
    max-height: 250px;
    overflow: hidden;
`;

const ProfilePic = styled.img`
    object-fit: cover;
    width: 100%;
    opacity: 0.86;
`;

const Name = styled.p`
    padding: 10px;
`;


const Bio = styled.p`
    padding: 10px;
    line-height: 1.4rem;
    text-align: justify;
    color: #aaa;

    & * {
        color: #aaa;
    }
`;

const Achievements = styled.div`
    display: flex;
`;

const AchievementIcon = styled.img`
    display: block;
    flex: 0 0 64px;

    max-width: 64px;
    max-height: 64px;
    margin: auto;
    opacity: 0.7;
    object-fit: contain;
`;

export default Userinfo
