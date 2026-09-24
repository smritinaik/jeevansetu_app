import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase'; // Ensure this path is correct

export default function AuthorityScreen() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activeAmbulancesCount, setActiveAmbulancesCount] = useState<number>(3);

  useEffect(() => {
    fetchPoliceStatus();
    // Realtime subscription would go here later
  }, []);

  const fetchPoliceStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('police_profiles')
        .select('is_active')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setIsActive(data.is_active);
      }
    } catch (error) {
      console.log('Error fetching status:', error);
    }
  };

  const toggleActiveStatus = async () => {
    const newState = !isActive;
    setIsActive(newState);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('police_profiles')
        .update({ is_active: newState })
        .eq('id', user.id);

      if (error) throw error;

    } catch (error) {
      console.log('Error updating status:', error);
      setIsActive(!newState); 
      Alert.alert('Error', 'Failed to update status.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} /> {/* Spacer */}
        
        <View style={styles.logoContainer}>
          {/* 🖼️ [IMAGE_MARKER 1] — REPLACE BELOW WITH YOUR LOGO */}
          <Image 
            source={require('../../assets/images/LOGO.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>JeevanSetu</Text>
        </View>

        <TouchableOpacity style={styles.profileIconContainer}>
          {/* 🖼️ [IMAGE_MARKER 2] — REPLACE BELOW WITH PROFILE ICON */}
          <Image 
            source={require('../../assets/images/profileicon.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Center ACTIVE Button */}
      <View style={styles.centerContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={toggleActiveStatus}>
          <View style={styles.outerRing}>
            <View style={styles.middleRing}>
              <View style={[styles.innerButton, { backgroundColor: isActive ? '#2E8B57' : '#888' }]}>
                <Text style={styles.activeText}>{isActive ? 'ACTIVE' : 'OFFLINE'}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.monitoringText}>Ambulance alerts{'\n'}are being monitored</Text>
        
        <View style={styles.pillContainer}>
          {/* 🖼️ [IMAGE_MARKER 3] — REPLACE BELOW WITH AMBULANCE ICON */}
          <Image 
            source={require('../../assets/images/ambulance_icon.png')} 
            style={styles.pillImage}
            resizeMode="contain"
          />
          <Text style={styles.pillText}>0{activeAmbulancesCount} Active Ambulances</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* 🖼️ [IMAGE_MARKER 4] — REPLACE BELOW WITH POLICE CAR GRAPHIC */}
        <Image 
          source={require('../../assets/images/police_car.png')} 
          style={styles.footerGraphic}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>SAFE ROADS  •  QUICKER RESPONSE</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EFEF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 35, 
    height: 35,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A1515',
    marginLeft: 10,
  },
  profileIconContainer: {
    padding: 2,
    backgroundColor: '#FFF',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  outerRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(200, 230, 201, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(200, 230, 201, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // Android Shadow
    elevation: 8,
    // iOS Shadow
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  activeText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  monitoringText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A1515',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 26,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pillImage: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  pillText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  footerGraphic: {
    width: '70%',
    height: 90,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: '#555',
    fontWeight: '800',
  },
});