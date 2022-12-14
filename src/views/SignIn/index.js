import React, { useState } from 'react'
import * as S from './styled';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../../api';

import SignInput from '../../components/SignInput';

export default () => {
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignMessageClick = () => {
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });
    }

    const handleLogin = async () => {
        if(emailField != '' && passwordField != '') {
            await Api.post('/auth/login', {
                email: emailField,
                password: passwordField
            }).then((res) => {
                if(res.data.token) {
                    AsyncStorage.setItem('token', res.data.token);
                    navigation.reset({
                        routes:[{name: 'MainDrawer'}]
                    });
                } else {
                    alert(res.data.error);
                } 
            })
        }
    }

    return (
        <S.Container>
            <S.InputArea>
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
                <S.ButtonLogin>
                    <S.ButtonLoginText onPress={handleLogin}>LOGIN</S.ButtonLoginText>
                </S.ButtonLogin>
                <S.SignMessageButton onPress={handleSignMessageClick}>
                    <S.SignMessageButtonText>Not have an account yet?</S.SignMessageButtonText>
                    <S.SignMessageButtonTextBold>Register now</S.SignMessageButtonTextBold>
                </S.SignMessageButton>
            </S.InputArea>
        </S.Container>
    )
}
