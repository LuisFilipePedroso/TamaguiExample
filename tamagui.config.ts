import {createAnimations} from '@tamagui/animations-react-native'
import {shorthands} from '@tamagui/shorthands'
import {themes, tokens} from '@tamagui/themes'
import {createFont, createTamagui} from 'tamagui'

const animations = createAnimations({
    bouncy: {
        type: 'spring',
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    lazy: {
        type: 'spring',
        damping: 20,
        stiffness: 60,
    },
    quick: {
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
    },
})

const bodyFont = createFont({
    face: {
        '400': {normal: 'Inter'},
        '500': {normal: 'InterMedium'},
        '600': {normal: 'InterSemiBold'},
        '800': {normal: 'InterBold'},
    },
    weight: {
        4: '400',
        5: '500',
        6: '600',
        8: '800,'
    },
    size: {
        xs: 12,
        sm: 16,
        md: 24,
        lg: 32,
    },
})

const config = createTamagui({
    animations,
    defaultTheme: 'dark',
    shouldAddPrefersColorThemes: false,
    themeClassNameOnRoot: false,
    shorthands,
    fonts: {
        heading: bodyFont,
        body: bodyFont,
    },
    themes,
    tokens,
})

export type AppConfig = typeof config

declare module 'tamagui' {
    // overrides TamaguiCustomConfig so your custom types
    // work everywhere you import `tamagui`
    interface TamaguiCustomConfig extends AppConfig {
    }
}

export default config
