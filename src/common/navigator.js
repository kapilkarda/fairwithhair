import { createBottomTabNavigator } from 'react-navigation';
import Tab1Screen from '../screens/Main/search';
import Tab2Screen from '../screens/Main/goclub';
import Tab4Screen from '../screens/Main/instagram';
import Tab5Screen from '../screens/Main/profile';
import Tab3Screen from '../screens/Main/promotion';
import Tab6Screen from '../screens/Main/stars';

import NavTabBar from './TabBar/maintabbar';

export const MainNavigator = createBottomTabNavigator(
    {
      Tab1: { screen: Tab1Screen },
      Tab2: { screen: Tab2Screen },
      Tab3: { screen: Tab3Screen },
      Tab4: { screen: Tab4Screen },
      Tab5: { screen: Tab5Screen },
      Tab6: { screen: Tab6Screen },

    },
    {
      initialRouteName: 'Tab1',
      tabBarComponent: NavTabBar,
      tabBarPosition: 'bottom',
    }
  );
  