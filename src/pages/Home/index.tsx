import {
    Text,
    H5,
    XStack,
    Avatar,
    H6,
    YStack,
    Circle,
    Separator,
    H3,
    Image,
    ScrollView,
    Tabs,
    styled,
    Button,
    createStyledContext,
    withStaticProperties,
    useTheme,
    getTokens,
    SizeTokens
} from 'tamagui'
import {
    ChevronLeft,
    MoreVertical,
    Heart,
    MessageCircle,
    Camera,
    Share,
    Activity,
    MenuSquare, Forward, TrendingUp
} from '@tamagui/lucide-icons'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {cloneElement, ReactNode, useContext, useState} from "react";
import {TouchableOpacity} from "react-native";

type ButtonContextType = {
    size: SizeTokens;
}

const ButtonContext = createStyledContext<ButtonContextType>({
    size: '$3' as SizeTokens,
});

const ButtonFrame = styled(TouchableOpacity, {
    name: 'Button',
    context: ButtonContext,
    backgroundColor: '$background',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 6,

    variants: {
        size: {
            '...size': (name, { tokens }) => {
                return {
                    height: tokens.size[name],
                    // borderRadius: tokens.radius[name],
                    gap: tokens.space[name].val * 0.2,
                }
            },
        },
    } as const,
});

const ButtonText = styled(Text, {
    name: 'ButtonText',
    context: ButtonContext,
    color: '$color',
    userSelect: 'none',

    variants: {
        size: {
            '...fontSize': (name, { font }) => ({
                fontSize: font?.size[name],
            }),
        },
    } as const,
});

const ButtonIcon = ({ children }: { children: JSX.Element }) => {
    const { size = 0 } = useContext(ButtonContext);
    const tokens = getTokens()
    const smallerSize = tokens.size[size].val * 0.5
    const theme = useTheme()
    return cloneElement(children, {
        width: smallerSize,
        height: smallerSize,
        color: theme.color.get(),
    })
}

export const MyButton = withStaticProperties(ButtonFrame, {
    Text: ButtonText,
    Icon: ButtonIcon,
    Props: ButtonContext.Provider,
})

const CustomButton = styled(Button, {
    size: '$sm' as SizeTokens,
    variants: {
        doubleWidth: (val: number) => ({
            width: val * 2,
        })
    } as const
})

function Home() {
    const [activeTab, setActiveTab] = useState(0);
    const insets = useSafeAreaInsets();

    return (
        <YStack paddingTop={insets.top} flex={1} backgroundColor="$gray1">
            <XStack
                space
                alignItems="center"
                justifyContent="space-between"
                paddingVertical={8}
                paddingHorizontal={4}>
                <ChevronLeft color="$blue11"/>
                <Text fontWeight="$5" fontSize="$sm">Pool Swimming</Text>
                <MoreVertical color="$blue11"/>
            </XStack>
            <ScrollView>
                <YStack backgroundColor="$gray4">
                    <YStack space>
                        <XStack space paddingVertical={16} paddingHorizontal={4}>
                            <Avatar circular size="$6">
                                <Avatar.Image source={{ uri: "http://placekitten.com/200/300" }}/>
                                <Avatar.Fallback bc="darkgrey"/>
                            </Avatar>
                            <YStack jc="center">
                                <H5>Luis Filipe</H5>
                                <H6 color="$gray11" fontWeight="$4" marginTop={2}>May 26th - Pool Swimming</H6>
                            </YStack>
                        </XStack>
                    </YStack>
                    <Separator/>
                    <XStack space paddingVertical={16} paddingHorizontal={8}>
                        <Heart color="$blue11"/>
                        <MessageCircle color="$blue11"/>
                        <Camera color="$blue11"/>
                        <Share color="$blue11"/>
                    </XStack>
                </YStack>
                <Tabs
                    defaultValue="tab1"
                    orientation="horizontal"
                    flexDirection="column"
                    borderRadius="$4"
                    borderWidth="$0.25"
                    overflow="hidden"
                    borderColor="$borderColor"
                    backgroundColor="$gray4"
                    marginTop={8}
                    tabIndex={2}
                >
                    <Tabs.List
                        separator={<Separator vertical/>}
                        disablePassBorderRadius="bottom"
                        aria-label="Manage your account">
                        <Tabs.Tab value="tab1" flex={1} backgroundColor="$backgroundPress">
                            <Activity size={28} color="$colorPress"/>
                        </Tabs.Tab>
                        <Tabs.Tab value="tab2" flex={1} backgroundColor="$backgroundPress">
                            <MenuSquare size={28} color="$colorPress"/>
                        </Tabs.Tab>
                        <Tabs.Tab value="tab3" flex={1} backgroundColor="$backgroundPress">
                            <Forward size={28} color="$colorPress"/>
                        </Tabs.Tab>
                        <Tabs.Tab value="tab4" flex={1} backgroundColor="$backgroundPress">
                            <TrendingUp size={28} color="$colorPress"/>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Separator/>

                    <Tabs.Content value="tab1">
                        <YStack paddingVertical={16}>
                            <XStack justifyContent="center" position="relative" space>
                                <Circle borderWidth={2} borderColor="$blue11" size="$10" marginTop={32}
                                        backgroundColor="$gray2">
                                    <YStack alignItems="center">
                                        <H3 fontWeight="$6">52:28</H3>
                                        <Text fontSize="$xs">Time</Text>
                                    </YStack>
                                </Circle>
                                <Circle borderWidth={2} borderColor="$orange11" size="$10" position="absolute"
                                        backgroundColor="$gray2" zIndex={10}>
                                    <YStack alignItems="center">
                                        <H3 fontWeight="$6">495</H3>
                                        <Text fontSize="$xs">Distance (m)</Text>
                                    </YStack>
                                </Circle>
                                <Circle borderWidth={2} borderColor="$green11" size="$10" marginTop={32}
                                        backgroundColor="$gray2" marginLeft={40}>
                                    <YStack alignItems="center">
                                        <H3 fontWeight="$6">374</H3>
                                        <Text fontSize="$xs">Calories</Text>
                                    </YStack>
                                </Circle>
                            </XStack>
                        </YStack>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <YStack paddingVertical={16} paddingHorizontal={8}>
                            <H5>Custom components</H5>

                            <Separator paddingVertical={8} />

                            <H6>Tamagui Button with variant</H6>

                            <CustomButton icon={<Heart size="$1" />} backgroundColor="$purple11" doubleWidth={80} my={16} fontSize="$md">
                                <CustomButton.Text fontWeight="$6">Button</CustomButton.Text>
                            </CustomButton>

                            <Separator />

                            <H6>Compound Custom Button</H6>

                            <MyButton backgroundColor="#7159ce" my={16} width={160} size="$4">
                                <MyButton.Icon>
                                    <Heart color="$gray10" />
                                </MyButton.Icon>
                                <MyButton.Text size="$sm" fontWeight="$6" marginLeft={4}>Button</MyButton.Text>
                            </MyButton>
                        </YStack>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <H5>Tab 3</H5>
                    </Tabs.Content>
                    <Tabs.Content value="tab4">
                        <H5>Tab 4</H5>
                    </Tabs.Content>
                </Tabs>

                <YStack space paddingVertical={16} paddingHorizontal={8}>
                    <H6 color="$gray11" fontWeight="$6">Your Watch</H6>

                    <XStack alignItems="center" space>
                        <Image source={{
                            width: 60,
                            height: 60,
                            uri: "https://cdn.shopify.com/s/files/1/0751/7203/products/100251661_BLK_4_1024x1024@2x.png?v=1654807006"
                        }}/>

                        <YStack>
                            <H6>Forerunner 955</H6>
                            <Text color="$gray11">15.19</Text>
                        </YStack>
                    </XStack>
                </YStack>
            </ScrollView>
        </YStack>
    )
}

export default Home;
