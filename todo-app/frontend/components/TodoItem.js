import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(item._id, editTitle);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <View style={styles.todoItem}>
        <TextInput
          style={styles.editInput}
          value={editTitle}
          onChangeText={setEditTitle}
          autoFocus
        />
        <View style={styles.editActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => { setIsEditing(false); setEditTitle(item.title); }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoTextContainer}
        onPress={() => onToggle(item._id, item.completed)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#666666',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  checkboxCompleted: {
    backgroundColor: '#666666',
    borderColor: '#666666',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: 16,
    color: '#e0e0e0',
    flexShrink: 1,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#777777',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editText: {
    color: '#888888',
    fontSize: 20,
    fontWeight: '600',
  },
  deleteButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  deleteText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontWeight: '600',
  },
  editInput: {
    flex: 1,
    backgroundColor: '#333333',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  saveText: {
    color: '#4CAF50', // Green for save
    fontWeight: '600',
    fontSize: 15,
  },
  cancelText: {
    color: '#ff6b6b', // Red for cancel
    fontWeight: '600',
    fontSize: 15,
  }
});
