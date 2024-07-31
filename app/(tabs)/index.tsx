import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Home from "@/components/Home";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <ThemedView>
        <ThemedText>
          <Home />
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* Placeholder for future content */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* Placeholder for future content */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* Placeholder for future content */}
      </ThemedView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
