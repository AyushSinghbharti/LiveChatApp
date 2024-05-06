import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserListItem = ({user}) => {
    console.log(user);
  return (
    <View style={{padding: 15, backgroundColor: 'white'}}>
      <Text style={{fontWeight: '800'}}>{user.full_name}</Text>
      <Text style={{fontWeight: '800'}}>{user.username}</Text>
    </View>
  )
}

export default UserListItem

const styles = StyleSheet.create({})