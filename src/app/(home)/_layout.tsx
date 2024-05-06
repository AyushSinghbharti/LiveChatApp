import { Redirect, Stack } from "expo-router";
import ChatProvider from "../providers/ChatProvider";
import { useAuth } from "../providers/AuthProvider";

export default function HomeLayout() {
  const {user} = useAuth();
  console.log(user);
  if(!user){
      return <Redirect href={"/(auth)/login"} />
  }


  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
