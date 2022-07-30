import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";
import Card from "../component/Card";

export default function Search({ route }) {
  const [cats, setCats] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = route.params?.search;

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${search}`)
      .then((res) => {
        setCats(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [search]);

  return (
    <SafeAreaView>
      {loading ? (<ActivityIndicator />) : null }
      <FlatList
        data={cats}
        renderItem={({item}) => <Card data={item} />}
        keyExtractor={item => `cats_${item.id}`}
      />
    </SafeAreaView>
  );
}