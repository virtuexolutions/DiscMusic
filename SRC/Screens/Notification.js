import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import NotificationCard from '../Components/NotificationCard';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useIsFocused } from '@react-navigation/native';
import { Pusher } from "@pusher/pusher-websocket-react-native";
import { setNotificationCount } from '../Store/slices/common';

const Notification = () => {
  const token = useSelector(state => state.authReducer.token);
  const userdata = useSelector(state => state.commonReducer.userData);
  const isFocus = useIsFocused();

  const [notificationList, setNotificationList] = useState([]);
  console.log("🚀 ~ Notification ~ notificationList:", notificationList)
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pusher = Pusher.getInstance();

  const getNotification = async (pageNum = 1) => {
    if (isLoading) return;
    if (pageNum > 1 && !hasMore) return;

    setIsLoading(true);
    try {
      const url = `auth/notifications?page=${pageNum}`;
      const response = await Get(url, token);
      // console.log("🚀 ~ getNotification ~ response:", JSON.stringify(response?.data?.data, null, 2));

      if (response != undefined) {
        const newData = response?.data?.data?.notifications
        const lastPage = response?.data?.data?.last_page || 1;

        if (pageNum === 1) {
          setNotificationList(newData);
        } else {
          setNotificationList(prev => [...prev, ...newData]);
        }

        setHasMore(pageNum < lastPage);
        setPage(pageNum + 1);
      }
    } catch (e) {
      console.error('Notification Error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Load more — scroll end pe
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      getNotification(page);
    }
  };

  // ✅ Pull to refresh
  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    getNotification(1);
  };

  useEffect(() => {
    // ✅ Screen focus hone par fresh load
    handleRefresh();
  }, [isFocus]);




  useEffect(() => {
    // console.log("pusher.connectionState", pusher.connectionState)

    // initRtm();
    async function connectPusher() {
      try {
        await pusher.init({
          apiKey: '350174043aff1aa6073b',
          cluster: 'ap2',
        });

        myChannel = await pusher.subscribe({
          channelName: `profile-channel-${userdata?.id}`,
          onSubscriptionSucceeded: (channelName, conversationId) => {
            // dispatch(setPusherInstance(pusher));

          },
          onEvent: event => {
            console.log("🚀 ~ connectPusher ~ event:", event)
            const dataString = JSON.parse(event.data);

            if (dataString) {
              dispatch(setNotificationCount(1));
            }

          },
        });
        await pusher.connect();
      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    }
    if (userdata?.id && pusher.connectionState == "DISCONNECTED") {
      connectPusher();
    }

  }, [])
  // ✅ Footer — loading spinner
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <ActivityIndicator
        color={Color.themeColor}
        size="small"
        style={{ marginVertical: moderateScale(15, 0.6) }}
      />
    );
  };

  // ✅ Header component — ScrollView ki zaroorat nahi
  const renderHeader = () => (
    <View>
      <CustomText isBold style={styles.title}>
        what's new
      </CustomText>
      <CustomText style={styles.sub_text}>
        {`the latest releases from artists, podcasts, and shows you \nfollow.`}
      </CustomText>
      <View style={{ flexDirection: 'row', marginTop: moderateScale(20, 0.6) }}>
        <TouchableOpacity style={styles.btn_Con}>
          <CustomText style={{ fontSize: moderateScale(14, 0.6), color: Color.white }}>
            music
          </CustomText>
        </TouchableOpacity>
      </View>
      <CustomText isBold style={[styles.title, { marginTop: moderateScale(20, 0.6) }]}>
        new
      </CustomText>
    </View>
  );

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
        <CustomHeader
          leftIcon
          showBack={true}
          text={'notifications'}
          subtext={''}
        />

        {/* ✅ FlatList — ScrollView hata diya, pagination kaam karega */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
            paddingHorizontal: moderateScale(10, 0.6),
          }}
          data={notificationList}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => {
            return <NotificationCard item={item} />;
          }}

          // ✅ Pagination
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}

          // ✅ Pull to refresh
          refreshing={isLoading && page === 1}
          onRefresh={handleRefresh}
        />

        <MinimisedPlayer />
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(20, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(14, 0.6),
    padding: moderateScale(2, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  btn_Con: {
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    backgroundColor: '#1C1F22',
    marginRight: moderateScale(10, 0.6),
  },
});

export default Notification;