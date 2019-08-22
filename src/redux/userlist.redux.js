let userList = {
	 online_user:  [],
}

export function userlist (state=userList,action){
      switch (action.type) {
		case 'getOnline':
	          return Object.assign({}, state, {
	                online_user: action.data,			
	            })
       		default:
          	return state;
      }
}
