import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const Cart = (props) => {
  return (
    <View style={{ display: "flex" }}>
      {props.cartItems.map((x) => {
        return <Text>{x.product.name}</Text>;
      })}
    </View>
  );
};

const mapStateToProps = ({ cartReducer }) => {
  return {
    cartItems: cartReducer,
  };
};

export default connect(mapStateToProps, null)(Cart);
