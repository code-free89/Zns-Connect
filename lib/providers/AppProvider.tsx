import React from "react";

import { useAppDispatch } from "@/store";
import useUserUpdater from "@/store/hooks/useUserUpdater";

export default function AppProvider() {
  const dispatch = useAppDispatch();

  useUserUpdater();

  return <React.Fragment></React.Fragment>;
}
