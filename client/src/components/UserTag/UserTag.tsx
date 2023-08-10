import React from 'react';
import {Image, View, Text} from 'react-native';
import {UserTagTypes} from './types';

const UserTag = ({userName, imageUrl, position}: UserTagTypes) => {
  return (
    <View
      className={`flex flex-row left-[60px] absolute z-[1] ${position}-[60px] -top-[13px] items-center`}>
      <Text className="text-center font-black text-[18px] text-white ">
        {userName}
      </Text>
      {imageUrl && (
        <Image
          className={'w-[20px] h-[20px] m-[5px] ml-[10px]'}
          source={imageUrl}
        />
      )}
    </View>
  );
};

export default UserTag;
