import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

// Use localhost for web, or the specific Wi-Fi IP address for mobile devices.
const getApiUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:5000/api/todos';
    }
    // Using the detected IP address from ipconfig
    return 'http://10.0.0.200:5000/api/todos'; 
};

const API_URL = getApiUrl();

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'Completed'

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([response.data, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !completed,
      });
      setTodos(todos.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  const editTodo = async (id, newTitle) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: newTitle,
      });
      setTodos(todos.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error('Error editing todo:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // All
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasker</Text>
      
      <TodoForm onAdd={addTodo} />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['All', 'Active', 'Completed'].map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem 
            item={item} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            onEdit={editTodo}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c', // Premium dark gray background
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
    color: '#f0f0f0',
    letterSpacing: 1.5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 5,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#4a4a4a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  filterText: {
    color: '#888888',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 40,
  }
});
