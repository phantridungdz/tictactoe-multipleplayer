import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({});

  const {fullname, email, password, confirmPassword} = userInfo;

  const fetchApi = async () => {
    const res = await axios.get('http://192.168.11.219:8000/');
    console.log(res.data);
  };

  const onRegister = () => {
    console.log(userInfo);
    axios
      .post('http://192.168.11.219:8000/register', {
        userInfo,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    fetchApi();
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardShow(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({...userInfo, [fieldName]: value});
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView className="flex-1">
        <View className="bg-white h-full w-full">
          <View className="mx-auto mt-[70px]">
            <Image
              className={`object-cover w-[200px] h-[200px] mx-auto shadow-white ${
                isKeyboardShow ? 'hidden' : ''
              }`}
              source={require('../assets/logo.png')}
            />
            <Text className="text-black text-[25px] mx-auto pt-[20px]">
              Sign Up
            </Text>
            <View className="pt-[40px]">
              <Text className="h-[25px] text-[17px]">Display Name</Text>
              <TextInput
                value={fullname}
                onChangeText={value => handleOnChangeText(value, 'fullname')}
                placeholder="Ex: John Doe"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
            <View className="pt-[20px]">
              <Text className="h-[25px] text-[17px]">Username</Text>
              <TextInput
                value={email}
                onChangeText={value => handleOnChangeText(value, 'email')}
                placeholder="Type your username"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
            <View className="pt-[10px]">
              <Text className="h-[25px] text-[17px]">Password</Text>
              <TextInput
                value={password}
                onChangeText={value => handleOnChangeText(value, 'password')}
                secureTextEntry={true}
                placeholder="Type your password"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
            <View className="pt-[10px]">
              <Text className="h-[25px] text-[17px]">Confirm Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={value =>
                  handleOnChangeText(value, 'confirmPassword')
                }
                secureTextEntry={true}
                placeholder="Type your password"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
          </View>
          <View className="px-[20px] rounded-[10px]">
            <TouchableOpacity
              onPress={() => onRegister()}
              className="flex mt-[40px] bg-gray-100 w-full border-[0.5px] rounded-[10px]">
              <Text className="text-[20px] text-center  py-[20px] rounded-[10px]">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-center px-[20px] rounded-[10px]">
            <Text className="text-[16px] text-center font-thin py-[20px] rounded-[10px]">
              Already have account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('SignInScreen')}
              className="">
              <Text className="text-[16px] pl-[5px] text-center  py-[20px] rounded-[10px]">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
