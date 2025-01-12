import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

export default function camera() {

  const [photo, setPhoto] = useState(null) // State que vai armazenar URI da foto.


  function openAlbum() {

    //Opções das fotos. 
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    }

    launchImageLibrary(options, (response) => {

      if (response.didCancel) { // Caso cancele a seleção, caíra neste if.
        console.log("IMAGE PICKER CANCELADO")
        return;
      } else if (response.error) { // Caso ocorra algum erro, caíra neste if.
        console.log('GEROU ERRO ', response.errorMessage, response.errorCode)
        return;
      }

      console.log(response.assets)
      setPhoto(response.assets[0].uri)
    })
  }

  async function openCamera() {

    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    }

    const response = await launchCamera(options)

    setPhoto(response.assets[0].uri)
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.buttons}>
        <TouchableOpacity style={s.button} onPress={openAlbum}>
          <Text style={s.text}>Abrir album</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.button}  onPress={openCamera}>
          <Text style={s.text}>Abrir camera</Text>
        </TouchableOpacity>
      </View>

      {photo !== null && (
        <Image
          source={{ uri: photo }}
          style={s.image}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 25,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white'
  },
  image: {
    width: '90%',
    height: 300,
    objectFit: 'cover'

  }
})