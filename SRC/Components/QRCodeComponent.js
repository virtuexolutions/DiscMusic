import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeComponent = ({ 
  value = 'discmusic://track/12345', 
  size = 200, 
  color = 'white', 
  backgroundColor = 'transparent',
  logo 
}) => {
  return (
    <View style={styles.container}>
      <QRCode
        value={value}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        logo={logo}
        logoSize={size * 0.2} // Optional logo in the middle (like the discmusic icon)
        logoBackgroundColor='transparent'
      />
    </View>
  );
};

export default QRCodeComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
