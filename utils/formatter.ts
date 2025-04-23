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

export function isValidEthereumAddress(address: string): boolean {
  if (address.length !== 42) {
    return false;
  }

  if (address.slice(0, 2) !== "0x") {
    return false;
  }

  const hexPart = address.slice(2);
  const hexRegex = /^[0-9a-fA-F]{40}$/;

  return hexRegex.test(hexPart);
}
