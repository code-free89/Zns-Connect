import * as AuthSession from "expo-auth-session";
import { useMemo } from "react";

type useSocialAuthProps = {
  provider: "discord" | "twitter" | "linkedin";
};

export default function useSocialAuth({ provider }: useSocialAuthProps) {
  const config = useMemo(() => {
    switch (provider) {
      case "discord":
        return {
          clientId: process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID!,
          clientSecret: process.env.EXPO_PUBLIC_DISCORD_CLIENT_SECRET!,
          redirectUri: AuthSession.makeRedirectUri({
            scheme: "com.zns.app",
            path: "oauth2redirect/discord",
          }),
          scopes: ["identify", "email"],
        };
      case "twitter":
        return {
          clientId: process.env.EXPO_PUBLIC_TWITTER_CLIENT_ID!,
          clientSecret: process.env.EXPO_PUBLIC_TWITTER_CLIENT_SECRET!,
          redirectUri: AuthSession.makeRedirectUri({
            scheme: "com.zns.app",
            path: "oauth2redirect/twitter",
          }),
          scopes: ["identify", "email"],
        };
      case "linkedin":
        return {
          clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID!,
          clientSecret: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_SECRET!,
          redirectUri: AuthSession.makeRedirectUri({
            scheme: "com.zns.app",
            path: "oauth2redirect/linkedin",
          }),
          scopes: ["identify", "email"],
        };
      default:
        return {
          clientId: process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID!,
          clientSecret: process.env.EXPO_PUBLIC_DISCORD_CLIENT_SECRET!,
          redirectUri: AuthSession.makeRedirectUri({
            scheme: "com.zns.app",
            path: "oauth2redirect/discord",
          }),
          scopes: ["identify", "email"],
        };
    }
  }, [provider]);

  const endpoint = useMemo(() => {
    switch (provider) {
      case "discord":
        return {
          authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
          tokenEndpoint: "https://discord.com/api/oauth2/token",
        };
      case "twitter":
        return {
          authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
          tokenEndpoint: "https://api.twitter.com/oauth/2/token",
        };
      case "linkedin":
        return {
          authorizationEndpoint:
            "https://www.linkedin.com/oauth/v2/authorization",
          tokenEndpoint: "https://api.linkedin.com/oauth/v2/accessToken",
        };
      default:
        return {
          authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
          tokenEndpoint: "https://discord.com/api/oauth2/token",
        };
    }
  }, [provider]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    endpoint
  );

  return { request, response, promptAsync };
}
