import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, getDocs,addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../firebaseConfig.js';


const Chat = ({ route, navigation }) => {
  const { name = "Anonymous" } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis ? new Date(data.createdAt.toMillis()) : new Date()
        });
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  const onSend = (newMessages = []) => {
    const message = {
      ...newMessages[0],
      createdAt: serverTimestamp(), // ✅ Add server timestamp
    };
    addDoc(collection(db, "messages"), message);
  };
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