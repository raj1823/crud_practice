import {DATA_SUCCESS, TOGGLE,UPDATE_SELCETED_RECORD} from './constant';

export function toggleVisible(toggle) {
  return dispatch => {
    console.log('toggleV', toggle);

    dispatch({type: TOGGLE, visible: !toggle});
  };
}

// export function updateRecord(data){
//     return dispatch=>{
//       dispatch({type:UPDATE_SELCETED_RECORD, selected_Record: data})
//     }
// }

export function performAction(API,method,data,id = ""){
  return dispatch=>{
    if(method=="PUT" || method=="POST")
       {     console.log("API",API+id)
            console.log("dat",data)
            console.log(JSON.stringify({
              username: data.username,
              name: data.name,
              phone_number : data.phone_number,
              email : data.email

          }))
        return new Promise(function(resolve,reject){
        try{

        

          fetch(API+id, {
            method : method,
            headers: { Accept: 'application/json', 'content-type': 'application/json'},
            body :JSON.stringify({
                username: data.username,
                name: data.name,
                phone_number : data.phone_number,
                email : data.email

            })

       }
         ).then(res=>{
           console.log("res status",res.status)
          if(res.status>=200 && res.status<=300)
          
           resolve(200)
           else 
           reject("ERROR")
         })
        }catch(error){alert("API Error")}
      })



        
       }
       else if(method == "DELETE")
       {  
        return new Promise(function(resolve,reject){ 
          try{

       
            fetch(API+id,{
              method : method
            }).then(res=>{

              if(res.status>=200 && res.status<=300) resolve(200)
              else reject("ERROR")
            })
          }catch(error){alert("API Error")}
        })
       }
       else {

       return new Promise(function(resolve,reject){

        try {

        
          fetch(API,{
            method : method
          }).then(res=>{
            
           if(res.status>=200 && res.status<=300) 
            {
              resolve(200)
            return res.json().then(info=>{
              console.log("response",info)
              if(info.data.length>0)
  
   
                 dispatch({type: DATA_SUCCESS, data: info.data});
             
             else alert("EMPTY DATABASE")
   
          })
        }
          else {
            alert("DATA FETCH ERROR")
            reject("ERROR")
          }
        })

            
              
           
          
         }catch(error){reject("Error")}

       })

       
        
      
      }
    }
         

       

  
    
}


// export function performAction(API, method, data, id = '') {
//   console.log("api",API+id)
//   try {
//     if (data == null) {
//       return dispatch => {
//         fetch(API+id, {
//           method: method,
//         })
//           .then(res => {
//             console.log('status :: ', res.status);
//             if (res.status >= 200 && res.status < 300) {
//               return res.json();
//             } else {
//               alert('ACTION ABORTED');
//             }
//           })
//           .then(info => {
//             console.log('Info', info);

//             if (id == '') {
//               if (info.data.length > 0) {
//                 console.log('INSIDE --------');
//                 dispatch({type: DATA_SUCCESS, data: info.data});
//               }
//             } else alert('Record Deleted Successfully');
//           });
//       };
//     } else {
//       return new Promise(function(resolve, reject) {
//         console.log("adding api",API+id,"method",method)

//           console.log("updating/adding data",data)
//           let x={ username : data.e_username,
           
//             email : data.e_email,
//             name : data.e_name,
//             phone_number : data.e_phone_number}

//             console.log("x",x)
//         fetch(API+id, {
//           method: method,
//           body: JSON.stringify({
//             username : data.e_username,
           
//             email : data.e_email,
//             name : data.e_name,
//             phone_number : data.e_phone_number
           
//           })
//         }).then(res => {
//           console.log('EDIT/UPDATE:', res.status);
//           if (res.status >= 200 && res.status < 300) {
//             resolve(200);
//           } else {
//             reject('ERROR');
//           }
//         });
//       });
//     }
//   } catch (error) {
//     alert('BACKEND ERROR ');
//   }
// }
