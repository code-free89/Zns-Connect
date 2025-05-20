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

/**
 * Shorten a wallet address by displaying only the first and last parts of it.
 *
 * @param address - The full wallet address to be shortened.
 * @param charsToShow - Number of characters to show at the start and end of the address.
 * @returns The shortened wallet address.
 */
export const shortenWalletAddress = (
  address: string,
  charsToShow: number = 4
): string => {
  // Check if the address is valid and long enough
  if (address.length <= 2 * charsToShow) {
    return address; // Return the address as is if it's too short to shorten
  }

  const start = address.slice(0, charsToShow + 2);
  const end = address.slice(-charsToShow);
  return `${start}...${end}`;
};
