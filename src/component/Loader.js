import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((state) => state?.task?.isLoading);
  if (!loader) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default Loader;
