let MsgList = {
  MsgList:[]
}

export function chatlist (state=MsgList,action){
      switch (action.type) {
				case 'ChangeChat':
	          return Object.assign({}, state, {
	                MsgList: action.data,			//登路reduer
	            })

        default:
          return state;
      }
}
