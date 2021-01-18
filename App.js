import React, { Component } from 'react';

import { View, Text, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import ClientScreen from './screen/ClientScreen';
import ReportScreen from './screen/ReportScreen';
import ReportMonthScreen from './screen/ReportMonthScreen';
import AppointmentScreen from './screen/AppointmentScreen';
import ProfileScreen from './screen/ProfileScreen';
import SignInScreen from './screen/SignInScreen';
import SignUpScreen from './screen/SignUpScreen';

import ProfileLocationScreen from './screen/ProfileLocationScreen';
import ProfileStaffScreen from './screen/ProfileStaffScreen';
import ProfileServiceScreen from './screen/ProfileServiceScreen';
import ProfileMenuCategoryScreen from './screen/ProfileMenuCategoryScreen';
import ProfileProductCategoryScreen from './screen/ProfileProductCategoryScreeen';
import AppointmentActionsScreen from './screen/AppointmentActionsScreen';
import ProfileMenuItemScreen from './screen/ProfileMenuItemScreen';
import ProfileProductItemScreen from './screen/ProfileProductItemScreen';
import ProfileConfigurableCategoryScreen from './screen/ProfileConfigurableCategoryScreen';
import ProfileConfigurableItemScreen from './screen/ProfileConfigurableItemScreen';
import ConfigurableCategoryScreen from './screen/ConfigurableCategoryScreen';


import LocationModal from './modal/LocationModal';
import ClientModal from './modal/ClientModal';
import StaffModal from './modal/StaffModal';
import AppointmentModal from './modal/AppointmentModal';
import ServiceModal from './modal/ServiceModal';
import MenuModal from './modal/MenuModal';
import ProductModal from './modal/ProductModal';
import ConfigruableModal from './modal/ConfigurableModal';
import DayHoursSetupModal from './modal/DayHoursSetupModal';
import OptionModal from './modal/OptionModal';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import i18n from './i18n/i18n';
import { Provider } from 'react-redux';
import  configStore  from './configStore';
import { DayHoursSetup } from './element/basic';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
    </View>
  );
}


function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}

const MainStack = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppointmentStack = createStackNavigator();
const ReportStack = createStackNavigator();
const ConfigurableStack = createStackNavigator();

function ProfileStackScreen (){
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileLocation" component={ProfileLocationScreen} />
      <ProfileStack.Screen name="ProfileStaff" component={ProfileStaffScreen} />
      <ProfileStack.Screen name="ProfileService" component={ProfileServiceScreen} />
      <ProfileStack.Screen name="ProfileMenuCategory" component={ProfileMenuCategoryScreen} />
      <ProfileStack.Screen name="ProfileMenuItem" component={ProfileMenuItemScreen} />
      <ProfileStack.Screen name="ProfileProductCategory" component={ProfileProductCategoryScreen} />
      <ProfileStack.Screen name="ProfileProductItem" component={ProfileProductItemScreen} />
      <ProfileStack.Screen name="ProfileConfigurableCategory" component={ProfileConfigurableCategoryScreen} />
      <ProfileStack.Screen name="ProfileConfigurableItem" component={ProfileConfigurableItemScreen} />
    </ProfileStack.Navigator>
  );
}
function AppointmentStackScreen (){
  return(
    <AppointmentStack.Navigator headerMode="none">
      <AppointmentStack.Screen name="Appointment" component ={AppointmentScreen} />
      <AppointmentStack.Screen name="AppointmentActions" component ={AppointmentActionsScreen} />

    </AppointmentStack.Navigator>
  )
}
function ReportStackScreen (){
  return(
    <ReportStack.Navigator headerMode="none">
      <ReportStack.Screen name="Report" component ={ReportScreen} />
      <ReportStack.Screen name="ReportMonth" component ={ReportMonthScreen} />

    </ReportStack.Navigator>
  )
}

function ConfigurableStackScreen (){
  return(
    <ReportStack.Navigator headerMode="none">
      <ReportStack.Screen name="ConfigurableCategory" component ={ConfigurableCategoryScreen} />
    </ReportStack.Navigator>
  )
}


function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode="none"
      screenOptions ={ ({route}) =>({
        tabBarIcon:({color,size}) =>{
          const icons = {
            Client:'people-outline',
            Appointment:'schedule',
            Report:'show-chart',
            Profile:'info-outline'
          };
          return(
            <Icon name={icons[route.name]}
              color ={color}
              type = 'material'
              size ={size}
              />
          );
        }
      })}
      >
      <MainStack.Screen name='Client' options={ {title:i18n.t('navigation.client')} } component={ClientScreen} />
      <MainStack.Screen name='Appointment' options={{title:i18n.t('navigation.appointment')}} component={AppointmentStackScreen} />
      <MainStack.Screen name='Report' options={{title:i18n.t('navigation.report')}} component={ReportStackScreen} />
      <MainStack.Screen name='Profile' options={{title:i18n.t('navigation.profile')}}  component={ProfileStackScreen} />
      <MainStack.Screen name='Configurable' options={{title:i18n.t('navigation.configurable')}}  component={ConfigurableStackScreen} />
    </MainStack.Navigator>
  );
}

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = { isReady: true , userToken:'' };
  }

/*
  componentDidMount = async() => {
    
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ isReady: true });
    
  }
*/

  render(){
    
    if( !this.state.isReady) {
      return (<SafeAreaProvider>
      <SafeAreaView>
      <ActivityIndicator size='small' color='#0000ff' />
        </SafeAreaView>  
      </SafeAreaProvider>
      );

    }
   
    const store = configStore();
    
    return( 
    <Provider store = { store }>
      <NavigationContainer>
      <RootStack.Navigator  mode="modal" headerMode="none" >
      { this.state.userToken != ''  ? ( 
        <>
        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) :(
        <>
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="ClientModal" component={ClientModal} />
        <RootStack.Screen name="AppointmentModal" component={AppointmentModal} />
        <RootStack.Screen name="LocationModal" component={LocationModal} />
        <RootStack.Screen name="StaffModal" component={StaffModal} />
        <RootStack.Screen name="ServiceModal" component ={ServiceModal} />
        <RootStack.Screen name="MenuModal" component={MenuModal} />
        <RootStack.Screen name="ProductModal" component={ProductModal} />
        <RootStack.Screen name="ConfigurableModal" component={ConfigruableModal} />
        <RootStack.Screen name="DayHoursSetupModal" component={DayHoursSetupModal} />
        <RootStack.Screen name="OptionModal" component={OptionModal} />
        </>
      ) }
      </RootStack.Navigator>
     </NavigationContainer>
    </Provider>
    );
    
  }
}

