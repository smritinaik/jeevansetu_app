import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import AlertCard from '../components/AlertCard';
import Map from '../components/Map';
import SOSBtn from '../components/SOSBtn';

export default function SOSScreen() {

  const handleSOSPress = () => {
    Alert.alert(
      'SOS Triggered',
      'Emergency alert has been sent to nearby authorities.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* MAP */}
      <View style={styles.mapContainer}>
        <Map />
      </View>

      {/* ALERT CARD */}
      <View style={styles.contentContainer}>
        <AlertCard />
      </View>

      {/* SOS BUTTON */}
      <View style={styles.buttonContainer}>
        <SOSBtn onPress={handleSOSPress} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  mapContainer: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});