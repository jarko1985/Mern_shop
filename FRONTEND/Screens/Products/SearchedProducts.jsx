import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Content, Left, Body, ListItem, Thumbnail } from "native-base";

var { width, height } = Dimensions.get("window");

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <View style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Product Detail", {
                  item: product,
                });
              }}
              key={product._id.$oid}
            >
              <View style={styles.searchItemContainer}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: product.image }}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.nameStyle}>{product.name}</Text>
                  <Text style={styles.descriptionStyle}>
                    {product.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View>
          <Text>No Items Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchItemContainer: {
    marginTop: 10,
    marginLeft: 5,
    display: "flex",
    flexDirection: "row",
    width: width,
    height: 60,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    width: width - 80,
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 3,
  },
  descriptionStyle: {
    fontSize: 12,
  },
  priceStyle: {
    alignSelf: "center",
  },
});

export default SearchedProducts;
