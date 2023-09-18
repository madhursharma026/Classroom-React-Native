import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import COLORS from '../../themes/colors';
import BackArrow from '../../assets/images/svg/BackArrow.svg';
import User_icon from '../../assets/images/svg/User_icon.svg';
import Mic_Off from '../../assets/images/svg/Mic_Off.svg';
import Mic_On from '../../assets/images/svg/Mic_On.svg';
import Mute_volume_icon from '../../assets/images/svg/Mute_volume_icon.svg';
import High_volume_icon from '../../assets/images/svg/High_volume_icon.svg';
import Call_Decline from '../../assets/images/svg/Call_Decline.svg';

const appId = '090f279738144821951838c909e04501';
const channelName = 'E-Learning-class1';
const token =
  '007eJxTYNAx014uvS1hcmzv84ZIgX6LZZwyM63/3z+posx6Vlmu7IkCg4GlQZqRuaW5sYWhiYmFkaGlqaGFsUWypYFlqoGJqYHhr8sbUhoCGRnmlK1hZWSAQBBfkMFV1yc1sSgvMy9dNzknsbjYkIEBAAE5IUQ=';
const uid = 0;

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
};

const Header = ({onBackPress}) => {
  console.log('Header ===> ');

  return (
    <View
      style={{
        width: '100%',
        height: 40,
        backgroundColor: COLORS.BLUE_STONE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            onBackPress();
          }}
          style={{height: 20, aspectRatio: 1}}>
          <BackArrow height={'100%'} width={'100%'} fill={'white'} />
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
        Voice Call
      </Text>
      <View style={{flex: 1}} />
    </View>
  );
};

const AudioCall = ({navigation}) => {
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [isOnSpeaker, setIsOnSpeaker] = useState<boolean>(false);
  const [isOnMute, setIsOnMute] = useState<boolean>(false);

  const [isStartCall, setIsStartCall] = useState(false);

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVoiceSDKEngine();
  });

  useEffect(() => {
    enableSpeaker();
  }, [isOnSpeaker]);

  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  function showMessage(msg: string) {
    setMessage(msg);
  }

  const enableSpeaker = () => {
    if (Platform.OS === 'android') {
      agoraEngineRef.current?.setEnableSpeakerphone(isOnSpeaker);
    } else if (Platform.OS === 'ios') {
      agoraEngineRef.current?.setDefaultAudioRouteToSpeakerphone(isOnSpeaker);
    }
  };

  const toggleMute = () => {
    agoraEngineRef.current?.muteLocalAudioStream(!isOnMute);
    setIsOnMute(!isOnMute);
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.main}>
      {/* <StatusBar backgroundColor={COLORS.BLUE_STONE} /> */}
      <View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header onBackPress={() => onBackPress()} />

          <View>
            <View
              style={{
                width: '35%',
                aspectRatio: 1,
                borderRadius: 100,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                marginBottom: 20,
              }}>
              <User_icon height={'100%'} width={'100%'} fill={'white'} />
            </View>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              My Phone
            </Text>
            {isStartCall && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                {isJoined ? 'Connected' : 'Connecting...'}
              </Text>
            )}
          </View>

          {/* <Text style={styles.head}>Agora Video Calling Quickstart</Text>
        <View style={styles.btnContainer}>
          <Text onPress={join} style={styles.button}>
            Join
          </Text>
          <Text onPress={leave} style={styles.button}>
            Leave
          </Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          {isJoined ? (
            <Text>Local user uid: {uid}</Text>
          ) : (
            <Text>Join a channel</Text>
          )}
          {isJoined && remoteUid !== 0 ? (
            <Text>Remote user uid: {remoteUid}</Text>
          ) : (
            <Text>Waiting for a remote user to join</Text>
          )}
          <Text>{message}</Text>

          {isJoined && (
            <TouchableOpacity
              onPress={() => {
                setIsOnSpeaker(!isOnSpeaker);
              }}>
              <Text>Call On Speaker</Text>
            </TouchableOpacity>
          )}
        </ScrollView> */}
        </View>
        {!isStartCall ? (
          <TouchableOpacity
            onPress={() => {
              setIsStartCall(true);
              join();
            }}
            style={{
              backgroundColor: 'green',
              marginHorizontal: 20,
              marginBottom: 20,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
              }}>
              Call
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 30,
              marginBottom: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsOnSpeaker(!isOnSpeaker);
              }}
              style={{
                height: 60,
                aspectRatio: 1,
                padding: 17,
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              {isOnSpeaker ? (
                <Mute_volume_icon height={'100%'} width={'100%'} />
              ) : (
                <High_volume_icon height={'100%'} width={'100%'} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleMute();
              }}
              style={{
                height: 60,
                aspectRatio: 1,
                padding: 13,
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              {isOnMute ? (
                <Mic_Off height={'100%'} width={'100%'} />
              ) : (
                <Mic_On height={'100%'} width={'100%'} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsStartCall(false);
                setIsOnMute(false);
                setIsOnSpeaker(false);
                leave();
              }}
              style={{
                height: 60,
                aspectRatio: 1,
                padding: 13,
                alignItems: 'center',
                backgroundColor: 'red',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Call_Decline height={'100%'} width={'100%'} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center', backgroundColor: COLORS.BLUE_STONE},
  scroll: {flex: 1, width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
});

export default AudioCall;
