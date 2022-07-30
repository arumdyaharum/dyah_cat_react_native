import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Card({ data }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.containerCard}
    onPress={() => {
      navigation.navigate('Detail', {name: data.name});
    }}>
      {data.image ? (
        <Image style={styles.imageCard} source={{
          uri: data.image.url,
        }} />
      ) : null}
      <View style={styles.textContainerCard}>
        <Text style={styles.textBold}>{data.name}</Text>
        <Text>{data.temperament ? data.temperament : '-'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    margin: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageCard: {
    height: 200,
    width: "100%",
  },
  textContainerCard: {
    padding: 14,
  },
  textBold: {
    fontWeight: 'bold',
  },
});