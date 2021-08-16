import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
  Easing,
  Image,
  TouchableOpacity,
} from "react-native";
import { data } from "./data";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const HEIGHT_OF_TEXT = height * (0.1 / 2);

const filteredData = data.filter((item, i) => {
  return item.image !== "none";
});

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [theImageOfSpice, setTheImageOfSpice] = React.useState(0);
  const opacityAnimationImageSpice = React.useRef(
    new Animated.Value(0)
  ).current;
  const xyMovement = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleImage = React.useRef(new Animated.Value(0.85)).current;
  const [cart, setCart] = React.useState([]);
  // const [checkoutClicked, setCheckoutClicked] = React.useState(false);
  // const pressedAnimation = React.useRef(new Animated.Value(0)).current;
  // const checkoutWindowScaleX = React.useRef(new Animated.Value(7)).current;

  function animateX() {
    Animated.timing(xyMovement, {
      toValue: { x: width * 1.4, y: -height * 1.11 },
      duration: 1000,
      useNativeDriver: true,
    }).start(() => xyMovement.setValue({ x: 0, y: 0 }));
    Animated.timing(scaleImage, {
      toValue: 0.4,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      scaleImage.setValue(0.85);
    });
    Animated.timing(opacityAnimationImageSpice, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCart([...cart, filteredData[theImageOfSpice]]);
      opacityAnimationImageSpice.setValue(0);
    });
  }
  const inputRange = [
    0,
    HEIGHT_OF_TEXT * 1,
    HEIGHT_OF_TEXT * 2,
    HEIGHT_OF_TEXT * 3,
  ];
  const rotateZImage = scrollY.interpolate({
    inputRange,
    outputRange: [`30deg`, `${-30}deg`, `${-30 - 60}deg`, `${-30 - 120}deg`],
    easing: Easing.linear,
    extrapolate: "extend",
  });
  // const inputRangeForCheckout = [0, 1];
  // const animatedCheckout = pressedAnimation.interpolate({
  //   inputRange: inputRangeForCheckout,
  //   outputRange: ["-90deg", "0deg"],
  // });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9cb9f",
      }}
    >
      {/* {checkoutClicked ? (
        <Animated.View
          style={{
            width,
            height: height * 2,
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 10,
            justifyContent: "center",
            borderRadius: 40,
            transform: [
              {
                translateY: -height / 1,
              },
            ],
          }}
        >
          <View style={{ flex: 1, backgroundColor: "red" }}></View>
          <Animated.View
            style={{
              flex: 1,
              height,
              width,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              borderRadius: 20,
              overflow: "hidden",
              transform: [
                {
                  translateY: -height / 2,
                },
                {
                  rotateX: animatedCheckout,
                },
                {
                  scaleX: checkoutWindowScaleX,
                },
              ],
            }}
          >
            <Animated.View
              style={{ flex: 0.5, width, backgroundColor: "blue" }}
            ></Animated.View>

            <Animated.View
              style={{
                flex: 0.5,
                width,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: width * 0.7,
                  height: "17%",
                  backgroundColor: "#3e5954",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  Animated.timing(pressedAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                  }).start();
                  Animated.timing(checkoutWindowScaleX, {
                    toValue: 7,
                    duration: 1000,
                    useNativeDriver: true,
                  }).start(() => setCheckoutClicked(false));
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  PROCEED TO CHECKOUT
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      ) : null} */}

      <View style={{ height: height * 0.45 }}>
        <View
          style={{
            width,
            height: "30%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: height * 0.05,
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="menu" size={50} color="#3e5954" />
          <TouchableOpacity>
            <AntDesign name="shoppingcart" size={50} color="#3e5954" />
            {cart.length > 0 ? (
              <View
                style={{
                  width: width * 0.05,
                  height: width * 0.05,
                  borderRadius: width * 0.1,
                  backgroundColor: "red",
                  position: "absolute",
                  right: -5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.selection}>
        <Animated.View
          style={{
            position: "relative",
          }}
        >
          <Animated.Image
            source={require("./assets/Images/Table.png")}
            style={{
              width,
              height: height * 0.5,
              resizeMode: "contain",
              left: -(width * 0.5),
              zIndex: -1,
              transform: [
                {
                  rotateZ: rotateZImage,
                },
              ],
            }}
          />
          <Animated.View
            style={{
              width,

              position: "absolute",
              top: height * 0.17,
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={{
                width: width * 0.55,
                height: "100%",
                top: 7,
                left: width * 0.06,
              }}
            >
              <View style={{}}>
                <Animated.Image
                  source={
                    filteredData[
                      theImageOfSpice < filteredData.length
                        ? theImageOfSpice
                        : 0
                    ].image
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    transform: [
                      { scale: scaleImage },
                      { translateX: xyMovement.x },
                      { translateY: xyMovement.y },
                    ],
                    opacity: opacityAnimationImageSpice,
                  }}
                />
              </View>
            </Animated.View>
            <Animated.FlatList
              data={data}
              bounces={false}
              keyExtractor={(_, i) => i}
              snapToInterval={HEIGHT_OF_TEXT}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                {
                  useNativeDriver: false,
                  listener: (e) => {
                    if (
                      Math.ceil(scrollY._value / HEIGHT_OF_TEXT) <
                      filteredData.length
                    ) {
                      setTheImageOfSpice(
                        Math.ceil(scrollY._value / HEIGHT_OF_TEXT)
                      );
                    }
                  },
                }
              )}
              style={{
                width: width * 0.5,
                height: HEIGHT_OF_TEXT * 3,
              }}
              contentContainerStyle={{
                alignItems: "flex-end",
              }}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 3) * HEIGHT_OF_TEXT,
                  (index - 2) * HEIGHT_OF_TEXT,
                  (index - 1) * HEIGHT_OF_TEXT,
                  index * HEIGHT_OF_TEXT,
                  (index + 1) * HEIGHT_OF_TEXT,
                ];

                const opacityAnimation = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.3, 0.4, 1, 0.4, 0.3],
                });

                if (item.image === "none") {
                  return (
                    <Animated.View
                      style={{
                        width: width * 0.5,
                        height: HEIGHT_OF_TEXT,
                        alignSelf: "center",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Animated.Text
                        style={{
                          color: "white",
                          fontSize: 30,
                          fontWeight: "bold",
                          opacity: opacityAnimation,
                        }}
                      >
                        {}
                      </Animated.Text>
                    </Animated.View>
                  );
                } else {
                  return (
                    <Animated.View
                      style={{
                        width: width * 0.5,
                        height: HEIGHT_OF_TEXT,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Animated.Text
                        style={{
                          color: "#3e5954",
                          fontSize: 30,
                          fontWeight: "bold",
                          opacity: opacityAnimation,
                          letterSpacing: 1,
                        }}
                      >
                        Spice {index}
                      </Animated.Text>
                    </Animated.View>
                  );
                }
              }}
            />
          </Animated.View>

          <Animated.View
            style={{
              width,
              height: height * 0.13,
              backgroundColor: "transparent",
              marginTop: height * 0.07,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                width: width * 0.22,
                height: width * 0.22,
                borderRadius: width,
                backgroundColor: "#3e5954",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="heart" size={50} color="#f9cb9f" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: width * 0.71,
                height: width * 0.22,
                borderRadius: width * 0.25,
                backgroundColor: "#3e5954",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                opacityAnimationImageSpice.setValue(1);
                animateX();
              }}
            >
              <Text
                style={{ color: "#f9cb9f", fontSize: 30, fontWeight: "bold" }}
              >
                ADD TO CART
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selection: {
    alignItems: "center",
    justifyContent: "center",
    width,
    height: height * 0.3,
    marginTop: height * 0.03,
  },
});
