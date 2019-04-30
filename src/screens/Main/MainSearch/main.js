import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cache from '../../../utils/cache'

import * as actions from "../../../store/common/actions";

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      count:Cache.currentUser.count,
     image:Cache.currentUser.image,

      username:'',
      password:'',

    }
  }

  componentDidMount(){
    this.props.actions.getAll()
  }

  stamp(item){
    this.props.actions.increaseCount(item.count + 1, item._id)
    this.props.actions.getAll()
  }

  calculate(){
    let note = ''
    let value = this.state.count;
    console.log ('hi, my count1', this.state.count)

    if (value == 1) {
      note = 'You have get 1st Stamp'
    }
   else if (value  == 2) {
      note = 'You have get 2nd Stamp'
    }
   else if (value  == 3) {
      note = 'You have get 3rd Stamp'
    }
   else if (value == 4) {
      note = 'You have get 4th Stamp'
    }
   else if (value == 5) {
      note = 'You have get 5th Stamp'
    }
    else
    if (value == 0) {
      note = ''
    }
    console.log('hi, my count1', this.state.count)

    return(

      <Text style={{fontSize:18, fontWeight:'300', marginTop:15}}> {note}</Text>
    )
  }

  _renderItem = ({ item }) => (
      <View style={styles.list2}>
           <Image
              style={{width:30,height:30, borderRadius:15, marginLeft:40}}
              source={{uri:item.image ? item.image : 'https://twu.edu/media/images/cas/NoImage300sq.jpg'}}
           />
          <Text style={styles.lightbold}>{item.name}</Text>
          <Text style={styles.light}>{item.count}</Text>

          <MaterialCommunityIcons name="circle-slice-8" size={14} color="green" style={[styles.lefticon, {marginTop:5}]} />
          <TouchableOpacity style={[styles.button, {position:'absolute', right:10}]} onPress={()=>this.stamp(item)}>
             <Text style={{color:'#fff', fontSize:16, fontWeight:'600', paddingHorizontal:24, paddingVertical:4}}>STAMP ME</Text>
          </TouchableOpacity>
      </View>
    );

  _renderImg = ({item}) => (
    <View>
      <Image source={{uri:item.image}} style={{width:300, height:200, margin:10, borderRadius:8}}/>
      <Text style={styles.text1}>{item.text}</Text>
      <Text style={styles.text2}>{item.notice}</Text>
    </View>
  )

  render() {
    const { me, count } = this.props
    const value = this.props.count;
    // console.log ('hi, my count11', value)

    // console.log('hi, my count', count)
    // console.log('hi, my info', me)

    return (
      <View style={styles.container} >

          <Image
            style={styles.image}
            source={require('../../../../assets/images/logo.jpg')}
          />

          <View style={{width:'100%', height:329, padding:6, alignItems:'center'}}>
            {
              me.admin == 1 ?
                <View style={{ width:'100%'}}>
                  <FlatList
                    data={this.props.all} 
                    keyExtractor={(item, i) => String(i)}
                    renderItem={this._renderItem}
                  />
                </View>
             
              : <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.circle}
                    source={{uri:this.state.image ? this.state.image : 'https://twu.edu/media/images/cas/NoImage300sq.jpg'}}
                    />
                 <View style={{flexDirection:'row', alignItems:'center', marginTop: 20}}>
                    
                    <View style={ this.props.count % 5 == 1 || this.props.count == 0 ? styles.stampB :styles.stamp}>
                      <Text></Text>
                    </View>
                    <View style={ this.props.count % 5 == 2 ? styles.stampB :styles.stamp}>
                      <Text></Text>
                    </View>
                    <View style={ this.props.count % 5 == 3 ? styles.stampB :styles.stamp}>
                      <Text>-10%</Text>
                    </View>
                    <View style={ this.props.count % 5 == 4 ? styles.stampB :styles.stamp}>
                      <Text></Text>
                    </View>
                    <View style={ this.props.count % 5 == 0 && this.props.count !== 0 ? styles.stampB :styles.stamp}>
                      <Text>-20%</Text>
                    </View>
                </View>
                {this.calculate()}
              </View>
            }
         </View>
      </View>
    )
  }
}

export default connect(
  state => ({
      me:state.common.me,
      count: state.common.count,
      all:state.common.all
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(Main);

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  login:{
    fontSize:30,
    fontWeight:'600',
    marginVertical:20
  },
  image:{
    width:250,
    height:120
  },
  text:{
    fontSize:36,
    color:'#fff',
    fontWeight:'300',
    paddingHorizontal:30,
    paddingVertical:14
  },
  button:{  
    backgroundColor:'#d12026',
    borderRadius:10,
    marginTop:-3
  },
  button1:{
    backgroundColor:'blue',
    borderRadius:40,
    marginVertical:16
  },
  icon:{
    width:40,
    height:40,
    marginHorizontal:20,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3d5b98'
  },
  inputicon:{
    position:'absolute',
    top:32,
    left:8
  },
  input: {
    fontSize: 14,
    color: '#111',
    paddingLeft:40,
    height: 44,
    alignSelf: "stretch",
    marginBottom: 3,
    borderBottomWidth:1,
    borderBottomColor:'#888'
  },
  stamp:{
    width:50,
    height:50,
    backgroundColor:'#ddd',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3
  },
  stampB:{
    width:70,
    height:70,
    backgroundColor:'#ddd',
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3
  },
  circle:{
    marginTop:30,
    width:130,
    height:130,
    borderRadius:65
  },
  lightbold:{
    fontSize:17, 
    color:'#777', 
    fontWeight:'300',
    marginLeft:20,
    width:60
  },
  light:{
      fontSize:17,
      color:'#999',
      fontSize:14, 
      marginBottom:20, 
      marginLeft:20
  },
  list2:{
    flex: 1, 
    flexDirection: 'row', 
    marginHorizontal: 10, 
    marginVertical:5,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'#ddd'
  },
  lefticon:{
    position:'absolute',
    left:2
  },

});
