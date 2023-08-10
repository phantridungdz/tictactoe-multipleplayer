import React from 'react';
import {View, Image} from 'react-native';
import {LineTypes} from './types';

const Line = ({
  cell,
  lastClickedButtonIndex,
  cellIndex,
  rowIndex,
  boardData,
}: LineTypes) => {
  return (
    <View
      className={`${
        lastClickedButtonIndex === cellIndex + rowIndex * boardData[0].length
          ? 'border-[#28205A] border-[2px] rounded-[5px] bg-white'
          : 'bg-white rounded-[5px]'
      }
      ${!cell.indexOf('X') ? 'border-[#F92464]' : ''}
      ${
        !cell.indexOf('O') ? 'border-[#28205A]' : ''
      }  w-[60px] h-[60px] m-[2px] `}>
      <View
        className={`absolute w-full h-full opacity-25 ${
          !cell.indexOf('X') ? 'bg-[#F92464]' : ''
        }
        ${!cell.indexOf('O') ? 'bg-[#28205A]' : ''}`}
      />
      {cell.indexOf('r') !== -1 && (
        <View
          className={`
            ${
              lastClickedButtonIndex ===
              cellIndex + rowIndex * boardData[0].length
                ? 'bottom-[28px] bg-white'
                : 'bottom-[30px] '
            }
            bg-red-500 h-[5px] w-[65px] absolute 
          `}
        />
      )}
      {cell.indexOf('c') !== -1 && (
        <View
          className={`
            ${
              lastClickedButtonIndex ===
              cellIndex + rowIndex * boardData[0].length
                ? 'right-[26px]'
                : 'right-[28px]'
            }
            bg-[#F92464] w-[5px] h-[95px] absolute z-[100]
          `}
        />
      )}
      {cell.indexOf('d') !== -1 && (
        <View
          className={`
            ${
              lastClickedButtonIndex ===
              cellIndex + rowIndex * boardData[0].length
                ? 'top-[-17px]'
                : 'top-[-15px]'
            }
            bg-red-500 w-[5px] h-[95px] left-[30px] absolute z-[100] -rotate-45
          `}
        />
      )}
      {cell.indexOf('a') !== -1 && (
        <View
          className={`
            ${
              lastClickedButtonIndex ===
              cellIndex + rowIndex * boardData[0].length
                ? 'top-[-22px]'
                : 'top-[-20px]'
            }
            bg-red-500 w-[5px] h-[95px] left-[30px] absolute z-[100] rotate-45
          `}
        />
      )}
      <View
        className={`m-auto ${
          !cell.indexOf('X') ? 'text-[#F92464]' : 'text-[#28205A]'
        }`}>
        {!cell.indexOf('X') ? (
          <Image
            className="w-[30px] h-[30px]"
            source={require('../../assets/X.png')}
          />
        ) : (
          <></>
        )}
        {!cell.indexOf('O') ? (
          <Image
            className="w-[30px] h-[30px]"
            source={require('../../assets/O.png')}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Line;
