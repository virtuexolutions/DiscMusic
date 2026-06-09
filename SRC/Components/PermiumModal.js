import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { baseUrl } from '../Config';
import { useLikeTrack } from '../Hooks/useLikeTrack';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import { Icon } from 'native-base';
import navigationService from '../navigationService';

const PermiumModal = ({ track, setRef, rbRef, from, item }) => {
    // console.log(item?.cover_image, "itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm <<<<<<<<<<<<<<<<<<<<<<<<====================================", track)
    const { toggleLike, isLiked } = useLikeTrack(track);
    // const from = 'download'

    return (
        <RBSheet
            ref={ref => (rbRef.current = ref)}
            closeOnDragDown={true}
            height={450}
            dragFromTopOnly={true}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: windowHeight * 0.45,
                },
            }}>
            <View
                style={styles.mainView}>
                <View
                    style={styles.topView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(10, .6) }}>
                        <View style={styles.logo}>
                            <CustomImage
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                source={require('../Assets/Images/logoSplash.png')}
                            />
                        </View>
                        <CustomText
                            style={styles.title}>
                            permimun
                        </CustomText>
                    </View>
                    {from == 'import' && <View style={styles.image_con}>
                        <CustomImage
                            source={track?.artwork ? { uri: track.artwork } : item?.cover_image ? { uri: `${baseUrl}/storage/${item.cover_image}` } : require('../Assets/Images/bottom.png')}
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </View>}


                    <CustomText
                        numberOfLines={2}
                        style={{
                            paddingVertical: moderateScale(19, .6),
                            color: '#ffffffff',
                            fontSize: moderateScale(16, 0.6),
                        }}>
                        {from == 'import' ? `want to download ${item?.title} song ?` : `want to control how to listen ?`}
                    </CustomText>
                    {from != 'import' && <><View>
                        <View style={styles.row_con}>
                            <View style={styles.icon_con}>
                                <Icon as={Ionicons} name='shuffle' size={moderateScale(24, 0.6)} color={Color.white} />
                            </View><View style={{
                                marginHorizontal: moderateScale(10, .6)
                            }}>
                                <CustomText
                                    style={styles.title}>
                                    list with similar songs
                                </CustomText>
                                <CustomText
                                    style={[styles.title, { color: 'gray', fontSize: moderateScale(13, .6) }]}>
                                    with our free services
                                </CustomText>

                            </View>
                        </View>
                    </View>
                        <View>
                            <View style={styles.row_con}>
                                <View style={styles.icon_con}>
                                    <Icon as={Feather} name='list' size={moderateScale(24, 0.6)} color={Color.white} />
                                </View><View style={{
                                    marginHorizontal: moderateScale(10, .6)
                                }}>
                                    <CustomText
                                        style={styles.title}>
                                        full control over your listening
                                    </CustomText>
                                    <CustomText
                                        style={[styles.title, { color: 'gray', fontSize: moderateScale(13, .6) }]}>
                                        play in any order,shuffle or smart shuffle with premium.
                                    </CustomText>

                                </View>
                            </View>
                        </View>
                    </>}
                    {from == 'import' && <CustomText
                        style={{
                            color: '#7F8489',
                            fontSize: moderateScale(13, 0.6),
                            textAlign: 'center',
                        }}>
                        download music to listen without Wi-Fi and save your mobile data with permimun.
                    </CustomText>}

                    <CustomButton
                        onPress={() => {

                            navigationService.navigate('PremiumScreen')
                            rbRef.current.close()
                        }}
                        marginTop={moderateScale(20, .6)}
                        textColor={Color.white}
                        borderRadius={50}
                        text={from == 'import' ? 'Get Permium' : 'try 1 month for $ 0'}
                        width={windowWidth * 0.5}
                        bgColor={Color.themeSkyBlue}
                        height={windowHeight * 0.07}
                    />
                    {from == 'import' && <CustomText
                        onPress={() => rbRef.current.close()}
                        style={styles.DismissText}>
                        dismiss
                    </CustomText>}
                </View>

            </View>
        </RBSheet>
    );
};

export default PermiumModal;

const styles = StyleSheet.create({

    image_con: {
        height: windowWidth * 0.2,
        width: windowWidth * 0.2,
        overflow: 'hidden',
        marginTop: moderateScale(15, 0.6)
        // borderRadius: (windowWidth * 0.13) / 2,
    },

    icon_con: {
        height: windowHeight * 0.03,
        width: windowWidth * 0.07,
    },
    icon_circle: {
        height: windowWidth * 0.12,
        width: windowWidth * 0.12,
        borderRadius: (windowWidth * 0.12) / 2,
        backgroundColor: '#1C1F22',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#707274ff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    title: {
        color: Color.white,
        fontSize: moderateScale(16, 0.6),
    },
    row_con: {
        paddingVertical: moderateScale(10, 0.6),
        width: windowWidth * 0.9,
        paddingHorizontal: moderateScale(10, 0.6),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateScale(5, 0.6),
    },
    mainView: {
        backgroundColor: '#282C30',
        height: '100%',
        alignItems: 'center',
    }, topView: {
        width: windowWidth,
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20, 0.6),
        marginTop: moderateScale(20, 0.6),
        alignItems: 'center',
    }, title: {
        color: Color.white,
        fontSize: moderateScale(14, 0.6),
    }, DismissText: {
        marginTop: moderateScale(5, .6),
        paddingVertical: moderateScale(5, .6),
        color: '#ffffffff',
        fontSize: moderateScale(16, 0.6),
    },
    logo: {
        height: windowWidth * 0.07,
        width: windowWidth * 0.07,
    }
});
