import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../../../screens/Home/Home.jsx';
import Busket from '../../../screens/Busket/Busket.jsx';
import Profile from '../../../screens/Profile/Profile.jsx';

const Tab = createBottomTabNavigator();

// const HomeScreen = () => {
//   return <Home />;
// };

// const BusketScreen = () => {
//   return <Busket />;
// };

// const ProfileScreen = () => {
//   return <Profile />;
// };

// const App = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name='Home' component={HomeScreen} />
//       <Tab.Screen name='Busket' component={BusketScreen} />
//       <Tab.Screen name='Profile' component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

const homeName = 'Home';
const busketName = 'Busket';
const profileName = 'Profile';

export default BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={homeName}>
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={busketName} component={Busket} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
