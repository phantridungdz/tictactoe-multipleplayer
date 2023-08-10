import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {BottomMenuTypes} from './types';

const BottomMenu = ({
  pause,
  showConFirmSurrender,
  showConFirmhandleDraw,
  showConFirmPopUpExit,
}: BottomMenuTypes) => {
  return (
    <View
      className={`w-full items-center justify-center px-[20px] absolute bottom-[30px]
      ${pause ? 'hidden' : ''}`}>
      <View className="h-[80px] mt-[10px] px-[20px] w-full justify-center p-[15px] bg-[#6c3af3] border-[#ecc200] border-[2px] rounded-[20px] flex flex-row">
        <TouchableOpacity
          onPress={() => showConFirmSurrender()}
          disabled={pause}
          className="w-[33%] flex flex-col items-center">
          <Image
            className={'w-[30px] h-[30px]'}
            source={require('../../assets/suspended.png')}
          />
          <Text className="text-center text-white font-bold p-[5px]">
            Surrender
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showConFirmhandleDraw()}
          disabled={pause}
          className="w-[33%] flex flex-col items-center">
          <Image
            className={'w-[30px] h-[30px]'}
            source={require('../../assets/draw.png')}
          />
          <Text className="text-center text-white font-bold p-[5px]">Draw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showConFirmPopUpExit()}
          disabled={pause}
          className="w-[33%] flex flex-col items-center">
          <Image
            className={'w-[30px] h-[30px]'}
            source={require('../../assets/out.png')}
          />
          <Text className="text-center text-white font-bold p-[5px]">Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomMenu;
