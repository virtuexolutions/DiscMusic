import { ScrollView, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Circle } from 'react-native-svg';
import { Custom } from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import OtherLocation from '../Components/OtherLocation';
import { mode } from 'native-base/lib/typescript/theme/tools';
import MusicModal from '../Components/MusicModal';
import ProfileComponent from '../Components/ProfileComponent';
import CustomButton from '../Components/CustomButton';
import Label from '../Components/Label';
import ToggleSwitchWithInfo from '../Components/ToggleSwitchWithInfo';
import InfoText from '../Components/InfoText';
import TitleWithDescription from '../Components/TitleWithDescription';
import StorageSettings from '../Components/StorageSettings';
import AboutInfo from '../Components/AboutInfo';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import navigationService from '../navigationService';
import { setUserLogoutAuth, setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const [audioQuality, setAudioQuality] = useState(false);
  const playBackSettings = [
    {
      key: 'gapless',
      title: 'Gapless',
      description: 'Allows gapless playback',
      default: true,
    },
    {
      key: 'automix',
      title: 'Automix',
      description:
        'Allow seamless transitions between songs on select playlists.',
      default: true,
    },
    {
      key: 'explicit',
      title: 'Allow explicit content',
      description: 'Turn on to play explicit content is labelled with a tag',
      default: false,
    },
    {
      key: 'unplayable',
      title: 'Show unplayable songs',
      description: 'Show songs that are unplayable.',
      default: false,
    },
    {
      key: 'normalize',
      title: 'Normalize volume',
      description: 'Set the same volume level for all tracks',
      default: true,
    },
    {
      key: 'mono',
      title: 'Mono audio',
      description: 'Makes the left and right speakers play the same audio.',
      default: false,
    },
    {
      key: 'broadcast',
      title: 'Device broadcast status',
      description:
        'Allow other apps on your device to see what you are listening to.',
      default: false,
    },
    {
      key: 'autoplay',
      title: 'Autoplay',
      description:
        "Enjoy nonstop listening. When your audio ends, we'll play you something similar.",
      default: true,
    },
    {
      key: 'canvas',
      title: 'Canvas',
      description: 'Display short, looping visuals on tracks.',
      default: true,
    },
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}
        imageStyle={styles.image}>
        <CustomHeader
          showBack
          RightIcon={true}
          notifications={true}
          leftIcon
          text={'Settings'}
          subtext={''}
        />
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingTop: moderateScale(10, 0.2),
            paddingBottom: moderateScale(80, 0.6),
            alignItems: 'center',
          }}
          style={styles.container}>
          <ProfileComponent />
          <CustomButton
            isGradient
            text={'Go Premium'}
            textColor={Color.white}
            width={windowWidth * 0.5}
            height={windowHeight * 0.05}
            // onPress={() => { setIsVisible(false) }}
            onPress={() => {
              // navigation.navigate("PremiumScreen")
            }}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={windowWidth / 2}
            fontSize={moderateScale(16, 0.3)}
          />
          <View style={styles.actions}>
            <Label style={styles.label} text={'Data Saver'} />
            <ToggleSwitchWithInfo
              title="Audio quality"
              description="sets your audio quality to low (equivalent to 24kbit/s) and disables artist canvases.)"
              on={audioQuality}
              onToggle={() => {
                setAudioQuality(prev => !prev);
              }}
            />
            <Label style={styles.label} text={'Video Podcasts'} />
            <ToggleSwitchWithInfo
              title="Download audio only"
              description="Save video podcasts as audio only."
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <ToggleSwitchWithInfo
              title="Stream audio only"
              description="Play video podcasts as audio only when not on wifi."
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <InfoText
              containerStyle={{ marginTop: verticalScale(10) }}
              text={
                'Note: video is not streamed when the spotify app is backgrounded.'
              }
            />
            <Label style={styles.label} text={'PlayBack'} />
            {playBackSettings.map((setting, index) => (
              <ToggleSwitchWithInfo
                key={setting.key}
                on={setting.default}
                description={setting.description}
                title={setting.title}
              />
            ))}
            <Label style={styles.label} text={'Languages'} />
            <TitleWithDescription
              title="Languages for music"
              description="Choose your preferred languages for music."
            />
            <Label style={styles.label} text={'Devices'} />
            <TitleWithDescription
              title="connect to a device"
              description="listen to and control spotify on your devices."
            />
            <ToggleSwitchWithInfo
              title="Show local devices only"
              description="Only show devices on your local wifi  or ethernet in the devices menu."
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <ToggleSwitchWithInfo
              title="spotify connect in background"
              description="Allow spotify connect to keep spotify running when the app is in background"
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <StorageSettings />
            <Label style={styles.label} text="Notifications" />
            <ToggleSwitchWithInfo
              title="Notifications"
              description="choose which notification to receive."
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <Label style={styles.label} text="Advertisements" />
            <ToggleSwitchWithInfo
              title="Spotify ad partner preferences"
              description="Contral how ads are targeted to me based on information gathered from advertising partners."
              on={false}
              onToggle={() => {
                // setAudioQuality(prev => !prev)
              }}
            />
            <AboutInfo />
            <Label style={styles.label} text={'Other'} />
            <TouchableOpacity
              // style={{backgroundColor: 'red'}}
              onPress={() => {
                // dispatch(setUserLogoutAuth());
                console.log('first =============== >>>>> log out hereeeeeeeee');
              }}>
              <TitleWithDescription
                onPress={() => {
                  dispatch(setUserLogoutAuth());
                  console.log(
                    'first =============== >>>>> log out hereeeeeeeee',
                  );
                }}
                title="Log Out"
                description="You are logged in as suchir"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* <MinimisedPlayer style={styles.player} /> */}
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },

  row_con: {
    flexDirection: 'row',
    marginTop: moderateScale(10, 0.6),
    backgroundColor: '#282C30',
    borderRadius: 20,
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(19, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
    padding: moderateScale(2, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
  },
  details: {
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: '#1C1F22',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    alignSelf: 'center',
  },
  card_con: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    backgroundColor: '#222529',
    paddingVertical: moderateScale(10, 0.6),
    // height: windowHeight * 0.1,
    width: windowWidth * 0.85,
    marginTop: moderateScale(10, 0.6),
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  card_image: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.158,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    marginRight: moderateScale(10, 0.6),
  },
  Circle: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: (windowWidth * 0.18) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10, 0.6),
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    // position: 'absolute',
  },

  btn_Con: {
    flexDirection: 'row',
    width: windowWidth * 0.28,
    marginLeft: moderateScale(5, 0.6),
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    alignSelf: 'center',
    backgroundColor: '#1C1F22',
    // marginTop: moderateScale(20, 0.6),
  },
  image_circle: {
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: (windowHeight * 0.08) / 2,
    overflow: 'hidden',
    backgroundColor: '#1C1F22',
  },

  image_sec: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    backgroundColor: '#1C1F22',
  },
  art_image: {
    width: windowHeight * 0.065,
    height: windowHeight * 0.065,
    borderRadius: (windowHeight * 0.065) / 2,
    overflow: 'hidden',
  },
  inner_con: {
    backgroundColor: '#282C30',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  actions: {
    marginTop: verticalScale(25),
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    backgroundColor: '#282C30',
    borderRadius: moderateScale(20),
  },
  player: {
    bottom: scale(30),
    paddingBottom: verticalScale(30),
  },
  label: { marginTop: moderateScale(12, 0.2) },
});

export default Settings;
