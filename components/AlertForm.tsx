import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
import ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
import ButtonImage from "./ButtonImage";

const AlertForm: React.FC = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = async () => {
    // Demande de permission pour accéder à la bibliothèque de médias
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Permission non accordée pour accéder à la bibliothèque de médias."
      );
      return;
    }

    // Lancement de la bibliothèque de médias pour sélectionner une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Met à jour l'état avec l'URI de l'image sélectionnée
      // setPhoto(result.assets[0]); // Mise à jour de l'état avec la première image sélectionnée
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Entrez le type d'alerte"
          placeholderTextColor={styles.placeholder.color}
          value={alertType}
          onChangeText={(text) => setAlertType(text)}
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Entrez la description"
          placeholderTextColor={styles.placeholder.color}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
        <View style={styles.blockName}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor={styles.placeholder.color}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Prenom"
            placeholderTextColor={styles.placeholder.color}
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Adresse"
          placeholderTextColor={styles.placeholder.color}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <View style={styles.blockName}>
          <TextInput
            style={styles.input}
            placeholder="Code postal"
            placeholderTextColor={styles.placeholder.color}
            value={postcode}
            onChangeText={(text) => setPostcode(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Ville"
            placeholderTextColor={styles.placeholder.color}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={styles.placeholder.color}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="T&eacute;l&eacute;phone"
          placeholderTextColor={styles.placeholder.color}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <View style={styles.blockDateTime}>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Ionicons name="calendar" size={24} color="#25292e" />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              //   onChange={onChangeDate}
            />
          )}

          <Pressable
            onPress={() => setShowTimePicker(true)}
            style={styles.timePickerButton}
          >
            <Ionicons name="time" size={24} color="black" />
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              //   onChange={}
            />
          )}
        </View>

        <Button title="Choisir une photo" onPress={handleChoosePhoto} />

        {photo && (
          <View>
            <Text>Photo s�lectionn�e :</Text>
            <Image
              //   source={{ uri: photo.uri }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}

        <Pressable
          style={styles.footerContainer}
          // onPress={}
        >
          <ButtonImage label="Envoyer l'alerte" />
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default AlertForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#383E42",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 2,
  },
  blockName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flexGrow: 1,
    flexBasis: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#fff",
  },
  placeholder: {
    color: "#F5F5F5",
    opacity: 0.5,
    fontSize: 8,
  },
  multilineInput: {
    height: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  photoContainer: {
    alignItems: "center",
  },
  footerContainer: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 24,
    marginRight: 24,
  },
  blockDateTime: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  timePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});
