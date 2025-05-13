import Constants from "expo-constants";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import DummyText from "@/components/ui/DummyText";
import GradientText from "@/components/ui/GradientText";
import { FavouriteDomains } from "@/components/zns/home/domains/Favourite";
import { MyDomain } from "@/components/zns/home/domains/MyDomain";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

const SORT_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Sort by name", value: "name" },
  { label: "Sort by length", value: "length" },
];

export default function AccountDomains() {
  const [index, setIndex] = useState(0);
  const { domains } = useAppSelector((state) => state.userDomains);
  const { favourites } = useAppSelector((state) => state.setting);
  const [myDomainsSize, setMyDomainsSize] = useState({ width: 0, height: 0 });
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortModalPosition, setSortModalPosition] = useState({
    x: 0,
    y: 0,
  });
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
            position: "relative",
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
            <Pressable
              onPress={(event) => {
                setSortModalPosition({
                  x: event.nativeEvent.pageX,
                  y: event.nativeEvent.pageY,
                });
                setIndex(0);
                setSortModalVisible(true);
              }}
            >
              <Image
                source={require("@/assets/images/icons/action/dropdown-active.png")}
                style={{ marginTop: 8 }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => setSortModalVisible(true)}>
              <Image
                source={require("@/assets/images/icons/action/dropdown.png")}
                style={{ marginTop: 8 }}
              />
            </Pressable>
          )}
          <Modal
            isVisible={sortModalVisible}
            backdropColor="transparent"
            onBackdropPress={() => setSortModalVisible(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
            <View
              style={[
                styles.sortModalContainer,
                {
                  right: sortModalPosition.x,
                  top: sortModalPosition.y - Constants.statusBarHeight,
                },
              ]}
            >
              {SORT_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setSortModalVisible(false);
                    setSortOption(option);
                  }}
                >
                  <Text style={styles.sortItemText}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </Modal>
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
      {index === 0 && <MyDomain sortOption={sortOption.value} />}
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
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
    borderBottomWidth: 2,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(4),
  },
  title: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
    borderBottomWidth: 2,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(4),
  },
  defaultText: {
    color: CustomDarkTheme.colors.body,
  },
  tabItem: {
    flex: 1,
    height: 30,
    alignItems: "center",
  },
  sortModalContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getHeightSize(20),
    borderRadius: 16,
    position: "absolute",
    gap: getHeightSize(24),
  },
  sortItemText: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.txtColor,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
  },
});
