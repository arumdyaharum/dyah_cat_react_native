import axios from 'axios';
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Clipboard, TouchableOpacity } from "react-native";
import Accordion from '../component/Accordion';

export default function Detail({ route }) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const name = route.params?.name;

  const copyToClipboard = (text) => {
    if(text) {
      Clipboard.setString(text)
    }
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${name}`)
      .then((res) => {
        const respon = res.data[0];
        setData(respon);
        return axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${respon.id}`);
      })
      .then((res) => {
        setImage(res.data[0].url);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (<ActivityIndicator />) : null}
        {data && image ? (
          <>
            <Image style={{ height: 300 }} source={{
              uri: image,
            }} />
            <View style={styles.container}>
              <Text style={styles.name}>{data.name} {data.alt_names ? `(${data.alt_names})` : null}</Text>
              <Accordion title="About The Breed">
                <View style={styles.tile}>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Origin</Text> : {data.origin ? data.origin : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Temperament</Text> : {data.temperament ? data.temperament : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Life Span</Text> : {`${data.life_span} Years` ? data.life_span : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Description</Text> : {data.description ? data.description : '-'}
                  </Text>
                </View>
              </Accordion>
              <Accordion title="Breed Types">
                <View style={styles.tile}>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Experimental</Text> : {data.experimental
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Hairless</Text> : {data.hairless
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Natural</Text> : {data.natural
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Rare</Text> : {data.rare
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Rex</Text> : {data.rex
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Suppress Tail</Text> : {data.suppress_tail
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Short Legs</Text> : {data.short_legs
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Hypoallergenic</Text> : {data.hypoallergenic
                      ? (<Text style={styles.colorGreen}>Yes</Text>) : (<Text style={styles.colorRed}>No</Text>)
                    }
                  </Text>
                </View>
              </Accordion>
              <Accordion title="Breed Characteristics">
                <View style={styles.tile}>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Adaptability</Text> : {data.adaptability ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.adaptability) {
                            return (<Text key={`adaptability${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`adaptability${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Affection Level</Text> : {data.affection_level ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.affection_level) {
                            return (<Text key={`affection_level${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`affection_level${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Child Friendly</Text> : {data.child_friendly ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.child_friendly) {
                            return (<Text key={`child_friendly${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`child_friendly${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Dog Friendly</Text> : {data.dog_friendly ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.dog_friendly) {
                            return (<Text key={`dog_friendly${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`dog_friendly${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Energy Level</Text> : {data.energy_level ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.energy_level) {
                            return (<Text key={`energy_level${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`energy_level${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Grooming</Text> : {data.grooming ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.grooming) {
                            return (<Text key={`grooming${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`grooming${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Health Issues</Text> : {data.health_issues ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.health_issues) {
                            return (<Text key={`health_issues${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`health_issues${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Intelligence</Text> : {data.intelligence ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.intelligence) {
                            return (<Text key={`intelligence${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`intelligence${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Shedding Level</Text> : {data.shedding_level ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.shedding_level) {
                            return (<Text key={`shedding_level${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`shedding_level${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Social Needs</Text> : {data.social_needs ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.social_needs) {
                            return (<Text key={`social_needs${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`social_needs${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Stranger Friendly</Text> : {data.stranger_friendly ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.stranger_friendly) {
                            return (<Text key={`stranger_friendly${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`stranger_friendly${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                  <Text style={styles.mb10}>
                    <Text style={styles.bold}>Vocalisation</Text> : {data.vocalisation ? (
                      <Text style={styles.colorOrange}>
                        { Array.from(Array(5), (e, i) => {
                          if (i < data.vocalisation) {
                            return (<Text key={`vocalisation${i}`}>&#9733;</Text>);
                          } else {
                            return (<Text key={`vocalisation${i}`}>&#9734;</Text>);
                          }
                        }) }
                      </Text>
                    ) : '-'}
                  </Text>
                </View>
              </Accordion>
              <Accordion title="Breed Article">
                <View style={styles.tile}>
                  <TouchableOpacity onPress={() => copyToClipboard(data.wikipedia_url ? data.wikipedia_url : null)}>
                    <Text style={styles.mb10}>
                      <Text style={styles.bold}>Wikipedia URL</Text> : {data.wikipedia_url ? data.wikipedia_url : '-'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(data.cfa_url ? data.cfa_url : null)}>
                    <Text style={styles.mb10}>
                      <Text style={styles.bold}>CFA URL</Text> : {data.cfa_url ? data.cfa_url : '-'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(data.vetstreet_url ? data.vetstreet_url : null)}>
                    <Text style={styles.mb10}>
                      <Text style={styles.bold}>Vet Street URL</Text> : {data.vetstreet_url ? data.vetstreet_url : '-'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(data.vcahospitals_url ? data.vcahospitals_url : null)}>
                    <Text style={styles.mb10}>
                      <Text style={styles.bold}>VCA Hospitals URL</Text> : {data.vcahospitals_url ? data.vcahospitals_url : '-'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Accordion>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  mb10: {
    marginBottom: 10,
  },
  colorGreen: {
    color: "green",
  },
  colorRed: {
    color: "red",
  },
  colorOrange: {
    color: "orange",
  },
  tile: {
    backgroundColor: "#ddd",
    borderWidth: 0.5,
    borderColor: "#ddd",
    flexDirection: "column",
    width: "100%",
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
});
