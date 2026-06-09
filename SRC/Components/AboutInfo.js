import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Label from './Label';
import { launchCamera } from 'react-native-image-picker';
import { verticalScale } from 'react-native-size-matters';
import TitleWithDescription from './TitleWithDescription';
import navigationService from '../navigationService';

const AboutInfo = () => {
  const appInfoList = [
    {
      key: 'download',
      title: 'Downloads',
      description: 'All the stuff you download on discmusic.',
      type: 'link',
      onPress: () => { navigationService.navigate('DownloadTrack') }
    },
    {
      key: 'Recently played',
      title: 'Recently played',
      description: 'All the stuff you Recent played.',
      type: 'link',
      onPress: () => { navigationService.navigate('RecentlyPlayed') }
    },
    {
      key: 'version',
      title: 'Version',
      description: '8.8.32.508',
      type: 'text', // no action
    },
    // {
    //   key: 'third_party',
    //   title: 'Third-party software',
    //   description: 'Sweet software that helped us',
    //   type: 'link',
    // },
    {
      key: 'terms',
      title: 'Terms & Conditions',
      description: 'All the stuff you need to know.',
      type: 'link',
      onPress: () => { navigationService.navigate('TermsAndCondition') }
    },

    {
      key: 'privacy',
      title: 'Privacy policy',
      description: 'Important for both of us.',
      type: 'link',
      onPress: () => { navigationService.navigate('PrivacyPolicy') }

    },
    {
      key: 'rules',
      title: 'Platform rules',
      description: 'Help keep discmusic safe for all.',
      type: 'link',
    },
    {
      key: 'support',
      title: 'Support',
      description: 'Get help from us and the community',
      type: 'link',
      onPress: () => { navigationService.navigate('Support') }
    },
    // {
    //   key: 'reset password',
    //   title: 'reset password',
    //   description: 'Securely reset your account password.',
    //   type: 'link',
    //   onPress: () => {
    //     navigationService.navigate('ChangePassword');
    //   },
    // },
  ];

  return (
    <View style={styles.container}>
      <Label text="About" style={styles.label} />
      {appInfoList.map((info, index) => (
        <TitleWithDescription
          onPress={info.onPress}
          key={index}
          title={info.title}
          description={info.description}
          style={{ paddingVertical: verticalScale(8) }}
        />
      ))}
    </View>
  );
};

export default AboutInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    marginVertical: verticalScale(10),
  },
});
