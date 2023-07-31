/* eslint-disable react-hooks/exhaustive-deps */
import {Image, View, Text} from 'react-native';
import React, {useEffect} from 'react';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const openHome = () => {
    navigation.replace('GamePlayScreen');
  };
  useEffect(() => {
    const splash = setTimeout(() => {
      openHome();
    }, 1500);

    return () => {
      clearTimeout(splash);
    };
  }, []);
  return (
    <View className="bg-white h-full w-full">
      <View className="mx-auto my-auto">
        <Image
          className="object-cover w-[300px] h-[300px] invert drop-shadow-xl shadow-white"
          source={require('../assets/logo.png')}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
