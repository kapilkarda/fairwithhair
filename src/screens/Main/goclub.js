'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Toast } from 'antd-mobile-rn';
import axios from 'axios';
import Cache from '../../utils/cache'

import * as actions from "../../store/common/actions";

var gHandler = null

class Chat extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
     message:'',
     chatdata : [],
     isRefreshing:false
    };
    gHandler = this

  }

  componentDidMount(){
    //this.setState({chatdata:this.props.me.remarks})
    this.onRefresh()
  }

  onRefresh(){
    axios.get(`http://3.92.60.33:8083/api/members/` + Cache.currentUser._id)
    .then(res => {
      console.log('res,           res', res)
      const results = res.data.data.remarks;
      this.setState({ chatdata : results });
    })
  }

  onEndReached(){
    // this.pageSize+=10
    // this.searchItems(this.state.search)
  }

  message(){
    if(this.state.chatdata.length == 0){
      Toast.fail('You can not start chat !')
      this.setState({message:''})
    } else {
      // Toast.success('Your message sent !')

      this.props.actions.sendChat(this.state.message, Cache.currentUser._id)
      this.setState({message:''})
      this.onRefresh()

    }
  }

  _renderItem = ({ item }) => (
    <View style={{flexDirection:'row', marginHorizontal:8, justifyContent:item.name == 'Me'? 'flex-end': 'flex-start', flex:1}}>
      <Image source={{uri:item.name == 'Me' ? null : item.photoURL }} style={styles.avatar} />
      <View>
         <Text style={[styles.itemText, {paddingLeft:12}]}>{item.name == 'Me' ? '' : item.name}</Text>
         <View style={[styles.contentbox, { backgroundColor:item.name == 'Me' ? '#4f4b49' : '#334d73'}]}>
             <Text style={[styles.itemText, {paddingLeft:12, fontSize:16}]}>{item.content}</Text>
             <Text style={{paddingLeft:12, color:'#7f8083'}}>{item.createOn}</Text>
         </View>
      </View>
    </View>
  );

   _ItemSeparator = () => <View style={styles.separator} />;


  render() {
    return (
      <KeyboardAvoidingView enabled behavior = 'padding' style={styles.container}>
        <View style={styles.headBox}>
           <Text style={[styles.itemText, {padding:5, paddingLeft:22, fontSize:16, fontWeight:'600'}]}>Chat Page</Text>
           <Text style={[styles.itemText, {padding:5, paddingLeft:22, fontSize:14}]}>You can chat with admin anytime.</Text>
        </View>
          <View style={styles.content}>
            <Text style={[styles.itemText, {textAlign:'center'}]}>Today</Text>
            <FlatList
              style={{marginBottom:45}}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => gHandler.onRefresh()}
                    tintColor={'grey'}
                />
              }
              onEndReachedThreshold={0.1}
              onEndReached={gHandler.onEndReached.bind(gHandler)}
              data={this.state.chatdata}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this._ItemSeparator}
            />
             <TextInput
              style={styles.message}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
            />
            <TouchableOpacity style={styles.icon} onPress={()=>this.message()}>
              <FontAwesome name="send-o" size={30} color='#fff' />
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
      me:state.common.me,
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    marginTop: 20, 
    backgroundColor:'rgb(48,48,48)'
  },
  headBox:{
    borderLeftColor:'#00d014',
    borderLeftWidth:5,
    elevation:5
  },
  itemText:{
    fontSize:12,
    color:'#fff'
  },
  icon:{
    position:'absolute',
    bottom:6,
    right:10
  },
  content:{
    marginTop:20,
    flexDirection:'column',
    flex:1,
    justifyContent:'center',
  },
  message:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    bottom:0, 
    position:'absolute', 
    width:'100%',
    color:'#fff',
    fontSize:22,
    paddingLeft:20
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:20
  },
  contentbox:{
    flexDirection:'row',
    backgroundColor:'#334d73',
    borderRadius:12,
    padding:6,
    marginLeft:12,
    marginTop:7
  },
  separator: {
    height: 12,
  }
  
});
