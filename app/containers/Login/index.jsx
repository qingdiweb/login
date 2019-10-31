import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import Login from '../../components/Login'
import Register from '../../components/Register'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import './style.less'

import { Form, Icon, Input, Button, Checkbox , Tabs , Row, Col,} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class HuaziLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            loginShow:true,
            registerShow:'',
            forgotPassword:false,
            flag:false,
            ssoId:'',
            oauthId:''
        }
    }
    //通知显示
    noticeShow(data,ssoId,oauthId){
      if(data==0){//登录界面
        this.setState({
          loginShow:true,registerShow:0,forgotPassword:false,flag:!this.state.flag
        })
      }else if(data==1){//注册页面
        this.setState({
          loginShow:false,registerShow:1,forgotPassword:false,flag:!this.state.flag
        })
      }else if(data==2){//忘记密码页面
        this.setState({
          loginShow:false,registerShow:2,forgotPassword:true,flag:!this.state.flag
        })
      }else if(data==3){//绑定手机页面
        this.setState({
          loginShow:false,registerShow:3,ssoId:ssoId,oauthId:oauthId,forgotPassword:true,flag:!this.state.flag
        })
      }
    }
    render() {
      console.log('登录render',this.state.registerShow)
      let registerShowText='';
          if(this.state.registerShow==1){
            registerShowText='用户注册'
          }else if(this.state.registerShow==2){
            registerShowText='忘记密码'
          }else if(this.state.registerShow==3){
            registerShowText='绑定手机号'
          }
          if(this.state.loginShow){
             return (
              <div>
               <div className='huaziHeader clear-fix'>
                    <span className='huaziHeader-logo'></span>
                    <span className='huaziHeader-text2'>汇课通</span>
                </div>
                <div  className="login-bg" style={{height:'572px'}}>
                  <span className="huazi-logo"></span>
                  <Login noticeShow={this.noticeShow.bind(this)}/>
                </div>
              </div>
            );
          }else{
            return (
                <div  className="login-bg" style={{height:'456px'}}>
                  <Register isRegister={this.state.registerShow} ssoId={this.state.ssoId} oauthId={this.state.oauthId} name={registerShowText} noticeShow={this.noticeShow.bind(this)}/>
                </div>
            );
          }
    }
}
const WrappedNormalLoginForm = Form.create()(HuaziLogin);
/*ReactDOM.render(<WrappedNormalLoginForm />, mountNode);*/

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm)
