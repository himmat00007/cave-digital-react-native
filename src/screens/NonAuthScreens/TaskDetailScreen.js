import { taskApi } from "@/src/api/task";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Text, Button, Card } from "react-native-paper";

const TaskDetailScreen = ({ route, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState({});
  const { _id } = route.params;
  const handleEditToggle = () => {
    if (isEditing) {
      if (task.title.trim() === "" || task.description.trim() === "") {
        alert("Both title and description are required.");
        return;
      }
      updateTask();
      return;
    }
    setIsEditing(!isEditing);
  };
  const getTask = async () => {
    try {
      console.log(route.params);
      const task = await taskApi.getTask(_id);
      setTask(task);
    } catch (error) {
      console.log(error);
      alert(error?.error);
    }
  };
  const updateTask = async () => {
    try {
      console.log(task);
      await taskApi.updateTask(_id, {
        title: task.title,
        description: task.description,
      });
      alert("Task updated successfully.");
      navigation.goBack();

      setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert(error?.error);
    }
  };
  const deleteTask = async () => {
    try {
      await taskApi.deleteTask(_id);
      alert("Task deleted successfully.");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert(error?.error);
    }
  };
  useEffect(() => {
    getTask();
  }, [_id]);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          titleNumberOfLines={2}
          title={
            isEditing ? (
              <TextInput
                style={styles.input}
                value={task.title}
                onChangeText={(text) => setTask({ ...task, title: text })}
              />
            ) : (
              task.title
            )
          }
          titleStyle={styles.title}
        />
        <Card.Content>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={task.description}
              onChangeText={(text) => setTask({ ...task, description: text })}
              multiline
            />
          ) : (
            <Text style={styles.description}>{task.description}</Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleEditToggle}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button mode="contained" onPress={deleteTask}>
            Delete
          </Button>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Back to Tasks
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    color: "#555",
    textAlign: "left",
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  descriptionInput: {
    textAlignVertical: "top",
  },
});

export default TaskDetailScreen;
