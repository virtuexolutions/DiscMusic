import { ScrollView } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from '../Components/CustomText';

const LoginScreen = () => {
  return (
    <>
      <CustomStatusBar
        backgroundColor={
        Color.black
        }
        barStyle={'light-content'}
      />
   
        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingTop: windowHeight * 0.1,
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
            <CustomText>hello welcome to discapp</CustomText>
       
        </ScrollView>
    </>
  );
};


const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image1: {
    width: 200,
    height: 200,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(15, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
