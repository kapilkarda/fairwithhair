import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({

    container: {
      
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopColor:'#ddd',
        borderTopWidth:1,
        margin:0
    },
    
    active: {
        width:'17%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        padding:6,
    },

    nonactive: {
        width:'17%',
        height: 60,
        padding:6,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default styles;