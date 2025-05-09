import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NETWORKS } from "@/constants/web3/chains";
import { RegisterDomainType } from "@/lib/model/domain";
import { StoreUser } from "./user";
import { UserDomainType } from "@/store/slices/user-domains";

export type DomainInfoType = {
  id: string;
  registerData: RegisterDomainType | null;
  reNewPrice: string;
  owner: string;
};

export type StoreProfile = Omit<any, "createdAt"> & { createdAt: string };
type AccountVerified = keyof Pick<
  any,
  "discord" | "twitter" | "wrapcast" | "linkedin" | "telegram"
>;

export type CombinedProfile = StoreProfile & {
  following?: (Partial<any> & {
    to?: Partial<any>;
    from?: Partial<any>;
  })[];
  followers?: (Partial<any> & {
    to?: Partial<any>;
    from?: Partial<any>;
  })[];
};

export interface ProfileState {
  domain: string | null;
  tld: string;
  chainId: NETWORKS | null;
  profile: CombinedProfile | null;
  domainInfo?: DomainInfoType | null;
  ownerStore?: StoreUser;
  ownerDomains: UserDomainType[] | null;
  isInitiatedInfo: boolean;
  isInitiatedDomain: boolean;
  isInitiatedProfile: boolean;
  isInitiatedOwnerDomain: boolean;
  isInitiatedOwnerStore: boolean;
}

const initialState: ProfileState = {
  chainId: null,
  domain: "",
  tld: "",
  profile: null,
  domainInfo: undefined,
  isInitiatedDomain: false,
  isInitiatedInfo: false,
  isInitiatedProfile: false,
  isInitiatedOwnerDomain: false,
  isInitiatedOwnerStore: false,
  ownerDomains: [],
};

export const profileSlices = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDomainData: (
      state,
      action: PayloadAction<Pick<ProfileState, "chainId" | "domain" | "tld">>
    ) => {
      state.domain = action.payload.domain;
      state.chainId = action.payload.chainId;
      state.tld = action.payload.tld;
      state.isInitiatedDomain = true;
    },
    setOwnerStore: (state, action: PayloadAction<StoreUser>) => {
      state.ownerStore = action.payload;
      state.isInitiatedOwnerStore = true;
    },
    setProfile: (state, action: PayloadAction<CombinedProfile>) => {
      state.profile = action.payload;
      state.isInitiatedProfile = true;
    },
    setDomainInfo: (state, action: PayloadAction<DomainInfoType | null>) => {
      state.domainInfo = action.payload;
      state.isInitiatedInfo = true;
    },
    setDomainVerify: (state, action: PayloadAction<AccountVerified>) => {
      if (state.profile) {
        const updatedProfile = { ...state.profile };
        updatedProfile[`${action.payload}Verified`] = true;
        state.profile = updatedProfile;
      }
    },
    setInitiated: (
      state,
      action: PayloadAction<{
        key: "domain" | "info" | "profile" | "ownerDomains" | "ownerStore";
        value: boolean;
      }>
    ) => {
      switch (action.payload.key) {
        case "domain":
          state.isInitiatedDomain = action.payload.value;
          break;
        case "info":
          state.isInitiatedInfo = action.payload.value;
          break;
        case "profile":
          state.isInitiatedProfile = action.payload.value;
          break;
        case "ownerDomains":
          state.isInitiatedOwnerDomain = action.payload.value;
          break;
        case "ownerStore":
          state.isInitiatedOwnerStore = action.payload.value;
          break;
      }
    },
    updateExpirationDate: (state, action: PayloadAction<number>) => {
      if (state.domainInfo && state.domainInfo.registerData) {
        const years = action.payload;
        const millisecondsInAYear = 365 * 24 * 60 * 60;
        const newExpirationDate =
          Number(state.domainInfo.registerData.expirationDate) +
          years * millisecondsInAYear;
        state.domainInfo.registerData.expirationDate =
          newExpirationDate.toString();
      }
    },
    setOwnDomainData: (
      state,
      action: PayloadAction<UserDomainType[] | null>
    ) => {
      state.ownerDomains = action.payload;
      state.isInitiatedOwnerDomain = true;
    },

    updateProfileMainImage: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile = { ...state.profile, mainImgUrl: action.payload };
      }
    },
    initProfileStore: () => initialState,
  },
});

export const {
  setInitiated,
  setProfile,
  setDomainInfo,
  setOwnerStore,
  setDomainData,
  setDomainVerify,
  setOwnDomainData,
  initProfileStore,
  updateExpirationDate,
  updateProfileMainImage,
} = profileSlices.actions;
