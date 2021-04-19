import React, { useState, useEffect } from "react";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
const data = require("../../assets/data/products.json");
const productsCategories = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  useEffect(() => {
    setProducts(data);
    setCategories(productsCategories);
    setProductsFiltered(data);
    setProductsCtg(data);
    setFocus(false);
    setActive(-1);
    setInitialState(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState([]);
    };
  }, []);

  //Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories Methods
  const changeCtg = (ctg) => {
    ctg === "all"
      ? [setProductsCtg(initialState), setActive(true)]
      : [
          setProductsCtg(
            products.filter((i) => {
              i.category.$oid === ctg, setActive(true);
            })
          ),
        ];
  };
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search Here"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProducts
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: "40%" }]}>
                <Text>No Products Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "#FFF",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
