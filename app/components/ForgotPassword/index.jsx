import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import './style.less'

import { Form, Icon, Input, Button, Row, Col, Checkbox ,} from 'antd';
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
          sexValue:''//性别
        }
    }
    handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values,callback) => {
        console.log("提交form表单")
          if (!err) {
            console.log('Received values of form: ', values);
            let registerInfo=values,
                phone=registerInfo.userName,
                password=registerInfo.password,
                type='teacher';
                 const resultLogin=register(phone, password, type);
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
    //账号验证
    forgotUserValidation(rule, value, callback){
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
    //验证码验证
    forgotCodeValidation(rule, value, callback){
      let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
    //设置密码验证
    forgotPasswordValidation(rule, value, callback){
       let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
    //确认密码验证
    forgotSurePasswordValidation(rule, value, callback){
        let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
  
  render() {
    console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    return (
            <div>
              <p className="user-register">忘记密码</p>
              <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
                <FormItem {...formItemLayout} label="手机号码" >
                  {getFieldDecorator('forgotUserName', {
                    rules: [{ required: true, message: '手机号不能为空!'},{validator:this.forgotUserValidation.bind(this)}],
                  })(
                    <Input placeholder="请输入手机号" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="短信验证码" >
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('forgotCode', {
                        rules: [{ required: true, message: '验证码不能为空!'},{validator:this.forgotCodeValidation.bind(this)}],
                      })(
                        <Input placeholder="请输入验证码" />
                      )}
                    </Col>
                    <Col span={12}>
                      <Button type="primary">获取验证码</Button>
                    </Col>
                  </Row>
                  
                </FormItem>
                <FormItem {...formItemLayout} label="设置密码">
                  {getFieldDecorator('forgotPassword', {
                      rules: [{ required: true, message: '密码不能为空!' },{validator:this.forgotPasswordValidation.bind(this)}],
                    })(
                      <Input type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码">
                  {getFieldDecorator('forgotSurepassword', {
                    rules: [{ required: true, message: '密码不能为空!' },{validator:this.forgotSurePasswordValidation.bind(this)}],
                  })(
                    <Input type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" className="register-form-button">
                    确定
                  </Button>
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