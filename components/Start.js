import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import startImage from '../assets/BackgroundImage.png';

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0)');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={startImage} resizeMode="cover" style={styles.image}>
          <View style={[styles.overlay, styles.innerContainer, { backgroundColor: overlayColor }]}>
            <Text style={styles.text}>Hello!</Text>
            <View style={styles.nameBox}>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder='Type your username here'
              />
              <Text style={styles.textBgd}>Choose Background Color:</Text>
              <View style={styles.backgrColor}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color option"
                  accessibilityHint="Lets you change the background color of the app."
                  accessibilityRole="button"
                  style={[styles.button, styles.button1]}
                  onPress={() => setOverlayColor('rgba(9, 12, 8, 0.6)')}
                >
                  <Text> </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color option"
                  accessibilityHint="Lets you change the background color of the app."
                  accessibilityRole="button"
                  style={[styles.button, styles.button2]}
                  onPress={() => setOverlayColor('rgba(71, 64, 86, 0.6)')}
                >
                  <Text> </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color option"
                  accessibilityHint="Lets you change the background color of the app."
                  accessibilityRole="button"
                  style={[styles.button, styles.button3]}
                  onPress={() => setOverlayColor('rgba(138, 149, 165, 0.6)')}
                >
                  <Text> </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Background color option"
                  accessibilityHint="Lets you change the background color of the app."
                  accessibilityRole="button"
                  style={[styles.button, styles.button4]}
                  onPress={() => setOverlayColor('rgba(185, 198, 174, 0.4)')}
                >
                  <Text> </Text>
                </TouchableOpacity>
              </View>
              <Button
                accessible={true}
                accessibilityLabel="Go to chat option"
                accessibilityHint="Lets you go to the chat screen."
                accessibilityRole="button"
                title="Go to Chat"
                style={styles.buttonChat}
                onPress={() => navigation.navigate('Chat', { name: name })}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    flex: 1,
    justifyContent: 'center',

  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textBgd: {
    marginHorizontal: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameBox: {
    backgroundColor: 'white',
    height: 270,
    borderWidth: 2,         // thickness of the border
    borderColor: '#000000', // color of the border
    borderRadius: 10,       // optional: rounded corners
    padding: 10,            // optional: space inside the border
    margin: 10
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    margin: 15,
    textAlign: 'center',
  },
  backgrColor: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 5,

  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    height: 70,
    margin: 5,
    width: 70,
    marginBottom: 10,
  },
  buttonChat: {
    margin: 10,
  },
  button1: {
    backgroundColor: '#090C08',
  },
  button2: {
    backgroundColor: '#474056',
  },
  button3: {
    backgroundColor: '#8A95A5',
  },
  button4: {
    backgroundColor: '#B9C6AE',
  },
});

export default Start;