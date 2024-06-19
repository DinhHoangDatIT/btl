import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import MyStyles from "../../styles/MyStyles"
import React from "react";
import { endpoints } from "../../configs/API";


const ActivityDetails = ({route}) => {
    const {activityId} =route.params;
    const [activity, setActivity] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        const getActivityDetails = async () => {
            try {
                let res = await API.get(endpoints['activity-details'](activityId));
                setActivity(res.data);
                setLoading(false);
            } catch (error) {
                setActivity(null);
                setLoading(false);
                console.log(error);
            }
        };

        getActivityDetails();
    }, [activityId]);

    return (
        <View style={MyStyles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                activity && (
                    <ScrollView>
                        <Text style={MyStyles.subject}>Chi tiết Hoạt Động</Text>
                        <Image source={{ uri: activity.image }} style={MyStyles.avatar} />
                        <Text style={MyStyles.title}>{activity.name}</Text>
                        <Text style={MyStyles.margin}>{activity.description}</Text>
                        <Text style={MyStyles.margin}>Ngày bắt đầu: {activity.start_date}</Text>
                        <Text style={MyStyles.margin}>Ngày kết thúc: {activity.end_date}</Text>
                        <Text style={MyStyles.margin}>Điểm: {activity.points}</Text>
                    </ScrollView>
                )
            )}
        </View>
    );
};



export default ActivityDetails