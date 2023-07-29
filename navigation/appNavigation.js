import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, SearchScreen, ProfileScreen } from '../screens'

import { HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'

const { Screen, Navigator } = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={screenOptions}>
                <Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <HomeIcon size="25" color={focused ? '#EC5648' : '#94A0AD'} />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }} />
                <Screen name="Search" component={SearchScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <MagnifyingGlassIcon size="25" color={focused ? '#EC5648' : '#94A0AD'} />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }} />
                <Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <UserIcon size="25" color={focused ? '#EC5648' : '#94A0AD'} />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }} />
            </Navigator>
        </NavigationContainer>

    )
}

const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#94A0AD',
    tabBarStyle: {
        paddingVertical: 'auto',
        height: 80,
        backgroundColor: '#1F2B47',
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 0,
        marginBottom: 25,
        marginHorizontal: 25,
        borderRadius: 50,
    }

};

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected
    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: '#1F2B47' }}></View>
                    <View style={{ flex: 1, backgroundColor: '#1F2B47' }}></View>
                </View>
                <Pressable
                    onPress={onPress}
                    style={{
                        backgroundColor: '#1F2B47',
                    }}
                >
                    {children}
                </Pressable>
            </View>
        )
    } else {
        return (
            <Pressable
                onPress={onPress}
                style={{
                    flex: 1,
                }}
            >
                {children}
            </Pressable>
        )
    }
}
