import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebaseConfig.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';



const Chat = ({ route, navigation, isConnected }) => {
  const { name = "Anonymous" } = route.params;
  const [messages, setMessages] = useState([]);
  let unsubMessages;

  useEffect(() => {
    if (unsubMessages) unsubMessages();
    unsubMessagess = null;
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
      let unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          const data = doc.data();
          newMessages.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis ? new Date(data.createdAt.toMillis()) : new Date()
          });
        });
        cacheChatApp(newMessages)
        setMessages(newMessages);
      });
    } else loadCachedLists();


    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);
  const cacheChatApp = async (listsToCache) => {
    try {
      await AsyncStorage.setItem('messages_stored', JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
  const loadCachedLists = async () => {
    const cachedLists = await AsyncStorage.getItem("messages_stored") || [];
    setLists(JSON.parse(cachedLists));
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  const onSend = (newMessages = []) => {
    const message = {
      ...newMessages[0],
      createdAt: serverTimestamp(), // ✅ Add server timestamp
    };
    addDoc(collection(db, "messages"), message);
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: route.params.userID,
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;