import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import GradientText from "@/components/ui/GradientText";
import { CustomDarkTheme } from "@/constants/theme";
import { FavouriteDomains } from "./domains/Favourite";
import { MyDomain } from "./domains/MyDomain";

export default function AccountDomains() {
  const [index, setIndex] = useState(0);

  const routes = useMemo(() => {
    return [
      { key: "myDomain", title: `My domains(${0})` },
      { key: "favourite", title: `Favourites(${1})` },
    ];
  }, []);

  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, index: number) => (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setIndex(index)}
          >
            {props.navigationState.index === index ? (
              <GradientText
                key={index}
                text={route.title}
                textStyle={styles.tabText}
              />
            ) : (
              <Text style={[styles.tabText, styles.defaultText]}>
                {route.title}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <TabView
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        myDomain: MyDomain,
        favourite: FavouriteDomains,
      })}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  defaultText: {
    color: CustomDarkTheme.colors.body,
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
});
