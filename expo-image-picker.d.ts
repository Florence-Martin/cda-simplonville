declare module "expo-image-picker" {
  import {
    ImagePickerOptions,
    ImagePickerResult,
  } from "expo-image-picker/src/ImagePicker.types";
  export function requestMediaLibraryPermissionsAsync(): Promise<{
    status: string;
  }>;
  export function launchImageLibraryAsync(
    options?: ImagePickerOptions
  ): Promise<ImagePickerResult>;
  // Ajoutez d'autres fonctions nécessaires selon vos besoins
}
