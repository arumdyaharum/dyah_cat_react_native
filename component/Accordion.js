import React, { useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Accordion = (props) => {
  const [expanded, setExpanded] = useState(false);

  const style = StyleSheet.create({
    button: {
      width: "100%", 
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingLeft: 14,
      paddingRight: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    buttonText: {
      transform: [{rotate: expanded ? "90deg" : "-90deg"}, {scaleX: 3}, {scaleY: 2}],
    },
    container: {
      flex: 1,
      overflow: "hidden",
      width: "100%",
      marginBottom: 14,
    }
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setExpanded(!expanded);
        }}
        style={style.button}
      >
        <Text>{props.title}</Text>
        <Text style={style.buttonText}>&#8249;</Text>
      </TouchableOpacity>
      {expanded ? props.children : null}
    </View>
  );
  
};

export default Accordion;