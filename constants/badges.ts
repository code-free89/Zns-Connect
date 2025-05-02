export const Badges = {
  Followers100Badge: "Followers100Badge",
  Followers500Badge: "Followers500Badge",
  Followers1000Badge: "Followers1000Badge",
  Followers10000Badge: "Followers10000Badge",
  Domain100DaysBadge: "Domain100DaysBadge",
  Domain200DaysBadge: "Domain200DaysBadge",
  Domain365DaysBadge: "Domain365DaysBadge",
  Domain500DaysBadge: "Domain500DaysBadge",
  DomainL1Badge: "DomainL1Badge",
  DomainL2Badge: "DomainL2Badge",
  DomainL3Badge: "DomainL3Badge",
  DomainL4Badge: "DomainL4Badge",
  Domain2Badge: "Domain2Badge",
  Domain5Badge: "Domain5Badge",
  Domain20Badge: "Domain20Badge",
  Domain100Badge: "Domain100Badge",
};

export enum BadgeStatus {
  claimed = "Claimed",
  not_available = "Not Available",
  ready = "Ready",
}

export type BadgeDataType = {
  amount: number | string | null;
  status: BadgeStatus;
};

export type BadgeConfigType = {
  type: (typeof Badges)[keyof typeof Badges];
  title: string;
  description: string;
  banner: any;
  rule: "follow" | "length" | "domains";
  value: number;
  data?: BadgeDataType;
};

export type BadgeType = BadgeConfigType & {
  data: BadgeDataType;
  size: "md" | "lg";
};

export const getBadgeItem = (type: (typeof Badges)[keyof typeof Badges]) => {
  return badges.find((item) => item.type === type);
};

export const getBadgeData = (
  domains: string[],
  followers: number,
  userBadges: (typeof Badges)[keyof typeof Badges][]
) => {
  return badges.map((item) => {
    let data: BadgeDataType = {
      amount: null,
      status: BadgeStatus.not_available,
    };
    const userEarned = userBadges.includes(item.type);

    if (item.rule === "domains") {
      if (domains.length >= item.value) {
        data = { amount: domains.length, status: BadgeStatus.ready };
      } else {
        data = { amount: domains.length, status: BadgeStatus.not_available };
      }
    } else if (item.rule === "follow") {
      if (followers >= item.value) {
        data = { amount: followers, status: BadgeStatus.ready };
      } else {
        data = { amount: followers, status: BadgeStatus.not_available };
      }
    } else if (item.rule === "length") {
      if (domains.map((item) => item.length).includes(item.value)) {
        data = { amount: null, status: BadgeStatus.ready };
      } else {
        data = { amount: null, status: BadgeStatus.not_available };
      }
    }

    if (userEarned) {
      data.status = BadgeStatus.claimed;
    }

    return { ...item, data };
  });
};

export const badges: BadgeConfigType[] = [
  {
    type: Badges.Followers100Badge,
    title: "100 followers",
    description: "Connected with 100 Followers",
    banner: require("@/assets/images/app/badges/100-followers.png"),
    rule: "follow",
    value: 100,
  },
  {
    type: Badges.Followers500Badge,
    title: "500 followers",
    description: "Connected with 500 Followers",
    banner: require("@/assets/images/app/badges/500-followers.png"),
    rule: "follow",
    value: 500,
  },
  {
    type: Badges.Followers1000Badge,
    title: "1000 followers",
    description: "Connected with 1000 Followers",
    banner: require("@/assets/images/app/badges/1000-followers.png"),
    rule: "follow",
    value: 1000,
  },
  {
    type: Badges.Followers10000Badge,
    title: "10000 followers",
    description: "Connected with 10000 Followers",
    banner: require("@/assets/images/app/badges/10000-followers.png"),
    rule: "follow",
    value: 10000,
  },
  {
    type: Badges.DomainL1Badge,
    title: "1 Letter Domain",
    description: "Owning one 1-letter domain",
    banner: require("@/assets/images/app/badges/1-letter.png"),
    rule: "length",
    value: 1,
  },
  {
    type: Badges.DomainL2Badge,
    title: "2 Letter Domain",
    description: "Owning one 2-letter domain",
    banner: require("@/assets/images/app/badges/2-letter.png"),
    rule: "length",
    value: 2,
  },
  {
    type: Badges.DomainL3Badge,
    title: "3 Letter Domain",
    description: "Owning one 3-letter domain",
    banner: require("@/assets/images/app/badges/3-letter.png"),
    rule: "length",
    value: 3,
  },
  {
    type: Badges.DomainL4Badge,
    title: "4 Letter Domain",
    description: "Owning one 4-letter domain",
    banner: require("@/assets/images/app/badges/4-letter.png"),
    rule: "length",
    value: 4,
  },
  {
    type: Badges.Domain2Badge,
    title: "2 Domains",
    description: "Own 2 domains on ZNS",
    banner: require("@/assets/images/app/badges/2-domains.png"),
    rule: "domains",
    value: 2,
  },
  {
    type: Badges.Domain5Badge,
    title: "5 Domains",
    description: "Own 5 domains on ZNS",
    banner: require("@/assets/images/app/badges/5-domains.png"),
    rule: "domains",
    value: 5,
  },
  {
    type: Badges.Domain20Badge,
    title: "20 Domains",
    description: "Own 20 domains on ZNS",
    banner: require("@/assets/images/app/badges/20-domains.png"),
    rule: "domains",
    value: 20,
  },
  {
    type: Badges.Domain100Badge,
    title: "100 Domains",
    banner: require("@/assets/images/app/badges/100-domains.png"),
    rule: "domains",
    value: 100,
    description: "Own 100 domains on ZNS",
  },
];
