import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import { ActivityIndicator } from 'react-native-paper';
import API, { endpoints } from './configs/API';
import Regulation from './components/Regulation/Regulation';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={MyDrawerItem}>
        <Drawer.Screen name='Home' component={Home} options={{title: 'Hệ Thống Điểm Rèn Luyện'}} />
        <Drawer.Screen name='Regulation' component={Regulation} /> 
        <Drawer.Screen name='Login' component={Login} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const MyDrawerItem = (props) => {

  const [regulations, setRegulations] = React.useState(null);
  React.useEffect(() => {
    const getRegulations = async () => {
      try {
            let res = await API.get(endpoints['regulations']);
            setRegulations(res.data);
      }catch (error) {
      setRegulations([])
      console.log(error);
    }
  };

  getRegulations();
  }, []);


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {regulations===null?<ActivityIndicator />:<>
        {regulations.map(c => <DrawerItem key={c.id} label={c.name} onPress={() => props.navigation.navigate("Home", {"regId": c.id})} />)}
      </>}
    </DrawerContentScrollView>
  ) 
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
