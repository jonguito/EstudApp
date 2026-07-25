import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function TarefaItem({ tarefa, materia, onPress }) {
  const { titulo, descricao, horario } = tarefa;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
        <View style={styles.linhas}>
          <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
          {descricao ? <Text style={styles.descricao} numberOfLines={1}>{descricao}</Text> : null}
        </View>
      </View>
      <View style={styles.horarioContainer}>
        <Text style={styles.clockIcon}>🕐</Text>
        <Text style={styles.horario}>{horario}</Text>
      </View>
    </TouchableOpacity>
  );
}
