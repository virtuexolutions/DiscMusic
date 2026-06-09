import { ScrollView, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import OtherLocation from '../Components/OtherLocation';
import { windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';
import Loader from '../Components/Loader';

const EventScreen = (prop) => {
  const { eventId, artist_name } = prop?.route?.params;
  const token = useSelector(state => state.authReducer.token)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)




  const getEvents = async () => {
    const url = `auth/events-artist-id/${eventId}`
    setLoading(true)
    const response = await Get(url, token)
    setLoading(false)
    if (response != undefined) {
      setEvents(response?.data?.event_list)
    }
  }



  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}
        imageStyle={styles.image}>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
          }}
          style={styles.container}>
          <CustomHeader leftIcon
            showBack={true}
          // text={artist_name || ''} 
          // subtext={''}
          />

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.74,
            }}>
            <View style={styles.text_con}>
              <CustomText isBold style={styles.title}>
                near Los Angeles
              </CustomText>
              <CustomText style={styles.sub_text}>
                this artist has no upcomin concerts near Los Angeles
              </CustomText>
            </View>
            <TouchableOpacity onPress={() => {
              navigationService.navigate('SearchLocation')
            }} style={styles.btn_Con}>
              <CustomText
                style={{
                  fontSize: moderateScale(11, 0.6),
                  color: Color.white,
                }}>
                change location
              </CustomText>
            </TouchableOpacity>
          </View>

          <CustomText
            isBold
            style={[
              styles.title,
              {
                marginBottom: moderateScale(10, 0.6),
                marginTop: moderateScale(20, 0.6),
              },
            ]}>
            other location
          </CustomText>
          {
            loading ? <Loader animation={true} /> :
              <FlatList
                data={events}
                renderItem={({ item, index }) => {
                  return <OtherLocation ocation item={item} />;
                }}
                ListEmptyComponent={<CustomText>No Events</CustomText>}
                keyExtractor={(item, index) => index.toString()}
              />
          }


        </ScrollView>
        <MinimisedPlayer style={{ bottom: -20, height: windowHeight * 0.18 }} />
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

  text_con: {
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.6),
  },

  title: {
    color: Color.white,
    fontSize: moderateScale(19, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
    padding: moderateScale(2, 0.6),
    width: windowWidth * 0.65,
  },
  details: {
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: '#222529',
    width: windowWidth * 0.87,
    marginTop: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderTopEndRadius: 35,
    borderBottomEndRadius: 35,
  },

  card: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(10, 0.6),
    borderBottomWidth: 0.5,
    marginVertical: moderateScale(5, 0.6),
    borderBottomColor: Color.darkGray,
  },
  Circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    marginRight: moderateScale(10, 0.6),
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
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
    marginTop: moderateScale(20, 0.6),
  },
});

export default EventScreen;
