import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, hashHistory } from 'react-router'
import { login , thirdPartyLogin ,weixinLogin} from '../../fetch/login/login'
//import loginimg from 'src/img/collect-sel.png'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import './style.less'

import { Form, Icon, Input, Button, Checkbox , Tabs , Row, Col,message} from 'antd';
const weixinimg = require("../../static/img/weixin.png");
const qqimg = require("../../static/img/qq.png");
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 21,
          offset: 3,
        },
      },
    };
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentWillMount(){
      console.log('code',this.GetQueryString.bind(this,'code')())
      let code=this.GetQueryString.bind(this,'code')(),
          appId='1106266783',
          appKey='2421951481',
          accountType='common';
        if(code!=null){
          const resultLogin=weixinLogin(appId,appKey,accountType,code);
                resultLogin.then(res=>{
                    return res.json()
                }).then(json=>{
                    const data=json
                    console.log('登录'+data)
                    if (data.result) {
                      let thirdData=data.data;
                          if(!!thirdData.sso){
                            console.log("应该去绑定")
                            this.props.noticeShow.bind(this,3,thirdData.sso.id,thirdData.sso.oauthId)()
                          }else {
                            window.location.href="home.html"
                          }
                    }else{
                      message.warning(data.error)
                    }
                }).catch(ex=>{
                    // 发生错误
                    if (__DEV__) {
                        console.error('暂无数据, ', ex.message)
                    }
                })
        }
    }
    componentDidMount(){
      QC.Login({//按默认样式插入QQ登录按钮
          btnId:"qqLoginBtn"  //插入按钮的节点id
        });
      setTimeout(()=>{
        let qqLoginBtn=document.getElementById('qqLoginBtn'),
          img=qqLoginBtn.getElementsByTagName("img")[0];
          img.src = qqimg;
       })
   /*   var obj = new WxLogin({
            self_redirect:true,
            id:"codeBox", 
            appid: "wx41ddc056b87016ba", 
            scope: "snsapi_login", 
            redirect_uri: "https://www.huazilive.com/zuoye",
            state: new Date().getTime(),
            style: "",
            href: "https://www.huazilive.com/zuoye/style.css"
          });*/
    }
    /*获取地址栏参数方法*/
    GetQueryString(name){
        console.log('地址',window.location)
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.href.split('?')[1].match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    loginHandleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values,callback) => {
            console.log("提交form表单")
              if (!err) {
                console.log('Received values of form: ', values);
                let loginInfo=values,
                    phone=loginInfo.LoginUserName,
                    password=loginInfo.LoginPassword,
                    type='teacher';
                     const resultLogin=login(phone, password, type);
                        resultLogin.then(res=>{
                            return res.json()
                        }).then(json=>{
                            const data=json
                            console.log('登录'+data)
                            if (data.result) {
                               //将token存储为全局变量
                               localStorage.setItem("loginToken",data.data.loginToken);
                               if(data.data.loginToken&&localStorage.getItem("loginToken")){
                                 window.location.href='home.html';
                                 
                               }
                            }else{
                              message.warning(data.error)
                            }
                        }).catch(ex=>{
                            // 发生错误
                            if (__DEV__) {
                                console.error('暂无数据, ', ex.message)
                            }
                        })
              }
          })
        
    }
    callback(key) {
    /*  if(key==2){
        var obj = new WxLogin({
            self_redirect:true,
            id:"codeBox", 
            appid: "wx41ddc056b87016ba", 
            scope: "snsapi_login", 
            redirect_uri: "https://www.huazilive.com/zuoye",
            state: new Date().getTime(),
            style: "",
            href: "https://www.huazilive.com/zuoye/style.css"
          });
      }*/
    }
    //账号验证
    userValidation(rule, value, callback){
       console.log('账号'+value)
       let re = /^1\d{10}$/;//账号正则验证
       if(!re.test(value)&&value!=''&&typeof(value)!='undefined'){
            callback('账号格式不对！')
       }
       /* const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('newPassword')) {
            callback('两次输入不一致！')
        }*/
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
    }
    //密码验证
    passwordValidation(rule, value, callback){
       let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''&&typeof(value)!='undefined'){
            callback('密码格式不对！')
       }
       callback()
    }
    //点击注册
    registerHand(){
      this.props.noticeShow.bind(this,1)()
    }
    //忘记密码
    forgotHand(){
      this.props.noticeShow.bind(this,2)()
    }
    //微信登录
    weixinLogin(){
         /*var obj = new WxLogin({
            self_redirect:true,
            id:"codeBox", 
            appid: "wx41ddc056b87016ba", 
            scope: "snsapi_login", 
            redirect_uri: "https://www.huazilive.com/zuoye",
            state: new Date().getTime(),
            style: "",
            href: ""
          });*/
          window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx41ddc056b87016ba&redirect_uri=https://www.huazilive.com/zuoye&response_type=code&scope=snsapi_login#wechat_redirect';
    }
    //QQ登录
    qqLogin(){
      QC.Login.getMe((openId, accessToken)=>{
          //alert(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));
          console.log(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));
          let appId='1106266783',
              appKey='2421951481',
              accountType='common', 
              oauthId=openId,
              oauthType='qq',
              oauthToken=accessToken;
              const resultThirdPartyLogin=thirdPartyLogin(appId,appKey,accountType,oauthId,oauthType,oauthToken);
                  resultThirdPartyLogin.then(res=>{
                      return res.json()
                  }).then(json=>{
                      const data=json
                      if (data.result) {
                          let thirdData=data.data;
                              if(!!thirdData.sso){
                                console.log("应该去绑定")
                                this.props.noticeShow.bind(this,3,thirdData.sso.id,thirdData.sso.oauthId)()
                              }else {
                                window.location.href="home.html"
                              }
                      }
                  }).catch(ex=>{
                      // 发生错误
                      if (__DEV__) {
                          console.error('暂无数据, ', ex.message)
                      }
                  })
              QC.Login.signOut();//退出QQ登录调用事件
        });
     /* if(QC.Login.check()){//如果已登录

        //这里可以调用自己的保存接口
        //...
      }*/

    }
  render() {
    console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login-page">
          <Tabs className="login-tab" defaultActiveKey="1"  onChange={this.callback.bind(this)}>
            <TabPane tab="教师端登录" key="1">
              <Form onSubmit={this.loginHandleSubmit.bind(this)} hideRequiredMark={true} className="login-form">
                  <FormItem {...formItemLayout} label='账号'>
                    {getFieldDecorator('LoginUserName', {
                      rules: [{ required: true, message: '手机号不能为空!'},
                      {validator:this.userValidation.bind(this)}],
                      validateTrigger: 'onBlur'
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label='密码'>
                    {getFieldDecorator('LoginPassword', {
                      rules: [{ required: true, message: '密码不能为空!' },
                      {validator:this.passwordValidation.bind(this)}],
                      validateTrigger: 'onBlur'
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>记住密码</Checkbox>
                    )}
                    <a href="javascript:;" className="login-form-register" onClick={this.registerHand.bind(this)}>注册</a><span className="login-form-divider">|</span><a className="login-form-forgot" href="javascript:;"  onClick={this.forgotHand.bind(this)}>忘记密码</a>
                  </FormItem>
                </Form>
            </TabPane>
          {/*  <TabPane tab="扫码登录" key="2">
              <div id="codeBox" className='weixincode-box'>
                
              </div>
            </TabPane>*/}
          </Tabs>
          
          <div className="third-party-login">
              <p>第三方登录</p>
              <a href="javascript:;" id="weixinLoginBtn"className="weixin-login" onClick={this.weixinLogin.bind(this)}><img src={weixinimg} alt=""/></a>
              <a href="javascript:;" id="qqLoginBtn" className="qq-login" onClick={this.qqLogin.bind(this)}>
                 {/* <img src={qqimg} alt=''/>*/}
              </a>
          </div>
          </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);
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