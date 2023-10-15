import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import MapScreen from './MapScreen';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '@rneui/themed';
import { Input, Button, ListItem } from '@rneui/themed';



const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('addresses.db')

export default function App({ navigation }) {

  const [ title, setTitle] = useState('');
  const [addresses, setAddressList] = useState('');

  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists addresses (id integer primary key not null, title text);');
    }, 
      null,
      updateList);
    }, []);  

    const updateList = () => {
      db.transaction(tx => {
      tx.executeSql('select * from addresses;', [], (_, { rows }) =>
      setAddressList(rows._array)
      );
      }, null, null);
      };

      const saveItem = () => {
        db.transaction(tx => {
        tx.executeSql('insert into addresses (title) values (?);',
        [title]);
        }, null, updateList)
        console.log(title)
        setTitle('');
        };
    
    const deleteItem = (id) => {
      db.transaction(
        tx => tx.executeSql('delete from addresses where id = ?;', [id]),
        null,
        updateList)
      };
{/* <NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Search" component={App} />
<Stack.Screen name="Map" component={MapScreen} />
</Stack.Navigator>
</NavigationContainer> */}
      renderItem = ({ item }) => (
        <ListItem 
        bottomDivider
        chevron
        onLongPress={()=>deleteItem(id)}
        onPress={()=>this.props.screenProps.navigation.navigate("MapScreen", {title})}><Text>kikki</Text>
        <ListItem.Content> 
        <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        </ListItem>
        )

  return (
    <View style={styles.container}>
      <Header centerComponent={{ text: 'Addresses', style: { color: '#fff' } }}
/>
      <Input placeholder='Type address' onChangeText={title => setTitle(title)} value={title} />
      <View>
      <Button style={styles.button} raised icon={{name: 'save'}}onPress={saveItem} title='Save' />
      </View>
      <FlatList
      data={addresses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem} 
      />
      
    </View>
    
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kentta: {
    alignItems: 'flex-start',
  },
  list: {
    color: 'black',
  },
  button: {
    width: '70%',
  },
});
