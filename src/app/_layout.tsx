//Define Global provider eg. authentication etc..
import { Slot, Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "./providers/AuthProvider";

export default function Rootlayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
