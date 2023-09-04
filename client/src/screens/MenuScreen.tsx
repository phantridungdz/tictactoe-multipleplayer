/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import gamesData from './datagame';
import {ScrollView} from 'react-native-gesture-handler';
import {DefaultTheme} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

interface MenuScreenProps {
  navigation: any;
}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation}) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowCreateGame, setIsShowCreateGame] = useState<boolean>(false);
  const [isShowAccept, setIsShowAccept] = useState<boolean>(false);
  const [statusPlaying, setStatusPlaying] = useState<boolean>(false);
  const [statusWaiting, setStatusWaiting] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const scrollViewRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [passwordCreateText, setPasswordCreateText] = useState('');
  const [gameNameCreateText, setGameNameCreateText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResults, setSearchResults] = useState(gamesData);
  const [gameDataState, setGameDataState] = useState(gamesData);
  const [gameWantJoin, setGameWantJoin] = useState({
    gameName: '',
    status: '',
    auth: false,
    password: '',
    players: [
      {
        userName: '',
        displayName: '',
        avatar: '',
      },
    ],
  });

  const handleSearch = (text: string) => {
    setSearchText(text);
    applyFilters();
  };

  const handlePasswordChange = (text: string) => {
    setPasswordText(text);
  };

  const handlePasswordCreateChange = (text: string) => {
    setPasswordCreateText(text);
  };

  const handleGameNameCreateChange = (text: string) => {
    setGameNameCreateText(text);
  };

  const applyPassword = () => {
    if (gameWantJoin.password === passwordText) {
      goToGame();
      setIsShowPassword(false);
      setPasswordText('');
      setErrorMessage('');
    } else {
      setErrorMessage('Wrong password !');
    }
  };

  const applyFilters = () => {
    filterGames(searchText, statusPlaying, statusWaiting);
    setIsShowPopup(false); // Close the popup after applying filters
  };

  const filterGames = (
    text: string,
    filterPlaying: boolean,
    filterWaiting: boolean,
  ) => {
    const filteredGames = gameDataState.filter(
      gameData =>
        gameData.gameName.toLowerCase().includes(text.toLowerCase()) ||
        gameData.players.some(player =>
          player.userName.toLowerCase().includes(text.toLowerCase()),
        ),
    );

    const filteredByStatus = filteredGames.filter(gameData => {
      if (!filterPlaying && !filterWaiting) {
        return true;
      }

      const matchPlaying = filterPlaying && gameData.status === 'Playing';
      const matchWaiting = filterWaiting && gameData.status === 'Waiting...';

      return matchPlaying || matchWaiting;
    });

    setSearchResults(filteredByStatus);
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
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    setGameDataState(gamesData);
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

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  const handleJoinGame = (game: any) => {
    setIsShowAccept(true);
    setGameWantJoin(game);
  };

  const goToGame = () => {
    setIsShowAccept(false);
    const updatedGame = {...gameWantJoin};
    updatedGame.players.push({
      avatar: 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
      displayName: 'New Player',
      userName: 'newPlayer123',
    });
    navigation.navigate('GamePlayScreen', {
      gameData: gameWantJoin,
    });
    setGameDataState(gamesData);
  };
  const closePassWordField = () => {
    setIsShowPassword(false);
    setPasswordText('');
    setErrorMessage('');
  };
  const closeCreateGame = () => {
    setIsShowCreateGame(false);
    setPasswordCreateText('');
    setGameNameCreateText('');
  };
  const handleJoinWithPass = (game: any) => {
    setIsShowPassword(true);
    setGameWantJoin(game);
  };
  const handleCreatGame = () => {
    navigation.navigate('GamePlayScreen', {
      gameData: {
        gameName: gameNameCreateText,
        status: 'Waiting...',
        auth: false,
        password: '',
        players: [
          {
            userName: 'newPlayer123',
            displayName: 'New Player',
            avatar:
              'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
          },
        ],
      },
      waiting: true,
    });
    setIsShowCreateGame(false);
    setGameNameCreateText('');
    setPasswordCreateText('');
    setIsShowCreateGame(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView className="flex-1">
        <View className="bg-white h-full w-full ">
          {isShowPopup && (
            <View className="w-[300px] h-[320px] absolute top-[245px] self-center bg-white rounded-[5px] border-[0.5px] border-gray-300 z-[10]">
              <Text className="text-center text-[25px] mt-[20px] font-bold">
                Filter
              </Text>
              <View className="flex flex-col pt-[20px] w-full bg-white">
                <View className="flex flex-row items-center px-[20px]">
                  <CheckBox
                    lineWidth={2}
                    boxType={'square'}
                    disabled={false}
                    tintColor={'#000'}
                    onCheckColor={'#000'}
                    onTintColor={'#000'}
                    animationDuration={0.1}
                    offAnimationType={'fade'}
                    onAnimationType={'fade'}
                    onValueChange={newValue => {
                      setStatusPlaying(newValue);
                    }}
                    value={statusPlaying}
                  />
                  <View className="w-[10px] h-[10px] ml-[10px] rounded-full bg-red-500" />
                  <Text className=" pl-[10px] text-[18px]">Playing</Text>
                </View>
                <View className="flex flex-row items-center px-[20px] pt-[20px]">
                  <CheckBox
                    lineWidth={2}
                    boxType={'square'}
                    disabled={false}
                    tintColor={'#000'}
                    onCheckColor={'#000'}
                    onTintColor={'#000'}
                    animationDuration={0.1}
                    offAnimationType={'fade'}
                    onAnimationType={'fade'}
                    value={statusWaiting}
                    onValueChange={newValue => {
                      setStatusWaiting(newValue);
                    }}
                  />
                  <View className="w-[10px] h-[10px] ml-[10px] rounded-full bg-[#34eb58]" />
                  <Text className="pl-[10px] text-[18px]">Waiting...</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={applyFilters}
                className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[200px] h-[50px] mt-[30px] self-center">
                <Text className="text-center">Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsShowPopup(false)}
                className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[200px] h-[50px] mt-[15px] self-center">
                <Text className="text-center">Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {isShowAccept && (
            <View className="w-[300px] h-[350px] absolute top-[245px] items-center self-center bg-white rounded-[5px] border-[0.5px] border-gray-300 z-[10]">
              <View className="flex flex-row mt-[20px]">
                <Text className="text-center text-[20px] font-bold">Join:</Text>
                <Text className="text-center text-[20px] pl-[5px]">
                  {gameWantJoin?.gameName} ?
                </Text>
              </View>

              <Image
                className="object-contain w-[130px] h-[130px] mt-[20px] rounded-full"
                source={{uri: gameWantJoin?.players[0].avatar}}
              />
              <Text className="text-center text-[20px] my-[10px] font-bold px-[10px]">
                {gameWantJoin?.players[0].userName}
              </Text>
              <View className="flex flex-row justify-center gap-[20px]">
                <TouchableOpacity
                  onPress={() => goToGame()}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsShowAccept(false)}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {isShowPassword && (
            <View className="w-[300px] h-[400px] absolute top-[245px] items-center self-center bg-white rounded-[5px] border-[0.5px] border-gray-300 z-[10]">
              <Text className="text-center text-[20px] font-bold mt-[10px]">
                Please enter password for:
              </Text>
              <Text className="text-center text-[20px] pl-[5px]">
                {gameWantJoin?.gameName}
              </Text>
              <Text className="text-center text-[15px] text-red-500 font-bold">
                {errorMessage}
              </Text>

              <Image
                className="object-contain w-[130px] h-[130px] mt-[10px] rounded-full"
                source={{uri: gameWantJoin?.players[0].avatar}}
              />
              <Text className="text-center text-[20px] mt-[10px] font-bold px-[10px]">
                {gameWantJoin?.players[0].userName}
              </Text>
              <TextInput
                placeholder="Enter room password"
                secureTextEntry={true}
                autoComplete="cc-number"
                maxLength={6}
                placeholderTextColor={'gray'}
                className="h-[40px] border-[1px] w-[230px] my-[20px] px-[20px]"
                value={passwordText}
                keyboardType="numeric"
                onChangeText={handlePasswordChange}
              />
              <View className="flex flex-row justify-center gap-[20px]">
                <TouchableOpacity
                  onPress={() => applyPassword()}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => closePassWordField()}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {isShowCreateGame && (
            <View className="w-[300px] h-[270px] absolute top-[245px] px-[20px] self-center bg-white rounded-[5px] border-[0.5px] border-gray-300 z-[10]">
              <Text className="text-left text-[17px] mt-[20px]">Game name</Text>
              <TextInput
                placeholder="Enter game name"
                secureTextEntry={false}
                maxLength={23}
                keyboardType="default"
                placeholderTextColor={'gray'}
                className="h-[40px] border-[1px] rounded-[5px] border-gray-300 w-[230px] mt-[10px] px-[20px]"
                value={gameNameCreateText}
                onChangeText={handleGameNameCreateChange}
              />
              <View className="flex flex-row items-center pt-[20px]">
                <CheckBox
                  lineWidth={2}
                  boxType={'square'}
                  disabled={false}
                  tintColor={'#000'}
                  onCheckColor={'#000'}
                  onTintColor={'#000'}
                  animationDuration={0.1}
                  offAnimationType={'fade'}
                  onAnimationType={'fade'}
                  value={isPrivate}
                  onValueChange={newValue => {
                    setIsPrivate(newValue);
                  }}
                />
                <Text className="pl-[10px] text-[18px]">Private</Text>
              </View>
              {/* <Text className="text-left text-[17px] mt-[20px]">Password</Text>
              <TextInput
                placeholder="Enter game password"
                secureTextEntry={false}
                autoComplete="cc-number"
                maxLength={6}
                placeholderTextColor={'gray'}
                className="h-[40px] border-[1px] w-[230px] rounded-[5px] border-gray-300 mt-[10px] px-[20px]"
                value={passwordCreateText}
                keyboardType="numeric"
                onChangeText={handlePasswordCreateChange}
              /> */}
              <View className="flex flex-row justify-center pt-[20px] gap-[20px]">
                <TouchableOpacity
                  onPress={() => closeCreateGame()}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCreatGame()}
                  className="flex justify-center rounded-[7px] border-[0.5px] border-gray-500 w-[120px] h-[50px] self-center">
                  <Text className="text-center">Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View className="mx-auto mt-[20px] pt-[10px] pb-[20px] w-full border-b-[0.7px] border-gray-400">
            <SafeAreaView>
              <View className="flex flex-row mx-[20px] items-center border-[0.5px] rounded-[5px]">
                <Image
                  className="object-contain w-[30px] h-[30px] ml-[15px] blur-md invert drop-shadow-xl shadow-white"
                  source={require('../assets/search.png')}
                />
                <TextInput
                  placeholder="Search"
                  maxLength={22}
                  placeholderTextColor={'gray'}
                  className="flex-grow h-[50px] text-[20px] ml-[10px]"
                  onChangeText={handleSearch}
                  value={searchText}
                />
                {/* <TouchableOpacity onPress={() => setIsShowPopup(true)}>
                  <Image
                    className="object-contain w-[30px] h-[30px] mr-[15px]"
                    source={require('../assets/filter.png')}
                  />
                </TouchableOpacity> */}
              </View>
            </SafeAreaView>
          </View>
          <ScrollView
            scrollEnabled={true}
            contentInsetAdjustmentBehavior="scrollableAxes"
            scrollEventThrottle={120}
            ref={scrollViewRef}>
            {/* <Image
              className={'w-full h-full absolute z-[-1]'}
              source={require('../assets/bgblue.png')}
            /> */}
            {searchResults
              .filter(gameData => gameData.status !== 'Playing')
              .map((gameData, index) => (
                <TouchableOpacity
                  activeOpacity={100}
                  key={index}
                  className={`border-b-[0.5px] border-gray-300 ${
                    gameData.status === 'Playing' ? 'bg-gray-200' : 'bg-white'
                  }`}>
                  <View className="flex flex-2 flex-row pt-[20px] pb-[10px] items-center px-[20px] ">
                    {gameData.players.map((player, index) => (
                      <View
                        key={index}
                        className="flex flex-1 flex-row items-center bg-[#6c3af3] border-[#ecc200] border-[2px] p-[10px] rounded-l-full rounded-r-[10px]">
                        {index === 1 && <Text className="pr-[30px]">vs</Text>}
                        {player.avatar ? (
                          <Image
                            source={{
                              uri:
                                player.avatar !== ''
                                  ? player.avatar
                                  : 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
                            }}
                            className="w-[40px] h-[40px] rounded-full mr-[10px] border-[#ecc200] border-[2px]"
                          />
                        ) : (
                          <Image
                            source={{
                              uri: 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
                            }}
                            className="w-[30px] h-[30px] rounded-full mr-[10px]"
                          />
                        )}
                        <View className="flex flex-col">
                          <Text className="font-bold text-[13px] mr-[10px] uppercase text-white">
                            {player.userName}
                          </Text>
                          <View className="flex flex-row mt-[5px] items-center justify-center">
                            <Image
                              source={require('../assets/trophy.png')}
                              className="w-[20px] h-[20px]"
                            />
                            <Text className="font-bold text-[13px] text-white ml-[5px]">
                              {player?.wonGames}
                            </Text>
                            <Text className="font-normal text-[13px] ml-[10px] mt-[5px] text-white">
                              Least Moves To Win:{' '}
                              <Text className="font-bold">
                                {player?.wonGames}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View
                    key={index}
                    className="px-[20px] pb-[20px] flex flex-row border-b-[0.5px] border-gray-300 ">
                    <View className="flex flex-col mt-[5px]">
                      <Text className="font-bold text-[18px]">
                        {gameData.gameName}
                      </Text>
                      <View className="flex flex-row py-[10px] items-center">
                        <View
                          className={`w-[10px] h-[10px] rounded-full ${
                            gameData.status === 'Playing'
                              ? 'bg-red-500'
                              : 'bg-[#34eb58]'
                          }`}
                        />
                        <Text className="pl-[10px]">{gameData.status}</Text>
                      </View>
                    </View>
                    <View className=" flex-1 mr-[20px] h-full flex flex-row justify-end items-center">
                      <TouchableOpacity
                        onPress={() =>
                          gameData.private
                            ? handleJoinWithPass(gameData)
                            : handleJoinGame(gameData)
                        }
                        disabled={gameData.status === 'Playing'}
                        className={`border-[2px] bg-[#6c3af3] border-[#ecc200] w-[150px] rounded-[8px] h-[40px] flex flex-row justify-center items-center
                      ${gameData.status === 'Playing' ? 'bg-[#7867a5]' : ''}`}>
                        {/* {gameData.auth && (
                          <Image
                            source={require('../assets/lock.png')}
                            className="w-[20px] h-[20px] absolute left-[10px]"
                          />
                        )} */}
                        <Text
                          className={`absolute text-center font-bold text-white ${
                            gameData.status === 'Playing'
                              ? 'text-[#bcb2d6]'
                              : ''
                          }`}>
                          Join Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <View className="px-[20px] rounded-[10px] border-t-[0.7px] border-gray-400">
            <TouchableOpacity
              onPress={() => setIsShowCreateGame(true)}
              className="flex mt-[20px] mb-[20px] bg-[#6c3af3] border-[#ecc200] w-full border-[2px] rounded-[10px]">
              <Text className="text-[20px] text-center  py-[20px] rounded-[10px] text-white font-bold">
                + Create a Game
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MenuScreen;
