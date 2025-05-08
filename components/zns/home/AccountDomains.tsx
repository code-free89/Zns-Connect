import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import DummyText from "@/components/ui/DummyText";
import GradientText from "@/components/ui/GradientText";
import { FavouriteDomains } from "@/components/zns/home/domains/Favourite";
import { MyDomain } from "@/components/zns/home/domains/MyDomain";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function AccountDomains() {
  const [index, setIndex] = useState(0);
  const { domains } = useAppSelector((state) => state.userDomains);
  const { favourites } = useAppSelector((state) => state.setting);
  const [myDomainsSize, setMyDomainsSize] = useState({ width: 0, height: 0 });
  const [favouriteDomainsSize, setFavouriteDomainsSize] = useState({
    width: 0,
    height: 0,
  });

  const DomainsTabBar = () => {
    return (
      <View style={styles.tabBar}>
        <DummyText
          text={`My domains(${domains?.length || 0})`}
          textStyle={styles.selectedTitle}
          size={myDomainsSize}
          setSize={setMyDomainsSize}
        />

        <DummyText
          text={`Favourites(${favourites.length})`}
          textStyle={styles.selectedTitle}
          size={favouriteDomainsSize}
          setSize={setFavouriteDomainsSize}
        />

        <Pressable
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 6,
            gap: getWidthSize(4),
          }}
          onPress={() => setIndex(0)}
        >
          {index === 0 ? (
            <GradientText
              text={`My domains(${domains?.length || 0})`}
              textStyle={styles.selectedTitle}
              size={myDomainsSize}
            />
          ) : (
            <Text style={styles.title}>{`My domains(${
              domains?.length || 0
            })`}</Text>
          )}
          {index === 0 ? (
            <Image
              source={require("@/assets/images/icons/action/dropdown-active.png")}
              style={{ marginTop: 8 }}
            />
          ) : (
            <Image
              source={require("@/assets/images/icons/action/dropdown.png")}
              style={{ marginTop: 8 }}
            />
          )}
        </Pressable>

        <Pressable
          style={{ flex: 1, marginLeft: 6 }}
          onPress={() => setIndex(1)}
        >
          {index === 1 ? (
            <GradientText
              text={`Favourites(${favourites.length})`}
              textStyle={styles.selectedTitle}
              size={favouriteDomainsSize}
            />
          ) : (
            <Text
              style={styles.title}
            >{`Favourites(${favourites.length})`}</Text>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DomainsTabBar />
      {index === 0 && <MyDomain />}
      {index === 1 && <FavouriteDomains />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(4),
  },
  selectedTitle: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.body,
    borderBottomWidth: 2,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(4),
  },
  title: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.body,
    borderBottomWidth: 2,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(4),
  },
  tabText: {
    fontSize: 14,
  },
  defaultText: {
    color: CustomDarkTheme.colors.body,
  },
  tabItem: {
    flex: 1,
    height: 30,
    alignItems: "center",
  },
});
