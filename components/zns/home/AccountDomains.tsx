import { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import GradientText from "@/components/ui/GradientText";
import ZnsText from "@/components/ui/Text";
import { FavouriteDomains } from "@/components/zns/home/domains/Favourite";
import { MyDomain } from "@/components/zns/home/domains/MyDomain";
import { CustomDarkTheme } from "@/constants/theme";

export default function AccountDomains() {
  const [index, setIndex] = useState(0);

  const routes = useMemo(() => {
    return [
      { key: "myDomains", title: `My domains(${0})` },
      { key: "favouriteDomains", title: `Favourites(${1})` },
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
                type="semiBold"
              />
            ) : (
              <ZnsText
                type="semiBold"
                style={[styles.tabText, styles.defaultText]}
              >
                {route.title}
              </ZnsText>
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
        myDomains: MyDomain,
        favouriteDomains: FavouriteDomains,
      })}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 14,
  },
  defaultText: {
    color: CustomDarkTheme.colors.body,
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    height: 30,
    alignItems: "center",
  },
});
