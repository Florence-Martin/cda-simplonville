import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//import * as ImagePicker from "expo-image-picker";
import ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";

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
  const [photo, setPhoto] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const predefinedEmail = "florence.martin14@free.fr";

  useEffect(() => {
    const checkMailComposerAvailability = async () => {
      const available = await MailComposer.isAvailableAsync();
      setIsAvailable(available);
    };
    checkMailComposerAvailability();
  }, []);

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (!result.canceled && result.assets.length > 0) {
        setPhoto(result.assets[0].uri); // Met à jour l'état avec l'URI de l'image sélectionnée
      } // Met à jour l'état avec l'URI de l'image sélectionnée
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const sendEmail = async () => {
    if (!isAvailable) {
      Alert.alert("Erreur", "Le service de messagerie n'est pas disponible.");
      return;
    }

    const options = {
      recipients: [predefinedEmail],
      subject: `Alerte: ${alertType}`,
      body: `
        Description: ${description}
        Nom: ${name}
        Prénom: ${firstname}
        Adresse: ${address}
        Code postal: ${postcode}
        Ville: ${city}
        Téléphone: ${phoneNumber}
        Date: ${date.toLocaleDateString()}
        Heure: ${time.toLocaleTimeString()}
        ${photo ? "Photo: Voir la pièce jointe." : ""}
      `,
      attachments: photo ? [photo] : [],
    };

    try {
      const result = await MailComposer.composeAsync(options);

      if (result.status === "sent") {
        setStatus("Succès: email envoyé.");
        Alert.alert("Succès", "Email envoyé avec succès.");
      } else if (result.status === "cancelled") {
        setStatus("Annulé: l'email n'a pas été envoyé.");
        Alert.alert("Annulé", "Envoi de l'email annulé.");
      } else {
        setStatus(`Status: email ${result.status}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(`Erreur: email failed with error ${error.message}`);
        Alert.alert("Erreur", `Erreur: ${error.message}`);
      } else {
        setStatus("Erreur: email failed with an unknown error");
        Alert.alert(
          "Erreur",
          "Erreur inconnue lors de la préparation de l'email."
        );
      }
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
              onChange={onDateChange}
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
              onChange={onTimeChange}
            />
          )}
        </View>
        <Button title="Choisir une photo" onPress={handleChoosePhoto} />
        {photo && (
          <View>
            <Text>Photo sélectionnée :</Text>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}

        <Pressable style={styles.footerContainer}>
          <ButtonImage label="Envoyer l'alerte" onPress={sendEmail} />
        </Pressable>

        {status && (
          <View style={styles.statusContainer}>
            <Text>{status}</Text>
          </View>
        )}
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
  statusContainer: {},
});
