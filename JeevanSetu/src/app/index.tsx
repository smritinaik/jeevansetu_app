import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Header Logo */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('@/assets/images/LOGO.png')} 
          style={styles.logoImage} 
        />
      </View>

      {/* Banner Placeholder */}
      <View style={styles.bannerContainer} />

      {/* Action Cards Row */}
      <View style={styles.gridContainer}>
        
        {/* Card 1: Ambulance Driver */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.9}
          onPress={() => router.push('/driver-form')}
        >
          <View style={styles.iconCircle}>
            <Image 
              source={require('@/assets/images/driver.png')} 
              style={styles.cardIcon} 
            />
          </View>
          <Text style={styles.cardTitle}>Register as{"\n"}Ambulance Driver</Text>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Start Registration</Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Register Ambulance */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.9}
          onPress={() => router.push('/ambulance-form')}
        >
          <View style={styles.iconCircle}>
            <Image 
              source={require('@/assets/images/ambulance.png')} 
              style={styles.cardIcon} 
            />
          </View>
          <Text style={styles.cardTitle}>Register Your{"\n"}Ambulance</Text>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Start Registration</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* Card 3: Register as Police */}
      <TouchableOpacity 
        style={styles.singleCard} 
        activeOpacity={0.9}
        onPress={() => router.push('/police-form')}
      >
        <View style={styles.iconCircle}>
          <Image 
            source={require('@/assets/images/police.png')} 
            style={styles.cardIcon} 
          />
        </View>
        <Text style={styles.cardTitle}>Register as Police</Text>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Start Registration</Text>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  logoImage: {
    width: 280,
    height: 100,
    resizeMode: 'contain',
  },
  bannerContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#C2B4B5',
    borderRadius: 16,
    marginBottom: 25,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#780b10',
    width: '48%',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  singleCard: {
    backgroundColor: '#780b10',
    width: '100%',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#E6C5C8',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#780b10',
    fontSize: 12,
    fontWeight: '700',
  },
});