import { authApi } from "@/src/api/auth";
import routes from "@/src/contants/routes";
import { validateEmail } from "@/src/utils/validators";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Title } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const signupData = {
      name,
      email,
      password,
    };

    try {
      await authApi.signup(signupData);
    } catch (error) {
      alert(error?.error);
    }
    Alert.alert("Success", "Signup successful!");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button
        mode="contained-tonal"
        onPress={handleSignup}
        style={styles.button}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate(routes.LoginScreen)}
        style={styles.signupButton}
      >
        Already have an account? Log in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    height: 55,
    justifyContent: "center",
  },
});

export default SignupScreen;
