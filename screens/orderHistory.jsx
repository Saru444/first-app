import { StyleSheet, View, Text } from "react-native";

const OrderHistory=()=>{
    return(
        <View>
            <Text style={styles.text}>Din varukorg är tom!!</Text>
        </View>
    )
}
export default OrderHistory;

const styles=StyleSheet.create({
text:{
    fontSize:20,
    textAlign:"center",
    margin:50,
}
})