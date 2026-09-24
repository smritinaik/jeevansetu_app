import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '@/lib/supabase'; // Adjust path if your lib folder is located elsewhere

export default function AmbulanceFormScreen() {
  const router = useRouter();

  // 1. Form States
  const [ownerFullName, setOwnerFullName] = useState('');
  const [ownerPhoneNo, setOwnerPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [age, setAge] = useState('');
  const [adharCardNo, setAdharCardNo] = useState('');
  const [drivingLicenceNo, setDrivingLicenceNo] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Submit Handler
  const handleSubmit = async () => {
    if (!ownerFullName || !ownerPhoneNo) {
      Alert.alert('Error', 'Please enter Owner Full Name and Phone Number');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('ambulance_owners').insert([
      {
        owner_full_name: ownerFullName,
        owner_phone_no: ownerPhoneNo,
        address: address,
        city: city,
        state: state,
        age: age,
        adhar_card_no: adharCardNo,
        driving_licence_no: drivingLicenceNo,
      },
    ]);

    setLoading(false);

    if (error) {
      Alert.alert('Submission Failed', error.message);
    } else {
      Alert.alert('Success', 'Data saved successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Back Arrow Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ambulance.png' }} 
            style={styles.logoImage} 
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Get Started with{"\n"}JeevanSetu</Text>
          <Text style={styles.subtitle}>Complete your registration below</Text>
        </View>
      </View>

      {/* Owner Full Name */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/user.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Owner Full Name:" 
          placeholderTextColor="#5B6E42" 
          value={ownerFullName}
          onChangeText={setOwnerFullName}
        />
      </View>

      {/* Owner Phone No */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/phone.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Owner Phone No:" 
          placeholderTextColor="#5B6E42" 
          keyboardType="phone-pad" 
          value={ownerPhoneNo}
          onChangeText={setOwnerPhoneNo}
        />
      </View>

      {/* Address */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/marker.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Address:" 
          placeholderTextColor="#5B6E42" 
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Side-by-side City and State */}
      <View style={styles.rowContainer}>
        <TextInput 
          style={[styles.inputStandalone, styles.halfInput]} 
          placeholder="city:" 
          placeholderTextColor="#5B6E42" 
          value={city}
          onChangeText={setCity}
        />
        <TextInput 
          style={[styles.inputStandalone, styles.halfInput]} 
          placeholder="State:" 
          placeholderTextColor="#5B6E42" 
          value={state}
          onChangeText={setState}
        />
      </View>

      {/* Age */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/calendar.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Age:" 
          placeholderTextColor="#5B6E42" 
          keyboardType="numeric" 
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Adhar Card NO */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/bank-card-back-side.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Adhar Card NO:" 
          placeholderTextColor="#5B6E42" 
          keyboardType="numeric" 
          value={adharCardNo}
          onChangeText={setAdharCardNo}
        />
      </View>

      {/* Driving licence No */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/id-card.png' }} style={styles.inputIcon} />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Driving licence No:" 
          placeholderTextColor="#5B6E42" 
          value={drivingLicenceNo}
          onChangeText={setDrivingLicenceNo}
        />
      </View>

     

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.6 }]} 
        activeOpacity={0.8}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6C8C9',
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 10,
    width: 40,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#780b10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoImage: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#780b10',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    color: '#3A3031',
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 12,
    marginBottom: 12,
    height: 50,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  inputIcon: {
    width: 16,
    height: 16,
    tintColor: '#780b10',
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#5B6E42',
    height: '100%',
  },
  photoText: {
    color: '#5B6E42',
    fontSize: 14,
  },
  inputStandalone: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#5B6E42',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#780b10',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});