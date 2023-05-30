import React from 'react';
import {useColorScheme} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import tamaguiConfig from "../tamagui.config";
import {TamaguiProvider, Theme} from 'tamagui';
import Home from "./pages/Home";
import {useFonts} from "expo-font";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    const colorScheme = useColorScheme()

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Regular.otf'),
        InterMedium: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterSemiBold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    if (!loaded) {
        return null
    }

    return (
        <SafeAreaProvider>
            <TamaguiProvider config={tamaguiConfig}>
                <Theme name={colorScheme === 'dark' ? 'dark' : 'light'} inverse>
                    <Home/>
                </Theme>
                <StatusBar style="auto"/>
            </TamaguiProvider>
        </SafeAreaProvider>
    );
}
