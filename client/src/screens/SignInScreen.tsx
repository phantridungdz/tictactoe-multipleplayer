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

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
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
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView className="flex-1">
        <View className="bg-white h-full w-full">
          <View className="mx-auto mt-[70px]">
            <Image
              className={`object-cover w-[250px] h-[250px] mx-auto shadow-white ${
                isKeyboardShow ? 'hidden' : ''
              }`}
              source={require('../assets/logo.png')}
            />
            <Text className="text-black text-[25px] mx-auto pt-[20px]">
              Welcome
            </Text>
            <Text className="text-gray-500 text-[20px] mx-auto">
              Please sign in to continue.
            </Text>
            <View className="pt-[40px]">
              <Text className="h-[25px] text-[17px]">Username</Text>
              <TextInput
                placeholder="Type your username"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
            <View className="pt-[10px]">
              <Text className="h-[25px] text-[17px]">Password</Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Type your password"
                placeholderTextColor={'gray'}
                className="w-[390px] h-[50px] border-[0.5px] px-[20px]"
              />
            </View>
          </View>
          <View className="px-[20px] rounded-[10px]">
            <TouchableOpacity className="flex mt-[40px] bg-gray-100 w-full border-[0.5px] rounded-[10px]">
              <Text className="text-[20px] text-center  py-[20px] rounded-[10px]">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-center px-[20px] rounded-[10px]">
            <Text className="text-[16px] text-center font-thin py-[20px] rounded-[10px]">
              Dont's have account?
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => navigation.push('SignUpScreen')}>
              <Text className="text-[16px] pl-[5px] text-center  py-[20px] rounded-[10px]">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
