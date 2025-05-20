export const PROFILE_CATEGORY = {
  DigitalCreator: "DigitalCreator",
  BlockchainEnthusiast: "BlockchainEnthusiast",
  SocialCreator: "SocialCreator",
  FinancialWizard: "FinancialWizard",
  TechInnovator: "TechInnovator",
  Gamer: "Gamer",
};

export interface RewardInfo {
  level: number;
  refer: number;
  reward: number;
  color: string;
  percent: number;
}
export const REWARDS: RewardInfo[] = [
  { level: 1, refer: 1, reward: 5, color: "#1C96FD", percent: 0 },
  { level: 2, refer: 10, reward: 10, color: "#33E360", percent: 25 },
  { level: 3, refer: 30, reward: 15, color: "#F4C630", percent: 50 },
  { level: 4, refer: 60, reward: 20, color: "#CB1245", percent: 75 },
  { level: 5, refer: 100, reward: 25, color: "#AD00FE", percent: 100 },
];
