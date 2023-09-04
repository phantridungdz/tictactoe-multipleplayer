/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import Line from '../components/Line/Line';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import PopUp from '../components/Popup/Popup';
import RNExitApp from 'react-native-exit-app';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import Sound from 'react-native-sound';

interface GamePlayScreenProps {
  navigation: any;
  route: any;
}
type firstFunction = () => void;

const GamePlayScreen: React.FC<GamePlayScreenProps> = ({navigation, route}) => {
  const [sound, setSound] = useState<Sound | null>(null);

  useEffect(() => {
    Sound.setCategory('Playback');
    const newSound = new Sound(
      'win.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound: ', error);
        } else {
          setSound(newSound);
        }
      },
    );

    // Clean up the sound instance when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playSound = () => {
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Playback failed');
        }
      });
    }
  };

  playSound();

  const {gameData} = route.params;
  const {waiting} = route.params;
  const [character, setCharacter] = useState<string>('X');
  const [playerPlaying, setPlayerPlaying] = useState<string>(
    gameData.players[0].userName,
  );

  const [wasWin, setWasWin] = useState<string>('');
  const [imageWinner, setImageWinner] = useState<string>('');
  const [draw, setDraw] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [viewingBoard, setViewingBoard] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [waitingStatus, setWaitingStatus] = useState<boolean>(waiting);
  const [message, setMessage] = useState<string>('');
  const [subMessage, setSubMessage] = useState<string>('');
  const [lastMove, setLastMove] = useState<{row: number; col: number} | null>(
    null,
  );
  const [winPoint, setWinPoint] = useState<Array<[number, number]> | null>(
    null,
  );

  const [firstButton, setFirstButton] = useState<string>('');
  const [secondButton, setSecondButton] = useState<string>('');
  const [thirdButton, setThirdButton] = useState<string>('');

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
            break;
          } else {
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
              break;
            } else {
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
              break;
            } else {
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
              break;
            } else {
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
    }
    if (col === boardData[row].length - 1) {
      updatedBoardData.forEach(rowData => rowData.push(''));
    }

    setBoarData(updatedBoardData);
    // checkWinner(updatedBoardData, row, col);
    const winner = checkWinner(updatedBoardData, row, col);
    if (winner) {
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
          boardData[r][c] = `${winner.player}${type}`;
        });
        setPause(true);
        setWasWin(winner.player);
        setShowPopup(true);
        if (winner.player === 'X') {
          setImageWinner(
            gameData.players[0]
              ? gameData.players[0].avatar
              : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
          );
        } else {
          setImageWinner(
            gameData.players[1]
              ? gameData.players[1].avatar
              : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
          );
        }
        setShowImage(true);
        setMessage(`${playerPlaying} WON THIS GAME`);
        setSubMessage(
          `
          Choose "Show board" to see board again
          Choose "Restart" to restart this game 
          Choose "Exit" to close the app`,
        );
        setFirstButton('Show Board');
        setFirstBtnFunction(() => viewBoard);
        setSecondButton('Restart');
        setSecondBtnFunction(() => showConFirmPopUpRestart);
        setThirdButton('Exit');
        setThirdBtnFunction(() => showConFirmPopUpExit);
      }
      setWasWin(winner.player);
      if (winner.player === 'X') {
        setImageWinner(
          gameData.players[0]
            ? gameData.players[0].avatar
            : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
        );
      } else {
        setImageWinner(
          gameData.players[1]
            ? gameData.players[1].avatar
            : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
        );
      }
    }
    setCharacter(character === 'X' ? 'O' : 'X');
    setPlayerPlaying(
      playerPlaying === gameData.players[0].userName
        ? 'newPlayer123'
        : gameData.players[0].userName,
    );
    setLastMove({row, col});
    setLastClickedButtonIndex(col + row * boardData[row].length);
  };
  useEffect(() => {
    if (!pause) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
        } else {
          setPause(true);
          handleTimeOut();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, pause]);
  const resetGame = () => {
    setWasWin('');
    setImageWinner('');
    setShowPopup(false);
    setViewingBoard(false);
    setFirstButton('');
    setSecondButton('');
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
  const handleTimeOut = () => {
    if (character === 'X') {
      setWasWin('O');
      setImageWinner(
        gameData.players[1]
          ? gameData.players[1].avatar
          : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
      );
      setPause(true);
      setShowPopup(true);
      setShowImage(true);
      setMessage(`${gameData.players[1].userName} WON THIS GAME`);
      setSubMessage(
        `
        Choose "Show board" to see board again
        Choose "Restart" to restart this game 
        Choose "Exit" to close the app`,
      );
      setFirstButton('Show Board');
      setFirstBtnFunction(() => viewBoard);
      setSecondButton('Restart');
      setSecondBtnFunction(() => showConFirmPopUpRestart);
      setThirdButton('Exit');
      setThirdBtnFunction(() => showConFirmPopUpExit);
    } else {
      setWasWin('X');
      setImageWinner(
        gameData.players[0]
          ? gameData.players[0].avatar
          : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
      );
      setPause(true);
      setShowPopup(true);
      setShowImage(true);
      setMessage(`${gameData.players[0].userName} WON THIS GAME`);
      setSubMessage(
        `
        Choose "Show board" to see board again
        Choose "Restart" to restart this game 
        Choose "Exit" to close the app`,
      );
      setFirstButton('Show Board');
      setFirstBtnFunction(() => viewBoard);
      setSecondButton('Restart');
      setSecondBtnFunction(() => showConFirmPopUpRestart);
      setThirdButton('Exit');
      setThirdBtnFunction(() => showConFirmPopUpExit);
    }
  };

  const handleDraw = () => {
    setPause(true);
    setShowPopup(true);
    setShowImage(false);
    setMessage('DRAW !');
    setSubMessage('');
    setFirstButton('Show Board');
    setFirstBtnFunction(() => viewBoard);
    setSecondButton('Restart');
    setSecondBtnFunction(() => handleSurrender);
    setThirdButton('Exit');
    setThirdBtnFunction(() => showConFirmPopUpExit);
  };
  const handleExit = () => {
    navigation.replace('SplashScreen');
  };
  const viewBoard = () => {
    setWasWin('');
    setViewingBoard(true);
    setShowPopup(false);
    setFirstButton('');
    setSecondButton('');
    setPause(true);
  };
  const exitGame = () => {
    const updatedGame = {...gameData};
    updatedGame.players.pop();
    navigation.navigate('MenuScreen', {gameData: updatedGame});
  };
  const showConFirmPopUpRestart = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setMessage('Do you want to restart this game ?');
    setSubMessage('');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => resetGame);
    setThirdButton('No');
    setThirdBtnFunction(() => backConfirmPopup);
  };
  const showConFirmPopUpRestartFromViewBoard = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setMessage('Do you want to restart this game ?');
    setSubMessage('');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => resetGame);
    setThirdButton('No');
    setThirdBtnFunction(() => () => {
      setShowPopup(false);
    });
  };
  const showConFirmPopUpExit = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setSubMessage('');
    setMessage('Do you want to exit this game ?');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => exitGame);
    setThirdButton('No');
    setThirdBtnFunction(() => backConfirmPopup);
  };
  const showConFirmPopUpNonExit = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setSubMessage('');
    setMessage('Do you want to exit this game ?');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => exitGame);
    setThirdButton('No');
    setThirdBtnFunction(() => backToWait);
  };
  const showConFirmPopUpExitFromViewBoard = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setSubMessage('');
    setMessage('Do you want to exit this game ?');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => exitGame);
    setThirdButton('No');
    setThirdBtnFunction(() => () => {
      setShowPopup(false);
    });
  };
  const backConfirmPopup = () => {
    setShowPopup(true);
    setShowImage(true);
    setMessage(`${playerPlaying} WON THIS GAME`);
    setSubMessage(
      `
      Choose "Show board" to see board again
      Choose "Restart" to restart this game 
      Choose "Exit" to close the app`,
    );
    setSecondButton('');
    setThirdButton('');
    setSecondButton('Restart');
    setSecondBtnFunction(() => showConFirmPopUpRestart);
    setFirstButton('Show Board');
    setFirstBtnFunction(() => viewBoard);
    setThirdButton('Exit');
    setThirdBtnFunction(() => showConFirmPopUpExit);
  };
  const backConfirmFromNonPopup = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setMessage('Do you want to restart this game ?');
    setSubMessage('');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => resetGame);
    setThirdButton('No');
    setThirdBtnFunction(() => backToWait);
  };
  const handleSurrender = () => {
    if (character === 'X') {
      setWasWin('O');
      setImageWinner(
        gameData.players[1]
          ? gameData.players[1].avatar
          : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
      );
      setPause(true);
      setShowPopup(true);
      setShowImage(true);
      setMessage(`${playerPlaying} WON THIS GAME`);
      setSubMessage(
        `
        Choose "Show board" to see board again
        Choose "Restart" to restart this game 
        Choose "Exit" to close the app`,
      );
      setFirstButton('Show Board');
      setFirstBtnFunction(() => viewBoard);
      setSecondButton('Restart');
      setSecondBtnFunction(() => showConFirmPopUpRestart);
      setThirdButton('Exit');
      setThirdBtnFunction(() => showConFirmPopUpExit);
    } else {
      setWasWin('X');
      setImageWinner(
        gameData.players[0]
          ? gameData.players[0].avatar
          : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
      );
      setPause(true);
      setShowPopup(true);
      setShowImage(true);
      setMessage(`${playerPlaying} WON THIS GAME`);
      setSubMessage(
        `
        Choose "Show board" to see board again
        Choose "Restart" to restart this game 
        Choose "Exit" to close the app`,
      );
      setFirstButton('Show Board');
      setFirstBtnFunction(() => viewBoard);
      setSecondButton('Restart');
      setSecondBtnFunction(() => showConFirmPopUpRestart);
      setThirdButton('Exit');
      setThirdBtnFunction(() => showConFirmPopUpExit);
    }
  };
  const showConFirmSurrender = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setMessage('Do you want to surrender this game ?');
    setSubMessage('');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => handleSurrender);
    setThirdButton('No');
    setThirdBtnFunction(() => () => {
      setPause(false);
      setShowPopup(false);
    });
  };
  const showConFirmhandleDraw = () => {
    setShowPopup(true);
    setPause(true);
    setShowImage(false);
    setMessage('Do you want to draw this game ?');
    setSubMessage('');
    setFirstButton('');
    setSecondButton('Yes');
    setSecondBtnFunction(() => handleDraw);
    setThirdButton('No');
    setThirdBtnFunction(() => () => {
      setPause(false);
      setShowPopup(false);
    });
  };
  const backToWait = () => {
    setPause(true);
    setShowPopup(true);
    setMessage('Please wait another people..');
    setFirstButton('');
    setSecondButton('Invite friend');
    setThirdButton('Exit');
    setThirdBtnFunction(() => showConFirmPopUpNonExit);
    setWaitingStatus(false);
  };

  const [firstBtnFunction, setFirstBtnFunction] = useState(() => () => {});
  const [secondBtnFunction, setSecondBtnFunction] = useState(() => () => {});
  const [thirdBtnFunction, setThirdBtnFunction] = useState(() => () => {});
  if (waitingStatus) {
    setPause(true);
    setShowPopup(true);
    setMessage('Please wait another people..');
    setSecondButton('Invite friend');
    setThirdButton('Exit');
    setThirdBtnFunction(() => showConFirmPopUpNonExit);
    setWaitingStatus(false);
  }

  return (
    <View className="h-full w-full flex">
      <Image
        className={'w-full h-full absolute z-[-1]'}
        source={require('../assets/bgblue.png')}
      />
      {/* User Area */}
      <SafeAreaView>
        <View className="mt-[40px] left-0 w-full justify-center bg-opacity-60 rounded-b-[20px]">
          <View className="flex flex-row w-full">
            <View className="absolute left-[10px] top-0">
              <View className="flex flex-row left-[20px] absolute z-[1] -top-[20px] items-center">
                <Image
                  className={'w-[35px] h-[35px] rounded-full m-[5px]'}
                  source={{
                    uri:
                      gameData.players[0] !== undefined
                        ? gameData.players[0].avatar
                        : 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/db/dbfe400f0dd0ebd938582244a04f85e42a12ca39_full.jpg',
                  }}
                />
                <Text
                  className="text-center font-black text-[18px] text-black truncate w-[90px] line-clamp-1"
                  numberOfLines={1}>
                  {gameData.players[0] !== undefined
                    ? gameData.players[0].userName
                    : 'unknowUser'}
                </Text>
              </View>
            </View>
            <View
              className={`w-[35%] h-[20px] absolute top-[25px] left-[32px] ${
                character === 'X' ? '' : 'hidden'
              }`}>
              <ProgressBar
                className="h-[7px] border-white border-[1px]"
                progress={timer / 10}
                theme={{colors: {primary: '#F92464'}}}
              />
            </View>
            <View className="w-full px-[10px] absolute -top-[40px] z-[-1] flex justify-center">
              <View className="flex justify-center items-center object-contain">
                <Image
                  className={'w-full h-[80px] px-[10px]'}
                  source={require('../assets/vs2.png')}
                />
              </View>
            </View>

            <View
              className={
                'flex flex-row absolute z-[1] right-[20px] -top-[20px] items-center'
              }>
              {gameData.players[1] !== undefined && (
                <Text
                  className="text-center font-black text-[18px] text-black w-[90px] line-clamp-1"
                  numberOfLines={1}>
                  {gameData.players[1] !== undefined
                    ? gameData.players[1].userName
                    : 'unknowUser'}
                </Text>
              )}
              {gameData.players[1] !== undefined && (
                <Image
                  className={'w-[35px] h-[35px] rounded-full m-[5px] ml-[10px]'}
                  source={{
                    uri:
                      gameData.players[1] !== undefined
                        ? gameData.players[1].avatar
                        : 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/db/dbfe400f0dd0ebd938582244a04f85e42a12ca39_full.jpg',
                  }}
                />
              )}
            </View>
            <View
              className={`w-[35%] absolute top-[25px] right-[33px] 
            ${character === 'O' ? '' : 'hidden'}`}>
              <ProgressBar
                className="h-[7px] border-white border-[1px]"
                progress={timer / 10}
                theme={{colors: {primary: '#28205A'}}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* End User Area */}
      <PopUp
        wasWin={wasWin}
        firstBtnFunction={firstBtnFunction}
        secondBtnFunction={secondBtnFunction}
        thirdBtnFunction={thirdBtnFunction}
        firstButton={firstButton}
        secondButton={secondButton}
        thirdButton={thirdButton}
        message={message}
        subMessage={subMessage}
        showImage={showImage}
        show={showPopup}
        imageWinner={imageWinner}
      />
      <View className="h-full w-full z-[-1] absolute top-[30px]">
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
                  disabled={pause}
                  onPress={() => go(cellIndex, rowIndex)}>
                  <Line
                    cell={cell}
                    lastClickedButtonIndex={lastClickedButtonIndex}
                    cellIndex={cellIndex}
                    rowIndex={rowIndex}
                    boardData={boardData}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ReactNativeZoomableView>
      </View>
      <BottomMenu
        pause={pause}
        showConFirmSurrender={showConFirmSurrender}
        showConFirmhandleDraw={showConFirmhandleDraw}
        showConFirmPopUpExit={showConFirmPopUpExit}
      />
      {viewingBoard && (
        <View
          className={
            'w-full items-center justify-center px-[20px] absolute bottom-[30px]'
          }>
          <View className="h-[80px] mt-[10px] px-[20px] w-full justify-center p-[15px] bg-[#6c3af3] border-[#ecc200] border-[2px] rounded-[20px] flex flex-row">
            <TouchableOpacity
              onPress={() => showConFirmPopUpRestartFromViewBoard()}
              className="w-[33%] flex flex-col items-center">
              <Image
                className={'w-[30px] h-[30px]'}
                source={require('../assets/restart.png')}
              />
              <Text className="text-center text-white font-bold p-[5px]">
                Restart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showConFirmPopUpExitFromViewBoard()}
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
      )}
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
