import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
// import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";

import { orderCollection, getOrder } from "../firebase";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
      },
    ],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  //TODO: CHANGE INTO FIREBASE V9 FORMAT - using GetDocs
  useEffect(() => {
    // const db = firebase.firestore();
    // const unsubscribe = db
    //   .collection("orders")
    //   .orderBy("createdAt", "desc")
    //   .limit(1)
    //   .onSnapshot((snapshot) => {
    //     snapshot.docs.map((doc) => {
    //       setLastOrder(doc.data());
    //     });
    //   });

    //querying the data with filters.
    // const q = query(orderCollection, orderBy("createdAt", "desc"), limit(1));
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     setLastOrder(doc.data());
    //   });
    // });

    //TODO: CAN WE CHANGE IT TO THIS__________________________
    getOrder(setLastOrder);
    //_____________________________________

    //wipe out the cache
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* green checkmark */}
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100%",
        }}
      >
        <LottieView
          style={{
            height: 100,
            alignSelf: "center",
            marginBottom: 30,
            marginTop: 15,
          }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItems
            foods={lastOrder.items}
            hideCheckbox={true}
            marginLeft={10}
          />
          <LottieView
            style={{ height: 200, alignSelf: "center" }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
