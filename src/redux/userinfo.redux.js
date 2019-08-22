let userinfo = {
	   id:'unknow',
   	   pwd:'',
	   islogin: false,
	   nowsok: ''
}

export function userlogin (state=userinfo,action){
      switch (action.type) {
		  case 'login':
	          return Object.assign({}, state, {
	                id: action.data.id,
                 	pwd: action.data.pwd,
			slogin: action.data.islogin
	            })
		  case 'ChangeSocket':
	 	  return Object.assign({}, state, {
			nowsok: action.data
		    })
     		  default:
         	  return state;
      }
}
