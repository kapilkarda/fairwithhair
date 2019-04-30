import { AsyncStorage } from 'react-native';

class UtilService {
    static async saveLocalStringData(key, strValue) {
        await AsyncStorage.setItem('@gogo:' + key, strValue);
        return true;
    }
    static async saveLocalObjectData(key, obj) {
        await AsyncStorage.setItem('@gogo:' + key, JSON.stringify(obj));
    }
    static async getLocalStringData(key) {
        let ret = await AsyncStorage.getItem('@gogo:' + key);

        return ret
    }
    static getLocalTime(date){
        var d = new Date(date)
        d.setTime(d.getTime() - (new Date()).getTimezoneOffset()*60*1000);
        return d
    }
    static async getLocalObjectData(key) {
        let ret = await AsyncStorage.getItem('@gogo:' + key);
        if (ret != null) {
            return JSON.parse(ret)
        } else {
            return null
        }
    }
    static getLocalTimeString(timeString){
      
        var d = new Date(timeString)
        d.setTime(d.getTime() - (new Date()).getTimezoneOffset()*60*1000);
        var res = d.toLocaleDateString() + ' ' + 
                  d.toLocaleTimeString()
        return res
    }
    static async removeLocalObjectData(key) {
        let ret = await AsyncStorage.removeItem('@gogo:' + key);
        return true
    }
}

export default UtilService
