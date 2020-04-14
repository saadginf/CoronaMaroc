import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import image from './assets/mar.png'
export default function App() {
  return (
    <View>
      <View>
     <ImageBackground
     source={image}
     style={{
       width:'100%',
       height:400
     }}
     imageStyle={{
       borderBottomRightRadius:65
     }}
     >
                  <View style={styles.container}>
                    <Text style={styles.title}>Maroc COVID19</Text>
                    <Text style={styles.stay}>Stay Home</Text>
                  </View>
     </ImageBackground>
      </View>
      <View>
        <Text>Saad</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    paddingLeft:20,
   
  },
  title:{
    fontSize:38,
    fontWeight:'bold',
    color:'white',
    fontFamily:'sans-serif'
  },
  stay:{
    fontSize:20,
    fontWeight:'normal',
    color:'white',
    fontFamily:'sans-serif'
  }
});
