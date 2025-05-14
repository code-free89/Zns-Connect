import DomainItem from "@/components/zns/DomainItem";

type AIGeneratedDomainProps = {
  domain: string;
  index: number;
  chainDirection?: "up" | "down";
};

export default function AIGeneratedDomain({
  domain,
  index,
  chainDirection,
}: AIGeneratedDomainProps) {
  return (
    <DomainItem
      domainName={domain}
      index={index}
      showCart
      chainDirection={chainDirection}
    />
  );
}
