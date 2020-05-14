import {DATA_SUCCESS, TOGGLE,UPDATE_RECORD} from './constant';

export function toggleVisible(toggle) {
  return dispatch => {
    console.log('toggleV', toggle);

    dispatch({type: TOGGLE, visible: !toggle});
  };
}



export function performAction(API, method, data, id = '') {
  console.log("api",API+id)
  try {
    if (data == null) {
      return dispatch => {
        fetch(API+id, {
          method: method,
        })
          .then(res => {
            console.log('status :: ', res.status);
            if (res.status >= 200 && res.status < 300) {
              return res.json();
            } else {
              alert('ACTION ABORTED');
            }
          })
          .then(info => {
            console.log('Info', info);

            if (id == '') {
              if (info.data.length > 0) {
                console.log('INSIDE --------');
                dispatch({type: DATA_SUCCESS, data: info.data});
              }
            } else alert('Record Deleted Successfully');
          });
      };
    } else {
      return new Promise(function(resolve, reject) {

          console.log("updating name",data)
        fetch(API+id, {
          method: method,
          body: JSON.stringify({
            username: data.e_username,
            phone_number: data.e_phone_number,
            email: data.email,
            name: data.name
          }),
        }).then(res => {
          console.log('EDIT/UPDATE:', res.status);
          if (res.status >= 200 && res.status < 300) {
            resolve(200);
          } else {
            reject('ERROR');
          }
        });
      });
    }
  } catch (error) {
    alert('BACKEND ERROR ');
  }
}
