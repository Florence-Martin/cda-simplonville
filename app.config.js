module.exports = {
  expo: {
    name: "cda-simplonville",
    slug: "cda-simplonville",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    entryPoint: "./app/index.tsx",
    extra: {
      GEOAPIFY_API_KEY:
        process.env.GEOAPIFY_API_KEY || "default_key_if_not_set",
      GEOAPIFY_API_ID: process.env.GEOAPIFY_API_ID || "default_id_if_not_set",
      // autres variables d'environnement ici si nécessaire
    },
  },
};
