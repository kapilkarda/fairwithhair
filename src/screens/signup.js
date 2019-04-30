import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Modal, ActivityIndicator,Alert } from 'react-native'
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import * as actions from "../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { ImagePicker,Permissions,ImageManipulator } from 'expo'
import Cache from '../utils/cache'
import api from '../api'

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      name:'',
      password:'',
      email:'',
      image:'',
      isWaiting: false,
      isRefreshing:false,
    },
    this.continue = this.continue.bind(this)
  }
  CheckTextInputIsEmptyOrNot = () =>{
 
    const { name }  = this.state ;
    const { password }  = this.state ;
    const { email }  = this.state ;

   if(name.length <= 1  )
   {
     Alert.alert("Name at least 2 character long.");
   }
   else{
    
   // Do something here which you want to if all the Text Input is filled.
    this.continue()
  // Alert.alert("All Text Input is Filled.");
    
   }
   if(password.length <=5 )
   {
     Alert.alert("Password at least 6 character/number long.");
   }
   else{
    
   // Do something here which you want to if all the Text Input is filled.
    this.continue()
  // Alert.alert("All Text Input is Filled.");
    
   }
   if(email=='')
   {
     Alert.alert("Please Enter email");
   }
   else{
    
  //  // Do something here which you want to if all the Text Input is filled.
     this.continue()
  // // Alert.alert("All Text Input is Filled.");
    
   }
    
     }
  
  continue(){
    try{
    this.setState({isWaiting:true})
    api.register(this.state.name, this.state.email, this.state.password, this.props.image, (err,res)=>{
      if (err == null ){
        console.log('res', res)
        this.setState({isWaiting:false})
        Cache.currentUser = res.results
        Actions.pop('')
        Actions.main()
      }
     
      this.setState({isWaiting:false})
     
    })
  }catch(e){
    Alert.alert('Error!', e.message, [{ text: 'OK', onPress: () =>{} }]);

  }
  }
  
  

  async takePicture(){
    let {customerImage}=this.state
    let res = await Permissions.askAsync(Permissions.CAMERA)
    if ( res.status ==='granted'){
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if ( status === 'granted' ){
            let image = await ImagePicker.launchCameraAsync({
                quality:0.6
            })
            if ( !image.cancelled ){
                const manipResult = await ImageManipulator.manipulate(
                    image.uri,
                    [{resize:{width:768}}],
                    { format: 'jpeg', compress:0.6 }
                );
                this.props.actions.upload(manipResult,manipResult.uri)
            }
        }
    }
}

renderIndicator() {
  return (
    <Modal
      visible={this.state.isWaiting}
      transparent={true}
      onRequestClose={() => {}}
    >
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
}


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior = 'padding'  enabled >
        <View style={styles.header}>
          <TouchableOpacity style={{position:'absolute', left:10, bottom:12}} onPress={()=>{Actions.test()}}>
            <Entypo name="arrow-long-left" size={22} color='#333' />
          </TouchableOpacity>
          <Text style={{fontWeight:'600', fontSize:20, color:'#fff'}}>Sign Up</Text>  
        </View>   
        <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:150}}>
          {
            this.props.image
            ? <Image  source = {{uri:this.props.image}} style={{width:100, height:100, borderRadius:50}}/>
            : <TouchableOpacity style={styles.icon} onPress={()=>this.takePicture()}>
                <SimpleLineIcons name="user-follow" size={40} color='#fff' />
              </TouchableOpacity>
          }
        </View>

        <View style={{width:'90%', marginTop:10}}>
          <Text style={{color:'#ff5b64'}}>USER NAME</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder='Your User Name'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <View style={{width:'90%', flexDirection:'row', marginTop:12}}>
          <View style={{width:'50%'}}>
            <Text style={{color:'#ff5b64'}}>EMAIL</Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.input}
              placeholder='Your Email'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={{height:53, width:1, backgroundColor:'#aaa'}}></View>
          <View style={{flex:1}}>
            <Text style={{color:'#ff5b64', marginLeft:10}}>PASSWORD</Text>
            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              style={[styles.input, {paddingLeft:10}]}
            
              placeholder='Your Password'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>
        </View>

        <TouchableOpacity onPress={this.CheckTextInputIsEmptyOrNot}>
          <View style={styles.button}>
            <Text style={styles.text}>Continue</Text>
          </View>
        </TouchableOpacity>

        {this.renderIndicator()}

      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => ({
      location:state.common.location,
      image:state.common.image
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Test);


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff'
  },
  header:{
    flexDirection:'row', 
    backgroundColor:'#8868ef', 
    elevation:5, 
    width:'100%', 
    height:70, 
    justifyContent:'center', 
    alignItems:'center', 
    paddingTop:20
  },
  login:{
    fontSize:30,
    fontWeight:'600',
    marginVertical:20
  },
  image:{
    width:200,
    height:100
  },
  text:{
    fontSize:18,
    color:'#fff',
    fontWeight:'600',
    paddingHorizontal:120,
    paddingVertical:12
  },
  button:{  
    backgroundColor:'#16c6e1',
    borderRadius:40,
    marginVertical:22
  },
  button1:{
    backgroundColor:'blue',
    borderRadius:40,
    marginVertical:16
  },
  icon:{
    width:100,
    height:100,
    marginHorizontal:90,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ff5b64'
  },
  inputicon:{
    position:'absolute',
    top:34,
    right:8
  },
  input: {
    fontSize: 14,
    color: '#111',
    height: 34,
    alignSelf: "stretch",
    marginBottom: 3,
    paddingLeft: 0,
    borderBottomWidth:1,
    borderBottomColor:'#888'
  },
  indicatorContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    width: 80,
    height: 80,
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: "white"
  },

});
