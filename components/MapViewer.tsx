import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

import axios from "axios";
import Constants from "expo-constants";
const apiKey = Constants.expoConfig?.extra?.GEOAPIFY_API_KEY;

interface Coordinate {
  latitude: number;
  longitude: number;
}

// Définition du type MapEvent pour les événements de carte
interface MapEvent<T = { coordinate: Coordinate }> {
  nativeEvent: T;
}

const MapViewer: React.FC = () => {
  const [pin, setPin] = useState<Coordinate>({
    latitude: 45.7751,
    longitude: 4.8271,
  });

  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // D�finir une fonction pour mettre � jour le pin
  const updatePin = (newPin: Coordinate) => {
    setPin(newPin);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      //demande permission d'obtenir donn�es GPS de l'appareil
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      //Requ�te Axios pour obtenir les donn�es
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=${apiKey}`
        );
        const formattedAddress =
          response.data.features[0]?.properties?.formatted;
        setAddress(formattedAddress);
      } catch (error) {
        console.error("Erreur lors de la requ�te Axios : ", error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.7751,
          longitude: 4.8271,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        //mise � jour du pin qd l'utilisateur bouge
        onUserLocationChange={(e: MapEvent<{ coordinate?: Coordinate }>) => {
          if (e.nativeEvent.coordinate) {
            console.log("onUserLocationChange", e.nativeEvent.coordinate);
            updatePin(e.nativeEvent.coordinate);
          }
        }}
      >
        <Marker
          coordinate={pin}
          title="Localisation"
          description={address || "Chargement de l'adresse"}
          pinColor="red"
          draggable={true}
          //mise � jour du pin qd le marker bouge
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
            updatePin(e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            updatePin(e.nativeEvent.coordinate);
          }}
        >
          <Callout style={styles.callout}>
            <Text>{address}</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={100} />
      </MapView>
    </View>
  );
};
export default MapViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: 250,
  },
  callout: {
    width: 50,
    height: 50,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
