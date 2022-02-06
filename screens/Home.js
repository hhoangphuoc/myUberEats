import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  HeaderTabs,
  SearchBar,
  Categories,
  RestaurantItems,
  BottomTabs,
} from "../components";

import { dummydata } from "../constant";

const YELP_API_KEY =
  "Y8YO0rbWU0IUKMqTSIkbOywy7Qaj-jy0UFXgxbmPDrOgzaAASMJRuA5ybgKQnU_IaMxGNiBUDcP60q1MgHy0jSzAjYNE9FRMtlb1OOaFe452iD8fw0VoZgBZxRT_YXYx";

export default function Home() {
  //states of the components of the app
  const [restaurantData, setRestaurantData] = useState(
    dummydata.localRestaurants
  );
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  //FETCH DATA FROM YELP API
  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  //CHANGE based on the THE STATE( city and active tab) ON MOUNT ( when city/active tab is changed)
  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ flex: 1, top: 40 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          // navigation={navigation}
        />
      </ScrollView>
      <View
        style={{ width: "100%", height: 1, backgroundColor: "black" }}
      ></View>
      <BottomTabs />
    </SafeAreaView>
  );
}
