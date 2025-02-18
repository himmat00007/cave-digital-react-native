import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import routes from "@/src/contants/routes";
import { validateEmail } from "@/src/utils/validators";
import { authApi } from "@/src/api/auth";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email.length === 0) {
      alert("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      alert("Email not valid");
      return;
    }
    if (password.length === 0) {
      alert("Password not filled");
      return;
    }
    try {
      await authApi.login({ email, password });
    } catch (error) {
      alert(error?.error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="text"
        onPress={() => navigation.navigate(routes.SignUp)}
        style={styles.signupButton}
      >
        Don't have an account? Sign up
      </Button>
      <Button
        mode="contained-tonal"
        onPress={handleLogin}
        style={styles.button}
      >
        Login
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
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    height: 55,
    justifyContent: "center",
  },
});

export default LoginScreen;
