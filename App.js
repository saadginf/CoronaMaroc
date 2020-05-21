import React, {useState, useEffect} from 'react';
import { ActivityIndicator, FlatList,StyleSheet, Text, View, ImageBackground , ScrollView} from 'react-native';
import image from './assets/mar.png'
import Block from './components/Block/Block'
import TextView from './components/TextView/Textview'
import {Colors} from './Colors/color';
import {LineChart} from 'react-native-chart-kit'
import { Dimensions } from "react-native";

export default class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      threedata: [],
      isLoading: true,
      date:''
    };
  }
  getCurrentDate(separator='',i){

    let newDate = new Date()
    let date = newDate.getDate()-i;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    getDate(separator='',i){

      let newDate = new Date(i);
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear()
      
      
      return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
      }
  componentDidMount() {
  
   
 
    fetch('https://corona.lmao.ninja/v2/countries/morocco?yesterday=true&strict=true&query%20')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json ,
                        date: this.getDate('-',json.updated)
        });
      })
      .catch((error) => console.error(error))
    ;
      
      fetch('https://api.covid19api.com/total/country/morocco')
      .then((response) => response.json())
      .then((json) => {
        const statistic = json.slice(json.length/1.2, json.length).map((object) => object.Confirmed);
        this.setState({ threedata: statistic });
       
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render(){
    const { threedata, data, isLoading,date } = this.state;
    const screenWidth = Dimensions.get("window").width;
   
    
  return (
    <View style={{flex:1}}>
      <View>
     <ImageBackground
     source={image}
     style={{
       width:'100%',
       height:350
     }}
     imageStyle={{
       borderBottomRightRadius:65
     }}
     >
                  <View style={styles.container}>
                    <Text style={styles.title}>Maroc COVID19</Text>
                    <Text style={styles.stay}>Stay Home, </Text>
                    <Text style={styles.stay}>Stay Safe !</Text>
                

                  </View>
     </ImageBackground>
      </View>
     
     
        {isLoading ? <ActivityIndicator/> : (
          
          <ScrollView >
          <Block padding={10} style={{marginTop: 10}}>
          <Block>
              <TextView h6>Mise à Jour: </TextView>
              <TextView>{this.getDate('-',date)}</TextView>
            </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            shadow
            border
            style={{marginTop: 10}}
            direction="row">
            <ItemDot
              color1={Colors.carot_op}
              color2={Colors.carot}
              num={data.cases}
              title={'Confirmés'}
            />
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={data.deaths}
              title={'Morts'}
            />

            <ItemDot
              color1={Colors.green_op}
              color2={Colors.green}
              num={data.recovered}
              title={'Guéris'}
            />
          </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            
            shadow
            border
            style={{marginTop: 10}}
            direction="row"
            justifyContent="center"
            >
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={data.todayCases}
              title={'Nouveaux Cas'}
            />
          </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            
            shadow
            border
            style={{marginTop: 10}}
            direction="row"
            justifyContent="center"
            >
            <ItemDot
              color1={Colors.blue}
              color2={Colors.blue1}
              num={data.tests}
              title={'Tests'}
            />
          </Block>
          </Block>


          <Block>
          <Block
          middle
          centered
          margin={10}
         
          >
           <TextView color="gray" h6>
           Développement des cas depuis le :
           </TextView>

<Text>2020-05-01</Text>

      </Block>
 <LineChart

    data={{
      
      datasets: [
        {
          data: threedata
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    
    yAxisInterval={4000} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

          </Block>
          </ScrollView>
        )}
   
     


</View>

  );
}
}
const styles = StyleSheet.create({
  container: {
    paddingTop:40,
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
  },
  Cardcontainer:{
    flexDirection:'row',
    justifyContent: 'space-around'
  }
});
const ItemDot = ({color1, color2, num, title}) => {
  return (
    <Block block>
      <Block middle>
        <Block
          width={30}
          height={30}
          middle
          centered
          borderRadius={30}
          color={color1}>
          <Block
            width={20}
            height={20}
            borderWidth={4}
            borderRadius={20}
            borderColor={color2}
          />
        </Block>
        <TextView padding={15} color={color2} h3>
          {num}
        </TextView>
        <TextView color="gray" h6>
          {title}
        </TextView>
      </Block>
    </Block>
  );
};

