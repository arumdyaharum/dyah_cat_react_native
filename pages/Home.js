import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "../component/Card";

export default function Home({ navigation }) {
  const [cats, setCats] = useState(null);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(false);

  const ITEM_PER_PAGE = 10;

  const loadmore = () => {
    if(!loading && cats.length < totalItem) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    axios.get(`https://api.thecatapi.com/v1/breeds`)
      .then((res) => {
        setTotalItem(res.data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.thecatapi.com/v1/breeds?limit=${page * ITEM_PER_PAGE}`)
      .then((res) => {
        setLoading(false);
        setCats(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const renderFooter = () => (
    <View style={styles.footer}>
      {!loading && cats && cats.length === totalItem ? (<Text>No more cat</Text>) : (<ActivityIndicator />) }
    </View>
  );

  return (
    <SafeAreaView>
      {loading ? (<ActivityIndicator />) : null }
      <FlatList
        data={cats}
        renderItem={({item}) => <Card data={item} />}
        keyExtractor={item => `cats_${item.id}`}
        ListFooterComponent={renderFooter}
        onEndReached={loadmore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
