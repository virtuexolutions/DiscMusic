import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useSelector } from 'react-redux';
import Color from './Assets/Utilities/Color';
import navigationService from './navigationService';
import AboutArtist from './Screens/AboutArtist';
import ChangePassword from './Screens/ChangePassword';
import DetailedScreen from './Screens/DetailedScreen';
import DetailScreen from './Screens/DetailScreen';
import EnterEmail from './Screens/EnterEmail';
import EventScreen from './Screens/EventScreen';
import GetStarted from './Screens/GetStarted';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import MusicCodeScreen from './Screens/MusicCodeScreen';
import MusicDetailsScreen from './Screens/MusicDetailsScreen';
import MusicPlayerScreen from './Screens/MusicPlayerScreen';
import Notification from './Screens/Notification';
import PlaylistScreen from './Screens/PlaylistScreen';
import PremiumScreen from './Screens/PremiumScreen';
import Profile from './Screens/Profile';
import RecentlyPlayed from './Screens/RecentlyPlayed';
import ResetPassword from './Screens/ResetPassword';
import ReviewYourPlan from './Screens/ReviewYourPlan';
import ScanScreen from './Screens/ScanScreen';
import SearchScreen from './Screens/SearchScreen';
import Settings from './Screens/Setting';
import SignupScreen from './Screens/Signup';
import VerifyNumber from './Screens/VerifyNumber';
import ViewArtistLibrary from './Screens/ViewArtistLibrary';
import Walkthrough from './Screens/Walkthrough';
import YourLibrary from './Screens/YourLibrary';
import { windowWidth } from './Utillity/utils';
import SearchArtist from './Screens/SearchArtist';
import MusicBarcode from './Components/MusicBarcode';
import SavedPlaylist from './Screens/SavedPlaylist';
import SearchLocation from './Screens/SearchLocation';

const AppNavigator = () => {
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const token = useSelector(state => state.authReducer.token);
  const isProfileCreated = useSelector(state => state.commonReducer.isProfile);
  const favArtist = useSelector(state => state.commonReducer.favArtist);
  console.log('favArtist====================== >>>>>>> here from appNavigation', favArtist);

  const userdata = useSelector(state => state.commonReducer.userData);


  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {

    const firstScreen =
      walkThrough == false
        ? 'GetStarted'
        : [null, undefined, ''].includes(token)
          ? 'LoginScreen'
          : isProfileCreated == false || 0
            ? 'Profile' : favArtist?.length === 0
              ? 'SearchArtist'
              : 'TabNavigation';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          // initialRouteName={'Wallet'}
          initialRouteName={firstScreen}
          screenOptions={{ headerShown: false }}>
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="SignupScreen" component={SignupScreen} />
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="PlaylistScreen" component={PlaylistScreen} />
          <RootNav.Screen name="SearchLocation" component={SearchLocation} />

          <RootNav.Screen
            name="MusicDetailsScreen"
            component={MusicDetailsScreen}
          />

          <RootNav.Screen
            name="MusicPlayerScreen"
            component={MusicPlayerScreen}
          />
          <RootNav.Screen name="DetailScreen" component={DetailScreen} />
          <RootNav.Screen name="MusicBarcode" component={MusicBarcode} />


          <RootNav.Screen name="AboutArtist" component={AboutArtist} />
          <RootNav.Screen name="EventScreen" component={EventScreen} />
          <RootNav.Screen name="HomeScreen" component={HomeScreen} />
          <RootNav.Screen name="DetailedScreen" component={DetailedScreen} />
          <RootNav.Screen name="MusicCodeScreen" component={MusicCodeScreen} />
          <RootNav.Screen name="RecentlyPlayed" component={RecentlyPlayed} />
          <RootNav.Screen name="Notification" component={Notification} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="EnterEmail" component={EnterEmail} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="SearchArtist" component={SearchArtist} />



          <RootNav.Screen name="ReviewYourPlan" component={ReviewYourPlan} />
          <RootNav.Screen name="PremiumScreen" component={PremiumScreen} />

          {/* <RootNav.Screen name="YourLibrary" component={YourLibrary} /> */}
          <RootNav.Screen
            name="ViewArtistLibrary"
            component={ViewArtistLibrary}
          />
          <RootNav.Screen name="Settings" component={Settings} />
          <RootNav.Screen name="ScanScreen" component={ScanScreen} />
          <RootNav.Screen name="SavedPlaylist" component={SavedPlaylist} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          width: windowWidth * 0.95,
          alignSelf: 'center',
          height: windowWidth * 0.18,
          marginBottom: 10,
          borderRadius: windowWidth / 2,
          backgroundColor: 'transparent',
          position: 'absolute',
          elevation: 0,
          borderWidth: 0,
          borderTopWidth: 0,
          marginLeft: moderateScale(10, 0.6),
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: moderateScale(10, 0.6),
          paddingTop: moderateScale(6, 0.6),
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#2A2E35', '#1D2025', '#171A1F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              flex: 1,
              borderRadius: windowWidth / 2,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: Color.darkGray,
            }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconType = Ionicons;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
            size = focused ? moderateScale(20, 0.3) : moderateScale(18, 0.3);
            color = focused ? Color.white : Color.veryLightGray;
            IconType = Octicons;
          } else if (route.name === 'SearchScreen') {
            iconName = 'search';
            IconType = Ionicons;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            color = focused ? Color.white : Color.veryLightGray;
          } else if (route.name === 'YourLibrary') {
            iconName = 'layers-outline';
            IconType = Ionicons;
            size = focused ? moderateScale(30, 0.3) : moderateScale(25, 0.3);
            color = focused ? Color.white : Color.veryLightGray;
          } else if (route.name === 'PremiumScreen') {
            iconName = 'shapes';
            IconType = Ionicons;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            color = focused ? Color.white : Color.veryLightGray;
          }
          return <IconType name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.white,
        tabBarInactiveTintColor: Color.veryLightGray,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: moderateScale(12, 0.3),
          marginBottom: 5,
        },
      })}>
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Tabs.Screen
        name="YourLibrary"
        component={YourLibrary}
        options={{ title: 'Your Library' }}
      />
      <Tabs.Screen
        name="PremiumScreen"
        component={PremiumScreen}
        options={{ title: 'Premium' }}
      />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
