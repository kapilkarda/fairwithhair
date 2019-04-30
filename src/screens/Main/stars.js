import React from 'react'
import { View, StyleSheet, Text,Image,FlatList } from 'react-native';
import  *  as  actions  from  "../../store/common/actions"
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

 class Star extends React.Component {
  
  constructor(props) {
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  componentDidMount(){
    this.props.actions.getAll()
  }
 

 
  
  _renderItem = ({ item }) => (
    <View style={{width:60,height:60}}>

         <Image
            style={{width:30,height:30, borderRadius:15, marginLeft:40}}
            source={{uri:item.url}}
         />
        <Text style={styles.lightbold}>{item.name}</Text>
        
    </View>
  );

  render() {
    const { me, count,item } = this.props

    console.log("image data",this.props)

    return (
      // <View style={styles.container} >

      //     <View style={{width:'100%', padding:6, alignItems:'center', flex:1, marginTop:40}}>
      //           <View style={{ width:'100%', flex:1}}>
      //             <FlatList
      //               data={this.props.all} 
      //               keyExtractor={(item, i) => String(i)}
      //               renderItem={this._renderItem}
      //             />
                   
      //           </View>

      //     </View>
             
      // </View>

       <View style={styles.MainContainer}>
        <FlatList
          data={this.props.all}
          renderItem={({ item }) => (
            <View style={{ flex: 1/3, flexDirection: 'column', margin: 1 ,padding:2}}>
            <View style={{height:120, backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:6 }}>
            
              <Image style={styles.imageThumbnail} source={{ uri: item.url }} />
             
              <Text  style={styles.lightbold} numberOfLines={2}>{item.name}</Text>
           
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
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
)(Star);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width:60,
    height: 60,
    marginTop:5,
   
  },
  lightbold:{
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    marginTop:5
    
   

  }
});