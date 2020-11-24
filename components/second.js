import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

class second extends React.Component {
  constructor(props) {
    super(props);
    
  }
 
  render() {
  
    return (
      <SafeAreaView style={styles.container}>
            
            
            
            
            
           <Text style={{alignSelf:"center",fontSize:26}}>Second Page</Text>
            </SafeAreaView>
        
        
        
            
      
      
     
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor:"white",
    justifyContent:"center",
    flex:1
   
  },
  
});

export default second;