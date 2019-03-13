import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { login } from '../../fetch/login/login'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import './style.less'

import { Form, Icon, Input, Button, Checkbox , Tabs , Row, Col,} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
          offset: 8,
        },
      },
    };
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values,callback) => {
        console.log("提交form表单")
          if (!err) {
            console.log('Received values of form: ', values);
            let loginInfo=values,
                phone=loginInfo.userName,
                password=loginInfo.password,
                type='teacher';
                 const resultLogin=login(phone, password, type);
                    resultLogin.then(res=>{
                        res.json()
                    }).then(json=>{
                        const data=json
                        if (data.result) {
                            
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
      console.log(key);
    }
    //账号验证
    userValidation(rule, value, callback){
       console.log('账号'+value)
       let re = /^1\d{10}$/;//账号正则验证
       if(!re.test(value)&&value!=''){
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
       let rs=/^[a-zA-Z]{8,22}$/,
           re = /^\d{8,22}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{8,22}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
  render() {
    console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    return (
        <div  className="login-bg">
          <Tabs className="login-tab" defaultActiveKey="1"  onChange={this.callback.bind(this)}>
            <TabPane tab="教师登录" key="1"></TabPane>
            {/*<TabPane tab="学生登录" key="2"></TabPane>*/}
          </Tabs>
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem {...formItemLayout} label='账号'>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '手机号不能为空!'},{validator:this.userValidation.bind(this)}],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='密码'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空!' },{validator:this.passwordValidation.bind(this)}],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a href="../../../../huazihomework/work.html" className="login-form-register">注册</a><span className="login-form-divider">|</span><a className="login-form-forgot" href="">忘记密码</a>
              
              <div className="third-party-login">
                  <p>第三方登录</p>
                  <a href="" className="weixin-login"><img src="../../static/img/weixin.png" alt=""/></a>
                  <a href="" className="qq-login"><img src="../../static/img/weixin.png" alt=""/></a>
              </div>
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