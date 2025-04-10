import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import { domainColors } from "@/constants/Colors";
import { CustomDarkTheme } from "@/constants/theme";
import { IZnsDomain } from "@/types/zns";

type Props = {
  index: number;
  domain: IZnsDomain;
  isFavourite?: boolean;
  onEdit: () => void;
};

export default function DomainItem({
  index,
  domain,
  isFavourite = false,
  onEdit,
}: Props) {
  return (
    <View style={styles.container}>
      {isFavourite ? (
        <Ionicons
          name="heart-sharp"
          size={18}
          color={CustomDarkTheme.colors.primary}
        />
      ) : (
        <Text style={styles.index}>{index}</Text>
      )}
      <View style={styles.domainContainer}>
        {domain.icon}
        <Text style={styles.domainName}>
          {domain.name}
          <Text style={{ color: domainColors[domain.type] }}>
            .{domain.type}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.actionContainer} onPress={onEdit}>
        <FontAwesome6
          name="edit"
          size={12}
          color={CustomDarkTheme.colors.p700}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  index: {
    fontWeight: 700,
    fontSize: 12,
    color: CustomDarkTheme.colors.caption,
    marginRight: 8,
  },
  domainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  domainName: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
    marginLeft: 16,
  },
  actionContainer: {
    padding: 8,
    borderRadius: 10,
    borderColor: CustomDarkTheme.colors.p700,
    borderWidth: 0.65,
  },
});
