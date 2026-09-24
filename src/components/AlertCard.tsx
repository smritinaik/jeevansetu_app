import { StyleSheet, Text, View } from 'react-native';

export default function AlertCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ambulance Active</Text>
      <Text style={styles.text}>
        Ambulance is on the way. Please make way.
      </Text>

      <View style={styles.status}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>ACTIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#22A447',
    marginRight: 6,
  },
  statusText: {
    color: '#22A447',
    fontWeight: 'bold',
    fontSize: 12,
  },
});