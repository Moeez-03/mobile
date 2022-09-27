import React, { useState } from 'react'
import * as S from './styled';
import { useNavigation } from '@react-navigation/native';

import Api from '../../../api';

import SignInput from '../../components/SignInput';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    const navigation = useNavigation();
    const [phoneField, setPhoneField] = useState('');
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignMessageClick = () => {
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    const handleSignClick = async () => {
        if(nameField != '' && phoneField != '' && emailField != '' && passwordField != '') {
            await Api.post('/user', {
                name:nameField,
                phone:phoneField,
                email:emailField,
                password:passwordField
            }).then(async function (res) {
                console.log(res.data.token)
                if(res.data.token) {
                    await AsyncStorage.setItem('token', res.data.token);

                    navigation.reset({
                        routes:[{name:'MainDrawer'}]
                    });
                } else {
                    alert(res.data.error);
                }       
            });
        } else {
            alert("Fill in all fields!");
        }
    }

    return (
        <S.Container>
            <S.InputArea>
                
               <SignInput
                    placeholder="Type your name"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />

                <SignInput
                    placeholder="Enter Your Phone"
                    value={phoneField}
                    onChangeText={t=>setPhoneField(t)}
                />

                <SignInput
                    placeholder="Type your e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                
                <SignInput
                    placeholder="Type your password"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
                <S.ButtonLogin onPress={handleSignClick}>
                    <S.ButtonLoginText>register</S.ButtonLoginText>
                </S.ButtonLogin>
                <S.SignMessageButton onPress={handleSignMessageClick}>
                    <S.SignMessageButtonText>Already have an account?</S.SignMessageButtonText>
                    <S.SignMessageButtonTextBold>login now</S.SignMessageButtonTextBold>
                </S.SignMessageButton>
            </S.InputArea>
        </S.Container>
    )
}
