import Button from "@/components/ui/Button";
import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet, Text, Image } from "react-native";
import DomainItem from "../../DomainItem";
import { IZnsDomain } from "@/types/zns";
import DomainInfoModal from "../DomainInfoModal";
import { useState } from "react";

const domains: IZnsDomain[] = [
  {
    icon: (
      <Image
        width={26}
        height={26}
        style={{ width: 26, height: 26 }}
        source={require("@/assets/images/icon.png")}
      />
    ),
    name: "poly",
    type: "poly",
  },
];

const NoDomain = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>No domain in your wallets</Text>
        <Text style={styles.description}>
          {
            "Buy your first domain to have an ability \n to explore and follow people"
          }
        </Text>
      </View>

      <Button
        variant="secondary"
        title="Register a Domain"
        style={{ width: "100%" }}
      />
    </View>
  );
};

export const MyDomain = () => {
  const [isDomainInfoModalVisible, setIsDomainInfoModalVisible] =
    useState(false);
  const [selectedDomain, setSelectedDomain] = useState<IZnsDomain | null>(null);

  return (
    <View style={styles.container}>
      {selectedDomain && (
        <DomainInfoModal
          isVisible={isDomainInfoModalVisible}
          domain={selectedDomain}
          onClose={() => setIsDomainInfoModalVisible(false)}
        />
      )}
      {domains.length ? (
        domains.map((domain, index) => (
          <DomainItem
            key={index}
            index={index + 1}
            domain={domain}
            onEdit={() => {
              setSelectedDomain(domain);
              setIsDomainInfoModalVisible(true);
            }}
          />
        ))
      ) : (
        <NoDomain />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    flexDirection: "column",
    gap: 8,
    marginVertical: 54,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  description: {
    fontWeight: 400,
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
