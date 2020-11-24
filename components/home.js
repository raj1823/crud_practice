import React, {useState} from 'react';
import {
  Text,
  
  SafeAreaView,
 
  StyleSheet,
  
} from 'react-native';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
  
  }
 
  render() {
   

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'black',justifyContent:"center"}}>
       <Text style={{fontSize:26,color:"white",alignSelf:"center"}}>First Page</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});



export default Home;
