import React, {useState} from 'react';

import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

import {connect} from 'react-redux';
import {toggleVisible, performAction} from '../Services/action';

import {ADD_RECORD_API, UPDATE_RECORD_API} from '../Services/constant';

import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      emp_username:"",
      emp_phone_number: "",
      emp_email:"",
      emp_name:""

    }
   
  }

  selectCall(data, username, phone_number, email,name) {
    let record_data = {
      e_username: username,
      e_phone_number: phone_number,
      e_email: email,
      e_name: name
    };
    console.log('select called--------------');
    if (data === null) {
      console.log('add record called-----------------');

      performAction(ADD_RECORD_API, 'POST', record_data).then(
        resolve => {
          if (resolve == 200) {
            alert('Record Added Successfully');
          }
        },
        reject => {
          if (reject == 'ERROR') {
            alert('Cannot Add Record');
          }
        },
      );
    } else {
      console.log('update record called----------------');

      performAction(UPDATE_RECORD_API, 'PUT', record_data,this.props.data._id).then(
        resolve => {
          if (resolve == 200) {
            alert('Record Updated Succefully');
          }
        },
        reject => {
          if (reject == 'ERROR') {
            alert('Cannot Update Record');
          }
        },
      );
    }
  }
  componentDidUpdate() {
    //console.log('name:', this.state.emp_username);
  }
  render() {
    console.log('Row Data:', this.props.data);
    
    const { emp_email,emp_phone_number,emp_username,emp_name} = this.state;

    return (
      <View style={{alignItems: 'center'}}>
        <Dialog
          visible={this.props.visible}
          useNativeDriver={true}
          dialogTitle={<DialogTitle title="Add/Update Records" />}
          footer={
            <DialogFooter>
              <DialogButton
                text="SUBMIT"
                onPress={() => {
                  this.selectCall(this.props.data, emp_username, emp_phone_number, emp_email,emp_name);
                  
                  this.props.toggleVisibility(this.props.visible);
                  
                 
                }}
              />
              <DialogButton
                text="CANCEL"
                onPress={() => {
                 
                  this.props.toggleVisibility(this.props.visible)
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <View style={{alignItems: 'flex-end'}} />
            <View style={{marginHorizontal: 30}}>
            <View>
                <TextInput
                  placeholder={'Enter Employee Name'}
                  defaultValue={this.props.data==null? "":this.props.data.name+""}
                  style={{
                    paddingVertical: 10,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    marginVertical: 10,
                    width: 200,
                  }}
                  
                  onChangeText={text => {
                    this.setState({emp_name:text})
                  }}
                />
              </View>
              <View>
                <TextInput
                  placeholder={'Enter Employee username'}
                  defaultValue={this.props.data==null? "":this.props.data.username}
                  style={{
                    paddingVertical: 10,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    marginVertical: 10,
                    width: 200,
                  }}
                  onChangeText={text => {
                    this.setState({emp_username:text})
                  }}
                />
              </View>
              
              <View>
                <TextInput
                  placeholder={'Enter Phone Number'}
                  defaultValue={this.props.data==null? "":this.props.data.phone_number+""}
                  style={{
                    paddingVertical: 10,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    marginVertical: 10,
                    width: 200,
                  }}
                  onChangeText={text => {
                    this.setState({emp_phone_number:text})
                  }}
                />
              </View>
              <View>
                <TextInput
                  placeholder={'Enter Employee email'}
                  defaultValue={this.props.data==null? "":this.props.data.email}
                  style={{
                    paddingVertical: 10,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    marginVertical: 10,
                    width: 200,
                  }}
                  onChangeText={text => {
                    this.setState({emp_email:text})
                  }}
                />
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.data_Reducer.visible,
  
});

const mapDispatchToProps = {
  toggleVisibility: toggleVisible,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
