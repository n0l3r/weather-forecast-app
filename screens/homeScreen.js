import { View, Text, SafeAreaView, Pressable, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { BellIcon } from 'react-native-heroicons/solid'
import { weatherImages } from '../utils'

// api
import { getLocation, getForecast } from '../api/weather'


export default function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState({})
    const [category, setCategory] = useState('today')

    useEffect(() => {
        fetchMyWeather()
    }, [])

    const fetchMyWeather = async () => {
        const location = "Jakarta, Indonesia"
        getForecast(location, 7).then((data) => {
            setWeather(data)
            setLoading(false)
        })
    }

    const { location, current, forecast } = weather;

    const cvDate2Day = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const d = new Date(date)
        const dayName = days[d.getDay()]
        return dayName
    }

    const cvDate2Time = (date) => {
        const d = new Date(date)
        const time = `${d.getHours()}:00`
        return time
    }

    return (
        <View className="flex-1 relative bg-[#111D3B]">
            <StatusBar style="light" />

            {loading ? (
                <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#111D3B] items-center justify-center">
                    <Text className="text-white text-4xl">Loading...</Text>
                </View>
            )
                :
                (
                    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                        {/* content end with 2 row */}
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between px-4 py-4">
                                <Pressable className="w-12 h-12 bg-[#242F4B] border-2 border-[#2E3953] rounded-full items-center justify-center">
                                    <BellIcon size="25" color="#FCB4B5" />
                                </Pressable>
                                <View className="flex flex-col items-end justify-center">
                                    <Text className="text-gray-500">Saturday, 29 Jul</Text>
                                    <View className="flex flex-row items-center justify-center">
                                        <Text className="text-white font-bold text-lg">{location?.name}, </Text>
                                        <Text className="text-gray-200 font-semibold text-lg">{location?.country}</Text>
                                    </View>
                                </View>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

                                {/* card image and suhu */}
                                <View className="flex-row px-4 py-4 items-center justify-between">
                                    <View className="w-44 h-44 bg-[#202C48] rounded-full justify-center items-center">
                                        <Image source={weatherImages[current?.condition.text]} className="w-40 h-40" />
                                    </View>
                                    <View className="flex flex-col items-center justify-center">
                                        <View className="flex-row">
                                            <Text className="text-[#EC5648] font-bold text-8xl">{current?.temp_c}</Text>
                                            <Text className="text-[#EC5648] font-semibold text-3xl">°C</Text>
                                        </View>
                                        <Text className="text-white text-2xl">{current?.condition.text}</Text>
                                    </View>
                                </View>

                                {/* card detail */}
                                <View className="flex-row mx-4 px-8 py-6 items-center justify-between bg-[#202C48] rounded-full">
                                    <View className="flex flex-col items-center justify-center">
                                        <Text className="text-white text-lg">Wind</Text>
                                        <Text className="text-white">{current?.wind_mph} mph</Text>
                                    </View>
                                    <View className="w-0.5 h-12 bg-[#111D3B]"></View>
                                    <View className="flex flex-col items-center justify-center">
                                        <Text className="text-white text-lg">Pressure</Text>
                                        <Text className="text-white">{current?.pressure_in} in</Text>
                                    </View>
                                    <View className="w-0.5 h-12 bg-[#111D3B]"></View>
                                    <View className="flex flex-col items-center justify-center">
                                        <Text className="text-white text-lg">Humidity</Text>
                                        <Text className="text-white">{current?.humidity}%</Text>
                                    </View>
                                </View>

                                {/* category */}
                                <View className="flex-row items-center justify-between py-4 px-4">
                                    <Pressable className="h-12 w-26 rounded-full items-center justify-center px-6 mx-4"
                                        style={{ backgroundColor: category === 'today' ? '#EC5648' : '#1F2B47' }}
                                        onPress={() => setCategory('today')}
                                    >
                                        <Text className="text-white">Today</Text>
                                    </Pressable>
                                    <Pressable className="h-12 w-26 rounded-full items-center justify-center px-6 mx-4"
                                        style={{ backgroundColor: category === 'tomorrow' ? '#EC5648' : '#1F2B47' }}
                                        onPress={() => setCategory('tomorrow')}
                                    >
                                        <Text className="text-white">Tomorrow</Text>
                                    </Pressable>
                                    <Pressable className="h-12 w-26 rounded-full items-center justify-center px-6 mx-4"
                                        style={{ backgroundColor: category === 'week' ? '#EC5648' : '#1F2B47' }}
                                        onPress={() => setCategory('week')}
                                    >
                                        <Text className="text-white">7 Days</Text>
                                    </Pressable>
                                </View>


                                {/* card predict */}
                                <View className="py-2 px-2">
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row">

                                        {/* reload if category change*/}
                                        {category === 'today' ? (
                                            forecast?.forecastday[0]?.hour.map((item, index) => (
                                                <View className="flex flex-col rounded-full items-center justify-between py-6 h-56 w-28 mx-3 bg-[#1F2B47]" key={index}>
                                                    <View className="w-20 h-20 bg-[#111D3B] rounded-full justify-center items-center mb-2">
                                                        <Image source={weatherImages[item?.condition.text]} className="w-16 h-16" />
                                                    </View>
                                                    <Text className="text-[#FCB4B5] text-3xl">{item?.temp_c}°</Text>

                                                    <View className="bg-[#EC5648] rounded-full px-3 py-1 justify-center items-center">
                                                        <Text className="text-white text-lg">{cvDate2Time(item?.time)}</Text>
                                                    </View>
                                                </View>
                                            ))

                                        ) : category === 'tomorrow' ? (
                                            forecast?.forecastday[1]?.hour.map((item, index) => (
                                                
                                                <View className="flex flex-col rounded-full items-center justify-between py-6 h-56 w-28 mx-3 bg-[#1F2B47]" key={index}>
                                                    <View className="w-20 h-20 bg-[#111D3B] rounded-full justify-center items-center mb-2">
                                                        <Image source={weatherImages[item?.condition.text]} className="w-16 h-16" />
                                                    </View>
                                                    <Text className="text-[#FCB4B5] text-3xl">{item?.temp_c}°</Text>

                                                    <View className="bg-[#EC5648] rounded-full px-3 py-1 justify-center items-center">
                                                        <Text className="text-white text-lg">{cvDate2Time(item?.time)}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        ) : category === 'week' ? (

                                            forecast?.forecastday.map((item, index) => (
                                                // skip index 0
                                                index === 0 ? null :

                                                <View className="flex flex-col rounded-full items-center justify-between py-6 h-56 w-28 mx-3 bg-[#1F2B47]" key={index}>
                                                    <View className="w-20 h-20 bg-[#111D3B] rounded-full justify-center items-center mb-2">
                                                        <Image source={weatherImages[item?.day?.condition.text]} className="w-16 h-16" />
                                                    </View>
                                                    <Text className="text-[#FCB4B5] text-3xl">{item?.day?.avgtemp_c}°</Text>

                                                    <View className="bg-[#EC5648] rounded-full px-3 py-1 justify-center items-center">
                                                        <Text className="text-white text-lg">{cvDate2Day(item?.date)}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        ) : null}


                                    </ScrollView>
                                </View>
                            </ScrollView>

                        </View>
                    </SafeAreaView>
                )
            }



        </View>
    )
}