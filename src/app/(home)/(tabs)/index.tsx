import { ChannelList } from "stream-chat-expo";
import { Link, router, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MainScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} style={{ marginRight: 15 }}>
              <FontAwesome5
                name="users"
                size={22}
                color="grey"
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
