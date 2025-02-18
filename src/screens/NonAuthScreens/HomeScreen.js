import { authApi } from "@/src/api/auth";
import { taskApi } from "@/src/api/task";
import routes from "@/src/contants/routes";
import { setTask } from "@/src/redux/feature/taskSlice";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const tasks = useSelector((state) => state.task.tasks);
  const loader = useSelector((state) => state?.task?.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const addTask = () => {
    navigation.navigate(routes.AddToDoScreen);
  };

  const logout = () => {
    try {
      authApi.logout();
    } catch (error) {
      alert(error);
    }
  };

  const getTasks = async () => {
    try {
      const tasks = await taskApi.getAllTasks();
      dispatch(setTask(tasks));
    } catch (error) {
      console.log(error);
      alert(error?.error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getTasks();
  };

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, [])
  );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Tasks" />
        <Button mode="contained" onPress={addTask} style={styles.appbarButton}>
          Add Task
        </Button>
        <Button mode="contained" onPress={logout} style={styles.appbarButton}>
          Logout
        </Button>
      </Appbar.Header>
      {tasks?.length > 0 && (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <Card
              key={index?.toString()}
              onPress={() => {
                navigation.navigate(routes.DetailScreen, { _id: item._id });
              }}
              style={styles.card}
              elevation={1}
            >
              <Card.Title title={item.title} />
              <Card.Content>
                <Text numberOfLines={1}>{item.description}</Text>
                <Text style={styles.dateText}>
                  {formatDate(item.createdAt)}
                </Text>
              </Card.Content>
            </Card>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {!loader && tasks?.length === 0 && (
        <Text style={{ textAlign: "center" }}>No tasks found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  button: {
    marginTop: 20,
  },
  appbarButton: {
    marginRight: 10,
  },
  dateText: {
    marginTop: 5,
    color: "gray",
    textAlign: "right",
  },
});

export default HomeScreen;
