import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { COLORS } from '../../constants/Theme';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          title: 'JSearch',
          headerTintColor: COLORS.darkgreen,
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: ({ color }: any) => <TabBarIcon name='home' color={color} />,
          headerShadowVisible: false,
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Feather
                    name="user"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }: any) => <TabBarIcon name="pie-chart" color={color} />,
        }}
      />
    </Tabs>
  );
}
