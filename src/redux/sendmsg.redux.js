let sendMsg = {
	   msg: "!?",
		 sendfrom:null,
		 sendto:null
}

export function sendmsg (state=sendMsg,action){
      switch (action.type) {
				case 'sendMsg':
	          return Object.assign({}, state, {
	                msg: action.data,			//登路reduer
	            })
				case 'sendTo':
					return Object.assign({}, state, {
							sendto: action.data,			//登路reduer
					})
        default:
          return state;
      }
}
