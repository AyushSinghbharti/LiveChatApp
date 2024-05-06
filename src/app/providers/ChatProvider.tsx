import { PropsWithChildren } from "react";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "./AuthProvider";
import { supabase } from "../../lib/supabase";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) return;
    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage.from("avatars").getPublicUrl(profile.avatar)
            .data.publicUrl,
        },
        client.devToken(profile.id)
      );
      setIsReady(true);
    };

    connect();
    return () => {
      if (isReady) client.disconnectUser();
      setIsReady(false);
    };
  }, []);

  if (!isReady) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center" }}
        size={50}
      />
    );
  }

  return (
    <>
      <OverlayProvider>
        <Chat client={client}>{children}</Chat>
      </OverlayProvider>
    </>
  );
}

// import { PropsWithChildren, useEffect, useState } from "react";
// import { ActivityIndicator } from "react-native";
// import { StreamChat } from "stream-chat";
// import { Chat, OverlayProvider } from "stream-chat-expo";
// import { useAuth } from "./AuthProvider";
// // import { supabase } from '../lib/supabase';
// // import { tokenProvider } from '../utils/tokenProvider';

// const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

// export default function ChatProvider({ children }: PropsWithChildren) {
//   const [isReady, setIsReady] = useState(false);
//   const { profile } = useAuth();

//   useEffect(() => {
//     if (!profile) {
//       return;
//     }
//     const connect = async () => {
//       await client.connectUser(
//         {
//           id: profile.id,
//           name: profile.full_name,
//           image: supabase.storage.from('bucket').getPublicUrl('filePath.jpg'),
//         },
//         client.devToken(profile.id)
//       );
//       setIsReady(true);
//     };

//     connect();

//     return () => {
//       if (isReady) {
//         client.disconnectUser();
//       }
//       setIsReady(false);
//     };
//   }, [profile?.id]);

//   if (!isReady) {
//     return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} size={50} />;
//   }

//   return (
//     <OverlayProvider>
//       <Chat client={client}>{children}</Chat>
//     </OverlayProvider>
//   );
// }
