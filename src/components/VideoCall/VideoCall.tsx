// import React, {useState} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import {RootState} from '../../../redux/store';
// import {connect} from 'react-redux';
// import {Dispatch} from 'redux';

// const VideoCall = ({navigation}) => {
//   const [videoCall, setVideoCall] = useState(true);

//   const connectionData = {
//     appId: '090f279738144821951838c909e04501',
//     channel: 'E-Learning-class1',
//     token:
//       '007eJxTYNAx014uvS1hcmzv84ZIgX6LZZwyM63/3z+posx6Vlmu7IkCg4GlQZqRuaW5sYWhiYmFkaGlqaGFsUWypYFlqoGJqYHhr8sbUhoCGRnmlK1hZWSAQBBfkMFV1yc1sSgvMy9dNzknsbjYkIEBAAE5IUQ=',
//   };

//   const rtcCallbacks = {
//     EndCall: () => {
//       setVideoCall(false);
//       navigation?.goBack();
//     },
//   };
//   return videoCall ? (
//     <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
//   ) : null;
// };

// const mapStateToProps = (state: RootState) => {
//   const {themeReducer} = state;
//   const {themeMode, isDark, colors} = themeReducer;
//   return {
//     themeMode,
//     isDark,
//     colors,
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);

import * as React from 'react';
import { useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_URL = 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud';
const DEFAULT_TOKEN = '';

const URL_KEY = 'url';
const TOKEN_KEY = 'token';

export default function VideoCall({navigation, route}: any) {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [token, setToken] = useState(DEFAULT_TOKEN);

  useEffect(() => {
    AsyncStorage.getItem(URL_KEY).then((value) => {
      if (value) {
        setUrl(value);
      }
    });

    AsyncStorage.getItem(TOKEN_KEY).then((value) => {
      if (value) {
        setToken(value);
      }
    });
  }, []);

  const { colors } = useTheme();

  let saveValues = (saveUrl: string, saveToken: string) => {
    AsyncStorage.setItem(URL_KEY, saveUrl);
    AsyncStorage.setItem(TOKEN_KEY, saveToken);
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>URL</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setUrl}
        value={url}
      />

      <Text style={{ color: colors.text }}>Token</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setToken}
        value={token}
      />

      <Button
        title="Connect"
        onPress={() => {
          navigation.push('RoomPage', { url: url, token: token });
        }}
      />

      <View style={styles.spacer} />

      <Button
        title="Save Values"
        onPress={() => {
          saveValues(url, token);
        }}
      />

      <View style={styles.spacer} />

      <Button
        title="Reset Values"
        onPress={() => {
          saveValues(DEFAULT_URL, DEFAULT_TOKEN);
          setUrl(DEFAULT_URL);
          setToken(DEFAULT_TOKEN);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  spacer: {
    height: 10,
  },
});
