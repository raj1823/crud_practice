import React, {useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import Popup from './popup';
import ActivityWaiter from './activityWaiter';
import {performAction, toggleVisible} from '../Services/action';
import {FETCH_DATA_API, DELETE_RECORD_API} from '../Services/constant';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelected: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.performAction(FETCH_DATA_API, 'GET').then(
      resolve => {
        if (resolve == 200) {
          this.setState({isLoading: false});
        }
      },
      reject => {
        if (reject == 'ERROR') {
          
          Alert.alert("ERROR","Cannot Fetch Data at this moment. Please Try again later..!",
                     [ { text: 'OK', onPress: () => {this.setState({isLoading:false}) }  }])
          
          
          
        }

      },
    );
  }
  deleteRecord(id) {
    this.props.performAction(DELETE_RECORD_API, 'DELETE', null, id).then(
      resolve => {
        if (resolve == 200) {
          Alert.alert("SUCCESS","Record Deleted Successfully",
                     [ { text: 'OK', onPress: () => {this.setState({isLoading:false}) }  }])

                    
                     this.props.performAction(FETCH_DATA_API, 'GET').then(
                      resolve => {
                        if (resolve == 200) {
                          
                        }
                      },
                      reject => {
                        if (reject == 'ERROR') {
                          
                          Alert.alert("ERROR","Cannot Fetch Data at this moment. Please Try again later..!",
                                     [ { text: 'OK', onPress: () => {this.setState({isLoading:false}) }  }])
                          
                          
                          
                        }
                
                      },
                    );
        }
      },
      reject => {
        if(reject=="ERROR")
        {
        alert('Cannot Delete Record');
        this.setState({isLoading: false});
        }
      },
    );
   
  }

  render() {
    console.log('render called', this.state);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <Popup data={this.state.rowSelected} />
        {this.state.isLoading ? <ActivityWaiter /> : null}
        <View>
          <View
            style={{
              borderWidth: 1,
              backgroundColor: 'orange',
              borderColor: '#000',
              width: '40%',
              alignSelf: 'flex-end',
              marginRight: 8,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleVisibility(this.props.visible);
                this.setState({rowSelected: null});
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                }}>
                Add Record
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.props.employee_data}
            renderItem={({item}) => {
              //console.log(item)
              return (
                <View style={{flex: 1}}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      marginHorizontal: 7,
                      marginVertical: 5,
                      shadowOffset: {
                        height: 2,
                        width: -1,
                      },
                      shadowColor: 'grey',
                      shadowOpacity: 1,
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View style={{flex: 2}}>
                      <Text
                        style={{
                          fontSize: 18,
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                        }}>
                        {item.username + '   '}
                        {item.phone_number + '   '}
                        {item.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={{marginHorizontal: 8}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({rowSelected: item}, () =>
                              this.props.toggleVisibility(this.props.visible),
                            );
                          }}>
                          <Image
                            source={require('../assets/edit.png')}
                            style={{
                              height: 30,
                              width: 20,
                              resizeMode: 'contain',

                              alignSelf: 'center',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{marginHorizontal: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.deleteRecord(item._id);
                            this.setState({isLoading: true});
                          }}>
                          <Image
                            source={require('../assets/delete.png')}
                            style={{
                              height: 30,
                              width: 20,
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  employee_data: state.data_Reducer.employeeData,
  visible: state.data_Reducer.visible,
});

const mapDispatchToProps = {
  performAction: performAction,

  toggleVisibility: toggleVisible,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
