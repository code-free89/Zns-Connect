type DomainType = "poly" | "honey" | "gold";

export interface IZnsDomain {
  icon: React.ReactNode;
  name: string;
  type: DomainType;
}
