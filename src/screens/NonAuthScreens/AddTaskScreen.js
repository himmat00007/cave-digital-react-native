import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Button, Title, Paragraph } from "react-native-paper";
import { taskApi } from "@/src/api/task";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Both title and description are required.");
      return;
    }
    try {
      await taskApi.createTask({ title, description });
      alert("Task added successfully.");
      navigation.goBack();
    } catch (error) {
      alert(error?.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Title style={styles.title}>Add New Task</Title>
        <Paragraph style={styles.subtitle}>
          Fill in the details below to add a new task.
        </Paragraph>
        <TextInput
          label="Title"
          value={title}
          maxLength={100}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />
        <Button mode="contained" onPress={handleAddTask} style={styles.button}>
          Add Task
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go Back
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "#757575",
  },
  input: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
});

export default AddTaskScreen;
