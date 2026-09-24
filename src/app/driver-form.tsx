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

export default function DriverFormScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [age, setAge] = useState('');
  const [adharCard, setAdharCard] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !phone || !licenseNumber) {
      Alert.alert(
        'Error',
        'Please fill in at least Name, Phone, and Driving Licence No.'
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('drivers')
      .insert([
        {
          full_name: fullName,
          phone: phone,
          address: address,
          city: city,
          state: state,
          age: age ? parseInt(age, 10) : null,
          adhar_card: adharCard,
          license_number: licenseNumber,
        },
      ]);

    setLoading(false);

    if (error) {
      Alert.alert('Submission Failed', error.message);
    } else {
      Alert.alert('Success', 'Driver data saved successfully!');
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
        activeOpacity={0.7}
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
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/user.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name:"
          placeholderTextColor="#780b10"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Phone */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/phone.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone No:"
          placeholderTextColor="#780b10"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Personal Address */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/marker.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address:"
          placeholderTextColor="#780b10"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* City and State */}
      <View style={styles.rowContainer}>
        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="City:"
            placeholderTextColor="#780b10"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="State:"
            placeholderTextColor="#780b10"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      {/* Age */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/calendar.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age:"
          placeholderTextColor="#780b10"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Aadhaar */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/bank-card-back-side.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Adhar Card NO:"
          placeholderTextColor="#780b10"
          keyboardType="numeric"
          value={adharCard}
          onChangeText={setAdharCard}
        />
      </View>

      {/* Driving Licence */}
      <View style={styles.inputWrapper}>
        <View style={styles.iconCircle}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.inputIcon}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Driving Licence No:"
          placeholderTextColor="#780b10"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />
      </View>

      {/* Submit */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
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
    elevation: 4,
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
    resizeMode: 'contain',
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
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#780b10',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});