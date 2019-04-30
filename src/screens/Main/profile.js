import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Entypo, SimpleLineIcons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import * as actions from "../../store/common/actions";
import { ImagePicker,Permissions,ImageManipulator } from 'expo'
import { ScrollView } from 'react-native-gesture-handler';
import Cache from '../../utils/cache'

class Account extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      firstname:Cache.currentUser.firstname,
      lastname:Cache.currentUser.lastname,
      email:Cache.currentUser.email,
      password:Cache.currentUser.password,
      image:Cache.currentUser.image,
      name:Cache.currentUser.name,
      phone:Cache.currentUser.phone,
      _id:Cache.currentUser._id
    }
  }
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
      console.log(' edit profile image',  image)

    }
  };
  async takePicture(){
    let res = await Permissions.askAsync(Permissions.CAMERA)
    if ( res.status ==='granted'){
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if ( status === 'granted' ){
            let image = await ImagePicker.launchCameraAsync({
                quality:0.6
            })
            if ( !image.cancelled ){
                this.setState({isWaiting:true})
                const manipResult = await ImageManipulator.manipulate(
                    image.uri,
                    [{resize:{width:768}}],
                    { format: 'jpeg', compress:0.6 }
                );
                this.setState({image: manipResult.uri})
                this.props.actions.uploadEdit(manipResult, manipResult.uri)
            }
        }
    }
}

  editprofile(){
    console.log(' edit profile image1',  this.state.image)
    let { firstname, lastname, email, password, name, phone, _id } = this.state
    this.props.actions.editprofile( name, firstname, lastname, email, password, this.state.image, phone, _id )
  }

  logOut(){
    this.props.actions.logOut()
    Actions.pop()
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior = 'padding' style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={{position:'absolute', left:10, bottom:12}} onPress={()=>{Actions.pop()}}>
            <Entypo name="arrow-long-left" size={22} color='#333' />
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute', right:10, bottom:12}} onPress={()=>{this.editprofile()}}>
            <AntDesign name="check" size={22} color='#333' />
          </TouchableOpacity>
          <Text style={{fontWeight:'600', fontSize:20, color:'#fff'}}>Profile</Text>  
        </View>   
        <ScrollView>
          <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:150}}>
            {
            this.state.image
              ? <TouchableOpacity onPress={()=>this.pickImage()}>
                  <Image source = {{uri:this.state.image}} style={{width: 100, height:100, borderRadius:50}} />
                </TouchableOpacity>
              : <TouchableOpacity style={styles.icon} onPress={()=>this.pickImage()}>
                  <SimpleLineIcons name="user-follow" size={40} color='#fff' />
                </TouchableOpacity>
            }
          </View>

          <View style={{justifyContent:'center', alignItems:'center', marginTop:-20, marginBottom:10}}>
            <Text style={[styles.text, {color:'#8868ef', paddingVertical:0}]}>Edit Photo</Text>
          </View>
          
          <View style={{paddingHorizontal:50, flex:1, flexDirection:'column'}}>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={[styles.input, {paddingLeft:1}]}
                placeholder='Your First Name'
                onChangeText={(firstname) => this.setState({firstname})}
                value={this.state.firstname}
              />
            </View>
            <View style={{ marginTop:10}}>
              <TextInput
                underlineColorAndroid="transparent"
                style={[styles.input, {paddingLeft:1}]}
                placeholder='Your Last Name'
                onChangeText={(lastname) => this.setState({lastname})}
                value={this.state.lastname}
              />
            </View>
            <Text style={{color:'#ddd', marginTop:15}}>Private Information</Text>

            <View style={{width:'100%', marginTop:10}}>
              <AntDesign style={styles.inputicon} name="mail" size={16} color='#ddd' />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                type='email'
                placeholder='Type Your Email'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </View>

            <View style={{width:'100%', marginTop:10}}>
              <Feather style={styles.inputicon} name="phone" size={16} color='#ddd' />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Type Your Phone Number'
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
              />
            </View>

            <View style={{width:'100%', marginTop:10}}>
              <FontAwesome style={styles.inputicon} name="lock" size={18} color='#ddd' />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder='Type Your Password'
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>

            <View style={{justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.logOut()}>
                <Text style={styles.text}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => ({
      me:state.common.me,
      editimage:state.common.editimage
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Account);


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
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
    color:'#ff5b64',
    fontWeight:'600',
    paddingVertical:12,
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
  input: {
    fontSize: 14,
    color: '#111',
    height: 34,
    alignSelf: "stretch",
    marginBottom: 3,
    paddingLeft: 24,
    borderBottomWidth:1,
    borderBottomColor:'#888'
  },
  inputicon:{
    position:'absolute',
    top:10,
    left:2
  },
});
