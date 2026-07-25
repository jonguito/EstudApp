import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CadastroScreen from '../screens/CadastroScreen';
import MateriasScreen from '../screens/MateriasScreen';
import AdicionarTarefaScreen from '../screens/AdicionarTarefaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Cadastro"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4B5FFA',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        drawerStyle: {
          width: 270,
        },
      }}
    >
      <Drawer.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ title: 'Cadastro de Usuário' }}
      />
      <Drawer.Screen
        name="Materias"
        component={MateriasScreen}
        options={{ title: 'Lista de Matérias' }}
      />
      <Drawer.Screen
        name="AdicionarTarefa"
        component={AdicionarTarefaScreen}
        options={{ title: 'Adicionar Tarefa' }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil / Resumo' }}
      />
    </Drawer.Navigator>
  );
}
