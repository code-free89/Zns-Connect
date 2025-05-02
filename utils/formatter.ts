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

export function formatCredits(credits: number | string) {
  return Math.floor(Number(credits));
}

export const formatPrice = (value: number, length = 3) => {
  return value.toLocaleString("en", {
    minimumFractionDigits: length,
    maximumFractionDigits: length + 2,
  });
};

export const toDomainUrl = (domainText: string) => {
  let domain = domainText.toLowerCase();
  domain = domain.trim();
  domain = domain.replace(/\s+/g, "-");
  domain = domain.replace(/-{2,}/g, "-");
  return domain;
};

export const getSanitizedValue = (value: string, defaultReturn: number = 0) => {
  const sanitizedValue = value.replace(/\D/g, "");
  if (sanitizedValue !== "" && parseInt(sanitizedValue, 10) > 0) {
    return Number(sanitizedValue);
  } else {
    return defaultReturn;
  }
};
