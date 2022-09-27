import React, {useState, useEffect} from 'react'
import * as S from './styled';
import Header from '../../components/Header';

import Api from '../../../api';

import Camera from '../../assets/camera.svg';

export default ({ route }) => {    
    let idAnnouncement = route.params.id;
    const [announcement, setAnnouncement] = useState([]);     

    useEffect(()=> {
        const getAnnouncement = async () => {
            setAnnouncement([]);
            await Api.get(`/announcement/${idAnnouncement}`).then((res) => {
                console.log(res.data.data)
                setAnnouncement(res.data.data);
            });
        }  
        getAnnouncement();
    }, [idAnnouncement]);

    return (
        <>
       <S.Container>
           <Header title />
           <S.ImageArea>
                <S.Image source={{uri:announcement.images}} />
           </S.ImageArea>
           <S.InfoArea>
               <S.Price>R$ {announcement.price}</S.Price>               
               <S.Title>{announcement.title}</S.Title>
               <S.CreatedAt>Published in {announcement.created_at}</S.CreatedAt>
           </S.InfoArea>

           <S.Separador></S.Separador>

           <S.DescriptionArea>
               <S.DescriptionTitle>Description</S.DescriptionTitle>
               <S.DescriptionText>{announcement.description}</S.DescriptionText>
               <S.DescriptionMessageButton>
                   <S.DescriptionMessageButtonText>See full description</S.DescriptionMessageButtonText>
               </S.DescriptionMessageButton>
           </S.DescriptionArea>

           <S.Separador></S.Separador>

           
           <S.LocationArea>
               <S.LocationTitle>Location</S.LocationTitle>
               <S.Location>
                   <S.LeftLocation>
                       <S.CepTitle>Zip code</S.CepTitle>
                       <S.CityTitle>City</S.CityTitle>
                   </S.LeftLocation>
                   <S.RightLocation>
                       <S.CepText>08412030</S.CepText>
                       <S.CityText>{announcement.city}</S.CityText>
                   </S.RightLocation>
               </S.Location>
           </S.LocationArea>

           <S.Separador></S.Separador>

            <S.UserAnnouncement>
                <S.UserTitle>Advertiser</S.UserTitle>
                <S.UserAnnouncementArea>
                    <S.UserName>Matheus Pereira</S.UserName>
                    <S.UserCreatedAt>At All in one since March 2018</S.UserCreatedAt>
                    <S.UserLastAcess>Last accessed on 10/09/2020</S.UserLastAcess>
                    <S.Separador></S.Separador>
                    <S.UserFullProfileButton>
                        <S.UserFullProfileText>View full profile</S.UserFullProfileText>
                    </S.UserFullProfileButton>
                </S.UserAnnouncementArea>
            </S.UserAnnouncement>         

       </S.Container>
       <S.ButtonAdd>
                <Camera width={24} height={24} fill="#FFF" /> 
                <S.ButtonAddText>Send Message</S.ButtonAddText>
            </S.ButtonAdd>
       </>
    )
}
