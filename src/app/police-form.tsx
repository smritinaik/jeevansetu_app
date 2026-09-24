import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function PoliceFormScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [personalAddress, setPersonalAddress] = useState('');
  const [personalCity, setPersonalCity] = useState('');
  const [personalState, setPersonalState] = useState('');

  const [stationAddress, setStationAddress] = useState('');
  const [stationCity, setStationCity] = useState('');
  const [stationState, setStationState] = useState('');

  const [age, setAge] = useState('');
  const [adharCard, setAdharCard] = useState('');
  const [policeId, setPoliceId] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !phone || !policeId) {
      Alert.alert(
        'Error',
        'Please fill in Name, Phone, and Police ID.'
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('police')
      .insert([
        {
          full_name: fullName,
          phone: phone,

          personal_address: personalAddress,
          personal_city: personalCity,
          personal_state: personalState,

          station_address: stationAddress,
          station_city: stationCity,
          station_state: stationState,

          age: age ? parseInt(age, 10) : null,
          adhar_card: adharCard,
          police_id: policeId,
        },
      ]);

    setLoading(false);

    if (error) {
      Alert.alert('Submission Failed', error.message);
    } else {
      Alert.alert('Success', 'Police data saved successfully!');
      router.back();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/7.png')}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>
            Get Started with{'\n'}JeevanSetu
          </Text>

          <Text style={styles.subtitle}>
            Complete your registration below
          </Text>
        </View>
      </View>

      {/* Full Name */}
      <Input
        placeholder="Full Name:"
        value={fullName}
        onChangeText={setFullName}
        icon="https://img.icons8.com/ios-filled/50/user.png"
      />

      {/* Phone */}
      <Input
        placeholder="Phone No:"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        icon="https://img.icons8.com/ios-filled/50/phone.png"
      />

      {/* PERSONAL ADDRESS */}
      <Input
        placeholder="Personal Address:"
        value={personalAddress}
        onChangeText={setPersonalAddress}
        icon="https://img.icons8.com/ios-filled/50/marker.png"
      />

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.halfInput}
          placeholder="City:"
          placeholderTextColor="#780b10"
          value={personalCity}
          onChangeText={setPersonalCity}
        />

        <TextInput
          style={styles.halfInput}
          placeholder="State:"
          placeholderTextColor="#780b10"
          value={personalState}
          onChangeText={setPersonalState}
        />
      </View>

      {/* POLICE STATION ADDRESS */}
      <Input
        placeholder="Police Station Address:"
        value={stationAddress}
        onChangeText={setStationAddress}
        icon="https://img.icons8.com/ios-filled/50/marker.png"
      />

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.halfInput}
          placeholder="Station City:"
          placeholderTextColor="#780b10"
          value={stationCity}
          onChangeText={setStationCity}
        />

        <TextInput
          style={styles.halfInput}
          placeholder="Station State:"
          placeholderTextColor="#780b10"
          value={stationState}
          onChangeText={setStationState}
        />
      </View>

      {/* Age */}
      <Input
        placeholder="Age:"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        icon="https://img.icons8.com/ios-filled/50/calendar.png"
      />

      {/* Aadhaar */}
      <Input
        placeholder="Aadhaar Card No:"
        value={adharCard}
        onChangeText={setAdharCard}
        keyboardType="numeric"
        icon="https://img.icons8.com/ios-filled/50/bank-card-back-side.png"
      />

      {/* Police ID */}
      <Input
        placeholder="Police ID:"
        value={policeId}
        onChangeText={setPoliceId}
        icon="https://img.icons8.com/ios-filled/50/identification-documents.png"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  icon,
}: any) {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.iconCircle}>
        <Image
          source={{ uri: icon }}
          style={styles.inputIcon}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#780b10"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
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
  },

  logoImage: {
    width: 110,
    height: 110,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
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
  },

  inputIcon: {
    width: 16,
    height: 16,
    tintColor: '#780b10',
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#780b10',
    height: '100%',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  halfInput: {
    width: '48%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#780b10',
  },

  button: {
    backgroundColor: '#780b10',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});