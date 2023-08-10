/* eslint-disable react-hooks/exhaustive-deps */
import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const openHome = () => {
    navigation.replace('MenuScreen');
  };
  const [timer, setTimer] = useState<number>(1);
  useEffect(() => {
    const splash = setTimeout(() => {
      openHome();
    }, 1500);

    return () => {
      clearTimeout(splash);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <View className="bg-white h-full w-full">
      <View className="mx-auto my-auto">
        <Image
          className="object-cover w-[300px] h-[300px] invert drop-shadow-xl shadow-white"
          source={require('../assets/logo.png')}
        />
        <Text className="text-[30px] mx-auto pt-[40px] font-bold font-sans">
          Tic Tac Toe
        </Text>
        <Text className="text-[20px] text-gray-400 mx-auto pt-[10px] font-sans">
          Multiple player casual game
        </Text>
        <ProgressBar
          className="h-[7px] border-white border-[1px] w-full absolute top-[20px]"
          progress={timer / 10}
          theme={{colors: {primary: '#F92464'}}}
        />
        <Text className="text-[20px] text-gray-400 mx-auto pt-[10px] font-sans mt-[20px]">
          Loading...
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
