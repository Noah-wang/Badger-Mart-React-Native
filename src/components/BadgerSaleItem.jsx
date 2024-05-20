import { Image, Text, View } from "react-native";


export default function BadgerSaleItem(props) {

    return <View>
        <Image style={{ width: 250, height: 250, padding: 50,   alignSelf: 'center'}} source={{ uri: props.imgSrc }} />
        <Text style={{ fontSize: 48 }}>{props.name}</Text>
        <Text style={{ fontSize: 30 }} >${props.price.toFixed(2)}</Text>
        <Text style={{ fontSize: 20 }}>You can order up to {props.upperLimit === -1 ? 'lots of' : props.upperLimit} units!</Text>
    </View>
}
