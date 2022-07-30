import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import { Button, TextInput } from 'react-native';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  const [search, setSearch] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
          headerTitle: "Home",
          headerRight: () => (
            <>
              <TextInput
                style={{ width: 200, height: 35, borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', paddingLeft: 10, }}
                value={search}
                onChangeText={setSearch}
                placeholder="Search"
              />
              <Button
                title="search"
                onPress={() => navigation.navigate('Search', { search: search })}
              />
            </>
          ),
        })} />
        <Stack.Screen name="Search" component={Search} options={({ route }) => ({ title: `Search: ${route.params.search}` })} />
        <Stack.Screen name="Detail" component={Detail} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
