import MyStyles from "../../styles/MyStyles"
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from "react-native"
import Styles from "./Styles"
import API, { endpoints } from '../../configs/API'
import React from "react"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"




const Home = ({route}) => {
  const [activities, setActivities] = React.useState([]);
  const regId = route.params?.regId;

  React.useEffect(() => {
    const getActivities = async () => {
      let url = endpoints['activities'];

      if (regId !== undefined && regId != null)
        url = `${url}?regulation_id=${regId}`

      try {
            let res = await API.get(url);
            setActivities(res.data);
      }catch (error) {
      setActivities([])
      console.log(error);
    }
  };

  getActivities();
  }, [regId]);

  return (
        <View>
          <Text>Welcome to Home Screen</Text>
          <ScrollView>
          {activities===null?<ActivityIndicator/>:<>
            {activities.map(c=>(
                <View style={MyStyles.row} key={c.id}>
                  <TouchableOpacity>
                    <Image source={{ uri: c.image }} style = {[MyStyles.m_10, {width: 80, height:80}]}/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[MyStyles.m_10, MyStyles.title]}>{c.name}</Text>                     
                  </TouchableOpacity>
                </View>
          ))}
          </>}            
          </ScrollView>
        </View>
      );

}
    export default Home