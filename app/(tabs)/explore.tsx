import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import AlertForm from "@/components/AlertForm";
import MapViewer from "@/components/MapViewer";

const Explore: React.FC = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="alert-circle" style={styles.headerImage} />
      }
    >
      <MapViewer />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Signalez-nous un danger</ThemedText>
      </ThemedView>
      <ThemedText>Merci de remplir ce formulaire.</ThemedText>
      <Collapsible title="Formulaire">
        <ThemedText>
          <AlertForm />
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
};
export default Explore;

export const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
