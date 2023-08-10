import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {PopUpTypes} from './types';

const PopUp = ({
  show,
  wasWin,
  imageWinner,
  thirdBtnFunction,
  secondBtnFunction,
  firstBtnFunction,
  firstButton,
  secondButton,
  thirdButton,
  subMessage,
  showImage,
  message,
}: PopUpTypes) => {
  return (
    <View className={`${show ? '' : 'hidden'}`}>
      <View
        className={`absolute w-[500px] h-[1200px] -top-[160px] bg-gray-500 opacity-30 ${
          wasWin === '' ? 'hidden' : ''
        }`}
      />
      <View className="absolute rounded-[10px] right-[20px] left-[20px] top-[150px] bg-white x-auto">
        <View className="flex items-center">
          <View
            className={`w-full flex items-center pt-[20px] ${
              wasWin === 'X' ? 'text-[#F92464]' : 'text-[#28205A]'
            }
            ${showImage ? '' : 'hidden'}
            `}>
            {/* {!wasWin.indexOf('X') ? (
              <Image
                className="w-[70px] h-[70px] "
                source={require('../../assets/X.png')}
              />
            ) : (
              <></>
            )}
            {!wasWin.indexOf('O') ? (
              <Image
                className="w-[70px] h-[70px] "
                source={require('../../assets/O.png')}
              />
            ) : (
              <></>
            )} */}
            {imageWinner !== '' && (
              <Image
                className="w-[70px] h-[70px] rounded-full"
                source={{uri: imageWinner}}
              />
            )}

            <View className="pt-[10px] absolute top-[65px]">
              <Image
                className="w-[40px] h-[40px]"
                source={require('../../assets/medal.png')}
              />
            </View>
          </View>

          <View className="m-auto flex w-full justify-center ">
            <Text
              className={`ml-[5px] text-center text-black pt-[35px] font-bold text-[25px] ${
                message === '' ? 'hidden' : ''
              }`}>
              {message}
            </Text>
            <View className="flex items-center justify-center">
              <Text
                className={`px-[10px] text-justify text-gray-700 leading-[25px] font-bold text-[14px] ${
                  subMessage === '' ? 'hidden' : ''
                }`}>
                {subMessage}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              className={`rounded-[5px] bg-[#33c267] mx-auto mt-[20px] w-[160px] items-center ${
                firstButton === '' ? 'hidden' : ''
              }`}
              onPress={() => firstBtnFunction()}>
              <Text className="m-auto text-white mx-[10px] font-bold p-[10px] text-[20px]">
                {firstButton}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            <TouchableOpacity
              className={`rounded-[5px] bg-[#28205A] mx-auto my-[20px] w-[160px] items-center ${
                secondButton === '' ? 'hidden' : ''
              }`}
              onPress={() => secondBtnFunction()}>
              <Text className="m-auto text-white mx-[10px] font-bold p-[10px] text-[20px]">
                {secondButton}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`rounded-[5px] bg-[#F92464] mx-auto my-[20px] ml-[20px] w-[160px] items-center ${
                thirdButton === '' ? 'hidden' : ''
              }`}
              onPress={() => thirdBtnFunction()}>
              <Text className="m-auto text-white mx-[10px] font-bold  p-[10px] text-[20px]">
                {thirdButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PopUp;
