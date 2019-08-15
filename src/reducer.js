//合并所有的reducer ，并且返回
import { combineReducers } from 'redux'
import { sendmsg } from './redux/sendmsg.redux'
import { userlist } from './redux/userlist.redux'
import { userlogin } from './redux/userinfo.redux'
import { chatlist } from './redux/chatlist.redux'


export default combineReducers({chatlist,userlogin,sendmsg,userlist})
