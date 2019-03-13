import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { login , getCode , register , forgotGetCode , changePassword , thirdPartyGetCode , thirdPartyBindphone} from '../../fetch/login/login'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import './style.less'

import { Form, Icon, Input, Button, Row, Col, Checkbox , message} from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 7,
        },
      },
    };
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          phoneVal:'',//手机号
          phoneExit:false,
          passwordVal:'',//密码
          confirmPasswordVal:'',//确认密码
          codeVal:'',//验证码
          codeDisabled:true,//没输入手机号之前不能点
          sexValue:'',//性别
          resend:true,
          countdownTime:60,//发送验证码倒计时
          userRegisterObj:{},
          flag:true,
          isAllowPasswordShow:true//是否允许显示输入密码
        }
    }
    registerHandleSubmit(e){
      console.log("提交绑定")
      e.preventDefault();
      this.props.form.validateFields((err, values,callback) => {
          console.log("提交form表单")
          if (!err) {
            console.log('Received values of form: ', values);
            let registerInfo=values,
                verifyPhone=registerInfo.registerUserName,//手机号
                verifyCode=this.state.codeVal,//验证码
                password=registerInfo.registerPassword,//密码
                type='teacher',
                apiPath='';
                if(this.props.isRegister==1){
                    apiPath=register(verifyPhone,verifyCode,password)
                }else if(this.props.isRegister==2){
                    apiPath=changePassword(verifyPhone,verifyCode,password)
                }else if(this.props.isRegister==3){
                  apiPath=thirdPartyBindphone(this.props.ssoId,this.props.oauthId,verifyPhone,verifyCode,password)
                }
                 const resultLogin=apiPath;
                    resultLogin.then(res=>{
                       return res.json()
                    }).then(json=>{
                        const data=json
                        console.log('提交表单'+data)
                        if (data.result) {
                            window.location.href="home.html"
                            //将token存储为全局变量
                            localStorage.setItem("loginToken",data.data.loginToken);
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

    //账号验证
    registerUserValidation(rule, value, callback){
       console.log('账号',rule,value,callback)
       const form = this.props.form;
       let re = /^1\d{10}$/,//账号正则验证
          userRegisterObj={rule:rule,value:value,callback:callback};
       if(!re.test(value)&&value!=''&&typeof(value)!='undefined'){
            this.setState({
              codeDisabled:true
           })
            callback('账号格式不对！')
       }else{
          //form.validateFields(['registerUserName'], { force: true });
          if(!!this.state.phoneExit){
            console.log('手机被注册方法',this.state.phoneExit,typeof(this.state.phoneExit),callback)
            callback('手机号已被注册！')
            message.warning('手机号已被注册！')
          }
       
          this.setState({
            phoneVal:value,
            codeDisabled:false
         })
       }
       this.state.userRegisterObj=userRegisterObj;
        callback()
    }
    //验证码验证
    registerCodeValidation(rule, value, callback){
      let re = /^\d{0,6}$/;//密码正则验证
      console.log('验证码'+value)
       if(!re.test(value)&&value!=''&&typeof(value)!='undefined'){
            callback('验证码格式不对！')
       }else{
        this.setState({
          codeVal:value
        })
       }
       callback()
    }
    //获取验证码
    getCode(rule, value, callback){
      let verifyPhone=this.state.phoneVal,
          type='teacher',
          resultGetcode='';
          console.log("验证码区别",this.props.isRegister)
          if(this.props.isRegister==1){
              resultGetcode=getCode(verifyPhone)
          }else if(this.props.isRegister==2){
              resultGetcode=forgotGetCode(verifyPhone,type)
          }else if(this.props.isRegister==3){
            resultGetcode=thirdPartyGetCode(this.props.ssoId,this.props.oauthId,verifyPhone)
          }
            resultGetcode.then(res=>{
                return res.json()
            }).then(json=>{
                const data=json
                if (data.result) {
                     //发送成功之后显示倒计时
                      this.setState({
                        resend:false
                      })
                      let timer=setInterval(()=>{
                        let countdownTime=this.state.countdownTime;
                            if(countdownTime==0){
                                clearInterval(timer)
                                this.setState({
                                  resend:true,
                                  countdownTime:60
                                })
                            }else{
                              countdownTime-=1;
                              this.setState({
                                countdownTime:countdownTime
                              })
                            }
                      },1000)
                      //如果是绑定手机号会返回exist字段为1代表手机号码已存在，为0代表手机号码不存在，需要输入密码。
                      if(data.hasOwnProperty(exist)&&data.exist===0){
                         this.setState({
                          isAllowPasswordShow:true
                        })
                      }
                }else{
                  this.setState({
                    phoneExit:true,
                    flag:!this.state.flag
                  },()=>{
                      console.log('手机被注册')
                      let userRegisterObj=this.state.userRegisterObj;
                      this.registerUserValidation.bind(this,userRegisterObj.rule,userRegisterObj.value,userRegisterObj.callback)()
                      
                  })
                }
            }).catch(ex=>{
                // 发生错误
                if (__DEV__) {
                    console.error('暂无数据, ', ex.message)
                }
            })
    }
    //设置密码验证
    registerPasswordValidation(rule, value, callback){
       let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }else{
          this.setState({
            passwordVal:value
          })
       }
      callback();
    }
    //确认密码验证
    registerSurePasswordValidation(rule, value, callback){
        let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
           if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
                callback('密码格式不对！')
           }else{
              console.log(value)
              if (value && value !== this.state.passwordVal) {
                callback('密码不一致');
              }
           }
           callback();
    }
    //已有账号，立即登录
    loginImmediately(){
      this.props.noticeShow.bind(this,0)()
    }
    inputChange(e){

    }
  render() {
    const { getFieldDecorator } = this.props.form;
    let submitBtnText='';
        if(this.props.isRegister==1){
            submitBtnText='注册'
        }else if(this.props.isRegister==2){
            submitBtnText='确定'
        }else if(this.props.isRegister==3){
            submitBtnText='绑定'
            //绑定手机号-暂时隐藏输入密码，在验证码确定手机是否被存在再判断是否显示
            this.setState({
              isAllowPasswordShow:false
            })
        }
    return (
            <div>
              <p className="user-register">{this.props.name}</p>
              <Form onSubmit={this.registerHandleSubmit.bind(this)} className="register-form">
                <FormItem {...formItemLayout} label="手机号码" >
                  {getFieldDecorator('registerUserName', {
                    rules: [{ required: true, message: '手机号不能为空!'},
                    {validator:this.registerUserValidation.bind(this)}],
                    validateTrigger: 'onBlur'
                  })(
                    <Input placeholder="请输入手机号" ref={(input)=>this.phoneInput=input} onChange={this.inputChange.bind(this)}/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="短信验证码" >
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('registerCode', {
                        rules: [{ required: true, message: '验证码不能为空!'},
                        {validator:this.registerCodeValidation.bind(this)}],
                        validateTrigger: 'onBlur'
                      })(
                        <Input placeholder="请输入验证码" />
                      )}
                    </Col>
                    {
                      this.state.resend ? <Col span={12}><Button type="primary" disabled={this.state.codeDisabled} onClick={this.getCode.bind(this)}>获取验证码</Button></Col> :  <Col span={12}><Button type="primary" disabled><span>{this.state.countdownTime}s</span>重新发送</Button></Col>
                    }
                  </Row>
                </FormItem>
                {
                  !!this.state.isAllowPasswordShow ? <FormItem {...formItemLayout} label="设置密码">
                      {getFieldDecorator('registerPassword', { 
                          rules: [{ required: true, message: '密码不能为空!' },
                          {validator:this.registerPasswordValidation.bind(this)}],
                          validateTrigger: 'onBlur'
                        })(
                          <Input type="password" placeholder="请输入密码" />
                        )}
                    </FormItem> : ''
                }
                {
                  !!this.state.isAllowPasswordShow ? <FormItem {...formItemLayout} label="确认密码">
                    {getFieldDecorator('registerSurePassword', {
                      rules: [{ required: true, message: '密码不能为空!' },
                      {validator:this.registerSurePasswordValidation.bind(this)}],
                      validateTrigger: 'onBlur'
                    })(
                      <Input type="password" placeholder="请输入密码"/>
                    )}
                  </FormItem> : ''
                }
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" className="register-form-button">
                    {submitBtnText}
                  </Button>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <p className="exist-account"><span>已有账号？</span><a href="javascript:;" className="login-immediately" onClick={this.loginImmediately.bind(this)}>立即登录</a></p>
                </FormItem>
              </Form>
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