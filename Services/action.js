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



