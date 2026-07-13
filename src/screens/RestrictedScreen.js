import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RestrictedScreen = ({ navigation, screenName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="lock-closed" size={80} color="#f4a900" />
      </View>
      <Text style={styles.title}>Access Restricted</Text>
      <Text style={styles.message}>
        The {screenName} section is only available for Administrator users.
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('POS')}
      >
        <Icon name="cart-outline" size={18} color="#3d2b1f" />
        <Text style={styles.buttonText}>Go to POS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#f4a90020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3d2b1f',
    marginTop: 10,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#3d2b1f',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#f4a900',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3d2b1f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default RestrictedScreen;