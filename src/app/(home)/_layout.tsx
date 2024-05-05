import { Stack, Slot } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat as ExpoChat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("949yy4smtek7");

export default function HomeLayout() {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );

      //   const channel = client.channel("messaging", "the_park", {
      //     name: "The Park",
      //   });
      //   await channel.watch();
    };

    connect();
  });

  return (
    <OverlayProvider>
      <ExpoChat client={client}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
      </ExpoChat>
    </OverlayProvider>
  );
}
