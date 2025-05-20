import { StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { getFontSize, getWidthSize } from "@/utils/size";
import { CustomDarkTheme } from "@/constants/theme";
import { fontStyles } from "@/constants/fonts";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage === 0) {
      // First page: [1] 2 3
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(
          <View
            key={i}
            style={i === 1 ? styles.pageSelectedItem : styles.pageItem}
            onTouchEnd={() => onPageChange(i)}
          >
            <Text style={i === 1 ? styles.pageSelectedText : styles.pageText}>
              {i}
            </Text>
          </View>
        );
      }
    } else if (currentPage === totalPages - 1) {
      // Last page: currentPage-2, currentPage-1, [currentPage]
      for (let i = Math.max(0, totalPages - 3); i < totalPages; i++) {
        pages.push(
          <View
            key={i}
            style={
              i === totalPages - 1 ? styles.pageSelectedItem : styles.pageItem
            }
            onTouchEnd={() => onPageChange(i)}
          >
            <Text
              style={
                i === totalPages - 1 ? styles.pageSelectedText : styles.pageText
              }
            >
              {i + 1}
            </Text>
          </View>
        );
      }
    } else {
      // Middle pages: currentPage-1 [currentPage] currentPage+1
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(
          <View
            key={i}
            style={
              i === currentPage ? styles.pageSelectedItem : styles.pageItem
            }
            onTouchEnd={() => onPageChange(i)}
          >
            <Text
              style={
                i === currentPage ? styles.pageSelectedText : styles.pageText
              }
            >
              {i + 1}
            </Text>
          </View>
        );
      }
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <FontAwesome6
        name="arrow-left-long"
        size={20}
        color={currentPage === 0 ? "#A3A3A3" : "white"}
        onTouchEnd={() => currentPage > 0 && onPageChange(currentPage - 1)}
      />

      <View style={styles.pageContainer}>{renderPageNumbers()}</View>

      <FontAwesome6
        name="arrow-right-long"
        size={20}
        color={currentPage === totalPages - 1 ? "#A3A3A3" : "white"}
        onTouchEnd={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    margin: "auto",
    gap: getWidthSize(24),
  },
  pageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(14),
  },
  pageItem: {
    width: getWidthSize(30),
    height: getWidthSize(30),
    alignItems: "center",
    justifyContent: "center",
  },
  pageSelectedItem: {
    width: getWidthSize(30),
    height: getWidthSize(30),
    borderRadius: getWidthSize(11),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    alignItems: "center",
    justifyContent: "center",
  },
  pageText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  pageSelectedText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: "white",
  },
});
