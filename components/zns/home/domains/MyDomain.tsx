import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import DomainTypeSelect from "@/components/zns/DomainTypeSelect";
import DomainInfoModal from "@/components/zns/home/DomainInfoModal";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, getChainColor, NETWORKS } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAppSelector } from "@/store";
import { UserDomainType } from "@/store/slices/user-domains";
import { getHeightSize, getWidthSize } from "@/utils/size";

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
        variant="outline"
        title="Register a Domain"
        style={{ backgroundColor: "#13150A" }}
        textStyle={styles.registerDomainButton}
        onPress={() => router.push("/(tabs)/register")}
      />
    </View>
  );
};

function MyDomainItem({
  domain,
  index,
  onOpenProfile,
}: {
  domain: UserDomainType;
  index: number;
  onOpenProfile: () => void;
}) {
  const { chainId, domainName, isPrimary } = domain;
  const chain = CHAINS.find((chain) => chain.id === chainId);
  const tld = useTLD(chainId);

  const handleEditProfile = () => {
    router.push({
      pathname: "/(zns)/manage-profile",
      params: {
        domainId: domain.domainId,
      },
    });
  };

  return (
    <Pressable style={styles.myDomainItem} onPress={onOpenProfile}>
      <Text style={styles.domainIndex}>{index}</Text>
      <Image source={chain?.icon} style={styles.domainIcon} />
      <Text style={styles.domainName}>
        {domainName}
        <Text style={{ color: getChainColor(chainId) }}>.{tld}</Text>
      </Text>
      {isPrimary && (
        <View
          style={[
            styles.primaryContainer,
            { borderColor: getChainColor(chainId) },
          ]}
        >
          <Text style={styles.primaryText}>Primary</Text>
        </View>
      )}
      <Pressable style={styles.editButton} onPress={handleEditProfile}>
        <FontAwesome6
          name="edit"
          size={12}
          color={CustomDarkTheme.colors.p700}
        />
      </Pressable>
    </Pressable>
  );
}

export const MyDomain = ({ sortOption }: { sortOption: string }) => {
  const [isDomainInfoModalVisible, setIsDomainInfoModalVisible] =
    useState(false);
  const [selectedDomain, setSelectedDomain] = useState<UserDomainType | null>(
    null
  );
  const [selectedNetwork, setSelectedNetwork] = useState<NETWORKS>();
  const { domains } = useAppSelector((state) => state.userDomains);
  const filteredDomains = useMemo(() => {
    let filters = domains ? [...domains] : [];
    if (selectedNetwork) {
      filters = filters.filter((domain) => domain.chainId === selectedNetwork);
    }
    if (sortOption === "name") {
      filters = filters.sort((a, b) =>
        a.domainName.localeCompare(b.domainName)
      );
    } else if (sortOption === "length") {
      filters = filters.sort((a, b) => a.lengthOfDomain - b.lengthOfDomain);
    }
    return filters;
  }, [domains, selectedNetwork, sortOption]);

  return (
    <View style={styles.container}>
      {selectedDomain && (
        <DomainInfoModal
          isVisible={isDomainInfoModalVisible}
          domain={selectedDomain}
          onClose={() => setIsDomainInfoModalVisible(false)}
        />
      )}

      <DomainTypeSelect value={selectedNetwork} onSelect={setSelectedNetwork} />

      <View style={{ gap: getHeightSize(20), marginTop: 24 }}>
        {filteredDomains?.length ? (
          filteredDomains.map((domain, index) => (
            <MyDomainItem
              key={index}
              index={index + 1}
              domain={domain}
              onOpenProfile={() => {
                setSelectedDomain(domain);
                setIsDomainInfoModalVisible(true);
              }}
            />
          ))
        ) : (
          <NoDomain />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: getHeightSize(20),
  },
  textContainer: {
    flexDirection: "column",
    gap: getHeightSize(8),
    marginVertical: getHeightSize(48),
  },
  title: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(18),
    lineHeight: getHeightSize(18 * 1.5),
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  registerDomainButton: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.35),
    color: CustomDarkTheme.colors.primary,
  },
  myDomainItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: getWidthSize(10),
    borderRadius: getHeightSize(12),
    backgroundColor: "#26262666",
  },
  domainIndex: {
    ...fontStyles["SpaceMono-Bold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.35),
    color: CustomDarkTheme.colors.caption,
  },
  domainIcon: {
    width: getWidthSize(26),
    height: getWidthSize(26),
    borderRadius: 9999,
    marginLeft: getWidthSize(8),
    marginRight: getWidthSize(16),
  },
  domainName: {
    ...fontStyles["WorkSans-Medium"],
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.4),
    color: "white",
  },
  editButton: {
    padding: getHeightSize(8),
    borderRadius: 10,
    borderColor: CustomDarkTheme.colors.p700,
    borderWidth: 0.65,
    marginLeft: "auto",
  },
  primaryContainer: {
    borderWidth: 0.5,
    borderRadius: 23,
    paddingVertical: getHeightSize(2),
    paddingHorizontal: getWidthSize(6),
    marginLeft: getWidthSize(8),
  },
  primaryText: {
    ...fontStyles["WorkSans-Medium"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
    color: "white",
  },
});
