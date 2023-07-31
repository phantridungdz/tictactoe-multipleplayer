/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

interface GamePlayScreenProps {
  navigation: any;
  board: string[][];
}

const GamePlayScreen: React.FC<GamePlayScreenProps> = ({navigation}) => {
  const [character, setCharacter] = useState<string>('X');
  const [wasWin, setWasWin] = useState<string>('');
  const [draw, setDraw] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<{row: number; col: number} | null>(
    null,
  );
  const [winPoint, setWinPoint] = useState<Array<[number, number]> | null>(
    null,
  );

  const [lastClickedButtonIndex, setLastClickedButtonIndex] = useState<
    number | null
  >(null);
  const [timer, setTimer] = useState<number>(10);

  const [boardData, setBoarData] = useState([
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ]);
  const checkWinner = (board: string[][], row: number, col: number) => {
    const player = board[row][col];
    const checkRow = (): {
      player: string;
      winCoordinates: Array<[number, number]> | null;
      type: string;
    } => {
      var counterWin = 0;
      var counterEnemy = 0;
      var winCoordinates: Array<[number, number]> = [];
      for (let i: number = 5; i >= -5; i--) {
        if (board[row][col - i] === player) {
          counterWin += 1;
          winCoordinates.push([row, col - i]);
        } else {
          counterWin = 0;
          winCoordinates = [];
        }
        if (counterWin === 5) {
          if (
            board[row][col - i + 1] !== '' &&
            board[row][col - i + 1] !== player
          ) {
            counterEnemy += 1;
          }
          if (
            board[row][col - i - 5] !== '' &&
            board[row][col - i - 5] !== player
          ) {
            counterEnemy += 1;
          }
          if (counterEnemy === 2) {
            console.log('was blocked');
            break;
          } else {
            console.log(`${player} WIN !`);

            setBoarData([...board]);
            setWinPoint(winCoordinates);
            return {player, winCoordinates, type: 'row'};
          }
        }
      }
      return {player: '', winCoordinates: null, type: 'row'};
    };
    const checkCol = (): {
      player: string;
      winCoordinates: Array<[number, number]> | null;
      type: string;
    } => {
      var counterWin = 0;
      var counterEnemy = 0;
      var winCoordinates: Array<[number, number]> = [];
      for (let i: number = 5; i >= -5; i--) {
        try {
          if (board[row - i][col] === player) {
            counterWin += 1;
            winCoordinates.push([row - i, col]);
          } else {
            counterWin = 0;
            winCoordinates = [];
          }
          if (counterWin === 5) {
            if (
              board[row - i + 1][col] !== '' &&
              board[row - i + 1][col] !== player
            ) {
              counterEnemy += 1;
            }
            if (
              board[row - i - 5][col] !== '' &&
              board[row - i - 5][col] !== player
            ) {
              counterEnemy += 1;
            }
            if (counterEnemy === 2) {
              console.log('was blocked');
              break;
            } else {
              console.log(`${player} WIN !`);
              return {player, winCoordinates, type: 'col'};
            }
          }
        } catch (error) {}
      }
      return {player: '', winCoordinates: null, type: 'col'};
    };
    const checkDiagonal = (): {
      player: string;
      winCoordinates: Array<[number, number]> | null;
      type: string;
    } => {
      var counterWin = 0;
      var counterEnemy = 0;
      var winCoordinates: Array<[number, number]> = [];
      for (let i: number = 5; i >= -5; i--) {
        try {
          if (board[row - i][col - i] === player) {
            counterWin += 1;
            winCoordinates.push([row - i, col - i]);
          } else {
            counterWin = 0;
            winCoordinates = [];
          }
          if (counterWin === 5) {
            if (
              board[row - i + 1][col - i + 1] !== '' &&
              board[row - i + 1][col - i + 1] !== player
            ) {
              counterEnemy += 1;
            }
            if (
              board[row - i - 5][col - i - 5] !== '' &&
              board[row - i - 5][col - i - 5] !== player
            ) {
              counterEnemy += 1;
            }
            if (counterEnemy === 2) {
              console.log('was blocked');
              break;
            } else {
              console.log(`${player} WIN !`);
              return {player, winCoordinates, type: 'diagonal'};
            }
          }
        } catch (error) {}
      }
      return {player: '', winCoordinates: null, type: 'diagonal'};
    };
    const checkAntiDiagonal = (): {
      player: string;
      winCoordinates: Array<[number, number]> | null;
      type: string;
    } => {
      var counterWin = 0;
      var counterEnemy = 0;
      var winCoordinates: Array<[number, number]> = [];
      for (let i: number = 5; i >= -5; i--) {
        try {
          if (board[row + i][col - i] === player) {
            counterWin += 1;
            winCoordinates.push([row + i, col - i]);
          } else {
            counterWin = 0;
            winCoordinates = [];
          }
          if (counterWin === 5) {
            if (
              board[row + i + 1][col - i - 1] !== '' &&
              board[row + i + 1][col - i - 1] !== player
            ) {
              counterEnemy += 1;
            }
            if (
              board[row + i + 5][col - i - 5] !== '' &&
              board[row + i + 5][col - i - 5] !== player
            ) {
              counterEnemy += 1;
            }
            if (counterEnemy === 2) {
              console.log('was blocked');
              break;
            } else {
              console.log(`${player} WIN !`);
              return {player, winCoordinates, type: 'antidiagonal'};
            }
          }
        } catch (error) {}
      }
      return {player: '', winCoordinates: null, type: 'antidiagonal'};
    };

    if (checkRow().player !== '') {
      return checkRow();
    }
    if (checkCol().player !== '') {
      return checkCol();
    }
    if (checkDiagonal().player !== '') {
      return checkDiagonal();
    }
    if (checkAntiDiagonal().player !== '') {
      return checkAntiDiagonal();
    }
  };

  const go = (col: number, row: number) => {
    if (boardData[row][col] !== '') {
      return;
    }

    const updatedBoardData = [...boardData];
    updatedBoardData[row][col] = character;

    setTimer(10);

    if (row === 0) {
      updatedBoardData.unshift(Array(boardData[0].length).fill(''));
      row += 1;
      // col += 1;
    }
    if (col === 0) {
      updatedBoardData.forEach(rowData => rowData.unshift(''));
      // row += 1;
      col += 1;
    }
    if (row === boardData.length - 1) {
      updatedBoardData.push(Array(boardData[0].length).fill(''));
      // row -= 1;
    }
    if (col === boardData[row].length - 1) {
      updatedBoardData.forEach(rowData => rowData.push(''));
      // col -= 1;
    }

    setBoarData(updatedBoardData);
    // checkWinner(updatedBoardData, row, col);
    const winner = checkWinner(updatedBoardData, row, col);
    if (winner) {
      console.log(winner);
      console.log(`Player ${winner} wins!`);
      if (winner.winCoordinates !== null) {
        winner.winCoordinates.forEach(([r, c]) => {
          var type = '';
          switch (winner.type) {
            case 'col':
              type = 'c';
              break;
            case 'row':
              type = 'r';
              break;
            case 'diagonal':
              type = 'd';
              break;
            case 'antidiagonal':
              type = 'a';
              break;
            default:
              break;
          }
          console.log(`${winner.player}${type}`);
          boardData[r][c] = `${winner.player}${type}`;
        });
      }
      setWasWin(winner.player);
    }

    setCharacter(character === 'X' ? 'O' : 'X');
    setLastMove({row, col});
    setLastClickedButtonIndex(col + row * boardData[row].length);
  };
  // useEffect(() => {
  //   console.log(winPoint);
  //   if (winPoint !== null) {
  //     winPoint.forEach(([r, c]) => {
  //       boardData[r][c] = 'A';
  //     });
  //   }
  // }, [boardData, winPoint]);

  const resetGame = () => {
    setWasWin('');
    setWinPoint(null);
    setDraw(false);
    setBoarData([
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ]);
    setTimer(10);
    setPause(false);
    setLastMove(null);
    setLastClickedButtonIndex(null);
  };

  // useEffect(() => {
  //   if (!pause) {
  //     const interval = setInterval(() => {
  //       if (timer > 0) {
  //         setTimer(prevTimer => prevTimer - 1);
  //       } else {
  //         handleTimeOut();
  //       }
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [timer]);

  const handleTimeOut = () => {
    if (character === 'X') {
      setWasWin('O');
      setPause(true);
    } else {
      setWasWin('X');
      setPause(true);
    }
  };
  const handleDraw = () => {
    setDraw(true);
    setPause(true);
  };
  const handleExit = () => {
    navigation.replace('SplashScreen');
  };

  return (
    <View className="h-full w-full py-[110px] flex">
      <View className=" absolute top-[20px] left-0 h-[70px] w-full justify-center">
        <View className="grid grid-cols-3 flex-row justify-center">
          <View
            className={`${
              character === 'X' ? 'border-b-[#ea3b2e] border-b-[2px]' : ''
            }`}>
            <Image
              className={'w-[40px] h-[40px]  m-[10px] '}
              source={require('../assets/user.png')}
            />
            <Text className="text-center font-bold">User 1</Text>
          </View>
          <View className="mt-[20px] w-[200px]">
            <View className="flex justify-center items-center">
              <Image
                className={'w-[40px] h-[40px] '}
                source={require('../assets/time.png')}
              />
              <Text
                className={`text-[23px] font-bold px-[85px] text-center ${
                  timer < 6 ? 'text-[#ea3b2e]' : 'text-[#d2c344]'
                }`}>
                {timer}
              </Text>
            </View>
          </View>
          <View
            className={`${
              character === 'O' ? 'border-b-[#3892b8] border-b-[2px]' : ''
            }`}>
            <Image
              className="w-[40px] h-[40px] m-[10px]"
              source={require('../assets/user.png')}
            />
            <Text className="text-center font-bold">User 2</Text>
          </View>
        </View>
      </View>
      <View className={`${wasWin === '' ? 'hidden' : ''}`}>
        <View
          className={`absolute w-[500px] h-[1200px] -top-[160px] bg-black opacity-30 ${
            wasWin === '' ? 'hidden' : ''
          }`}
        />
        <View className="absolute rounded-[10px] right-[20px] left-[20px] top-[150px] h-[200px] bg-gray-700">
          <View className="m-auto flex flex-row">
            <Text
              className={`text-white font-bold text-[35px] ${
                wasWin === 'X' ? 'text-[#e92020c3]' : 'text-[#3892b8]'
              }`}>
              {wasWin}
            </Text>
            <Text className="ml-[5px] text-white font-bold text-[35px]">
              win this game!
            </Text>
          </View>
          <View className="flex flex-row">
            <TouchableOpacity
              className="rounded-[15px] bg-white mx-auto mb-[20px]"
              onPress={() => resetGame()}>
              <Text className="m-auto text-black mx-[10px] p-[20px] text-[20px]">
                Restart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className={`${draw ? '' : 'hidden'}`}>
        <View className="absolute w-[500px] h-[1200px] -top-[160px] bg-black opacity-30" />
        <View className="absolute rounded-[10px] right-[20px] left-[20px] top-[150px] h-[200px] bg-gray-700">
          <View className="m-auto flex flex-row">
            <Text className="ml-[5px] text-white font-bold text-[35px]">
              Draw!
            </Text>
          </View>
          <View className="flex flex-row">
            <TouchableOpacity
              className="rounded-[15px] bg-white mx-auto mb-[20px]"
              onPress={() => resetGame()}>
              <Text className="m-auto text-black mx-[10px] p-[20px] text-[20px]">
                Restart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="bg-gray-400 h-full w-full z-[-1]">
        <ReactNativeZoomableView
          zoomEnabled={wasWin !== '' ? false : true}
          maxZoom={1.5}
          minZoom={0.9}
          zoomStep={0.5}
          initialZoom={1}
          initialOffsetX={0}
          initialOffsetY={0}
          contentWidth={75 * boardData[0].length}
          contentHeight={75 * boardData.length}
          disablePanOnInitialZoom={true}
          bindToBorders={true}>
          {boardData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <TouchableOpacity
                  key={cellIndex}
                  disabled={wasWin !== '' ? true : false}
                  onPress={() => go(cellIndex, rowIndex)}>
                  <View
                    className={`${
                      lastClickedButtonIndex ===
                      cellIndex + rowIndex * boardData[0].length
                        ? 'border-[#3892b8] border-[2px] bg-white'
                        : 'bg-white'
                    }
                      ${!cell.indexOf('X') ? 'border-[#e92020c3]' : ''}
                      ${
                        !cell.indexOf('O') ? 'border-[#3892b8]' : ''
                      }  w-[60px] h-[60px] m-[2px] `}>
                    <View
                      className={`absolute w-full h-full opacity-25 ${
                        !cell.indexOf('X') ? 'bg-[#e92020c3]' : ''
                      }
                      ${!cell.indexOf('O') ? 'bg-[#3892b8]' : ''}`}
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
                          bg-red-500 w-[5px] h-[60000
                            5px] absolute z-[100]
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
                    <Text
                      className={`m-auto font-bold text-[29px] ${
                        !cell.indexOf('X')
                          ? 'text-[#e92020c3]'
                          : 'text-[#3892b8]'
                      }`}>
                      {!cell.indexOf('X') ? 'X' : ''}
                      {!cell.indexOf('O') ? 'O' : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ReactNativeZoomableView>
      </View>
      <View className="w-full items-center justify-center px-[20px]">
        <View className="h-[80px] mt-[10px] px-[20px] w-full justify-center p-[15px] bg-blue-300 rounded-[20px] flex flex-row">
          <TouchableOpacity
            onPress={() => handleTimeOut()}
            className="w-[33%] flex flex-col items-center">
            <Image
              className={'w-[30px] h-[30px]'}
              source={require('../assets/suspended.png')}
            />
            <Text className="text-center text-white font-bold p-[5px]">
              Surrender
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDraw()}
            className="w-[33%] flex flex-col items-center">
            <Image
              className={'w-[30px] h-[30px]'}
              source={require('../assets/draw.png')}
            />
            <Text className="text-center text-white font-bold p-[5px]">
              Draw
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleExit()}
            className="w-[33%] flex flex-col items-center">
            <Image
              className={'w-[30px] h-[30px]'}
              source={require('../assets/out.png')}
            />
            <Text className="text-center text-white font-bold p-[5px]">
              Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 20,
  },
  zoomableView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default GamePlayScreen;
