import { Pressable, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { CustomDarkTheme } from "@/constants/theme";

interface ReferralPaginationProps {
  curPage: number;
  pageCount: number;
  onPage: (page: number) => void;
}

export default function ReferralPagination({
  curPage,
  pageCount,
  onPage,
}: ReferralPaginationProps) {
  return (
    <View style={styles.paginationContainer}>
      <Pressable
        style={styles.paginationButton}
        disabled={curPage === 0}
        onPress={() => onPage(curPage - 1)}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </Pressable>

      <Text style={styles.paginationText}>
        {curPage + 1} of {pageCount}
      </Text>

      <Pressable
        style={styles.paginationButton}
        disabled={curPage === pageCount - 1}
        onPress={() => onPage(curPage + 1)}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paginationText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 1.42,
    color: "#CECFD2",
  },
  paginationButton: {
    borderRadius: getWidthSize(8),
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingVertical: getHeightSize(8),
    width: getWidthSize(115),
    alignItems: "center",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
  },
  paginationButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 1.42,
    color: "#CECFD2",
  },
});
