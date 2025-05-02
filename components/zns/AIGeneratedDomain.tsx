import DomainItem from "@/components/zns/DomainItem";

type AIGeneratedDomainProps = {
  domain: string;
  index: number;
};

export default function AIGeneratedDomain({
  domain,
  index,
}: AIGeneratedDomainProps) {
  return <DomainItem domainName={domain} index={index} showCart />;
}
