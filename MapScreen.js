import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_KEY } from '@env';


export default function App(title) {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }
  
  const [koordinaatit, setKoordinaatit] = useState(initial);

const getData = async (title) => {
  const KEY = process.env.API_KEY;
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${title}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const { lat, lng } = data.results[0].locations[0].latLng;
    setKoordinaatit({ ...koordinaatit, latitude: lat, longitude: lng })
  })
  .catch(error => console.error('API call failed', error.message))
}
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1,
        width: '100%',
        height: '100%' }}
        initialRegion={initial}
        region={koordinaatit}
      >
        <Marker coordinate={koordinaatit}
          title={title}
          />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kentta: {
    alignItems: 'flex-start',
  },
});
