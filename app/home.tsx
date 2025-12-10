import Feed from "@/components/home/feed";
import Header from "@/components/home/header";
import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

const Home = (props: Props) => {
  const FILTERS = ["Design", "XD", "Figma", "Development", "Javascript", "CSS"];
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: boolean;
  }>({
    Design: false,
    XD: false,
    Figma: false,
    Development: false,
    Javascript: false,
    CSS: false,
  });
  const [search, setSearch] = useState<string | undefined>();

  const handlePress = (filter: string) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />

        {/* --- Search Bar --- */}
        <View style={styles.searchBar}>
          <Icon
            name="magnify"
            size={30}
            color="gray"
            style={{ marginHorizontal: 10, alignSelf: "center" }}
          />
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
          />
        </View>

        {/* --- Filters --- */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{ flexDirection: "row", marginTop: 15, marginBottom: 10 }}
          >
            {FILTERS.map((filter, index) => {
              const isActive = activeFilters[filter];

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: isActive
                        ? Colors.main
                        : Colors.lightGrey,
                    },
                  ]}
                  onPress={() => handlePress(filter)}
                >
                  <Text
                    style={[
                      { fontFamily: "Syne_400Regular", fontSize: 14 },
                      { color: isActive ? "white" : "black" },
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <Feed filters={FILTERS} activeFilters={activeFilters} search={search} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
  },
  input: {
    fontFamily: "Syne_400Regular",
    fontSize: 20,
  },
  searchBar: {
    width: "100%",
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});
