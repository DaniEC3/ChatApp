import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { storage } from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert } from 'react-native';


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, userID }) => {
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      },
    );
  };

  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('Failed to fetch file as blob'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };


  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      if (!newUploadRef) throw new Error('New upload ref is not defined')
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const snapshot = await uploadBytes(newUploadRef, blob);
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([{
        _id: `${userID}-${new Date().getTime()}`,
        createdAt: new Date(),
        user: {
          _id: userID,
        },
        image: imageURL,
      }]);
    } catch (error) {
      console.log(error);
    }
  }

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    // console.log('WORKING;',permissions)

    if (permissions?.granted) {

      let result = await ImagePicker.launchCameraAsync().catch((e) => {
        console.log(e)
      })
      console.log('WORKING;', permissions)

      if (!result.canceled) {

        const uri = result.assets[0].uri;
        let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
        console.log("Uri", uri)

        if (mediaLibraryPermissions?.granted) {
          await MediaLibrary.saveToLibraryAsync(uri);
          await uploadAndSendImage(uri);
        } else {
          Alert.alert("Permissions haven't been granted");
        }

      }
    }
  }

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const imageURI = result.assets[0].uri;
        await uploadAndSendImage(imageURI);
      } else {
        Alert.alert("Permissions haven't been granted.");
      }
    }
  }
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend([{
          _id: `${userID}-${new Date().getTime()}`,
          createdAt: new Date(),
          user: {
            _id: userID
          },
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          }
        }]);

      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;