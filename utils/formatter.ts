export function formatWalletAddress(address: string) {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

export function formatBalance(value: number, length = 3) {
  return value.toLocaleString("en", {
    minimumFractionDigits: length,
    maximumFractionDigits: length + 2,
  });
}
