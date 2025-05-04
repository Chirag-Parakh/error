
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as HomeScreen, default as ProfileScreen } from '../screens/welcomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

export default BottomTabNavigator;
