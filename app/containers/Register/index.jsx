import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import './style.less'

import { Form, Icon, Input, Button, Row, Col, Checkbox , Tabs , Radio , Select } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const Option = Select.Option;
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
    //验证码验证
    codeValidation(rule, value, callback){
      let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
    //设置密码验证
    passwordValidation(rule, value, callback){
       let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
    //确认密码验证
    surePasswordValidation(rule, value, callback){
        let rs=/^[a-zA-Z]{6,15}$/,
           re = /^\d{6,15}$/,//密码正则验证
           rg=/^[a-zA-Z0-9]{6,15}$/;
       if(!rs.test(value)&&!re.test(value)&&!rg.test(value)&&value!=''){
            callback('密码格式不对！')
       }
       callback()
    }
    //姓名验证
    nameValidation(rule, value, callback){
       callback()
      
    }
    //性别验证
    sexValidation(rule, value, callback){
       callback()
      
    }
    //科目验证
    subjectValidation(rule, value, callback){
       callback()
      
    }
    //阶段验证
    stageValidation(rule, value, callback){
       callback()
      
    }
    //学校验证
    schoolValidation(rule, value, callback){
       callback()
      
    }
    //性别选择
    sexChange(){

    }
    //科目选择
    subjectHandleChange(){

    }
  render() {
    console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    return (
        <div  className="register-bg">
          <Tabs className="register-tab" defaultActiveKey="1"  onChange={this.callback.bind(this)}>
            <TabPane tab={<span><span className="steps-number">1</span><span>账号密码</span></span>} key="1">
                <p className="exist-account"><span>已有账号？</span><a href="javascript" className="login-immediately">立即登录</a></p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
                  <FormItem {...formItemLayout} label="手机号码" >
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '手机号不能为空!'},{validator:this.userValidation.bind(this)}],
                    })(
                      <Input placeholder="请输入手机号" />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="短信验证码" >
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('code', {
                          rules: [{ required: true, message: '验证码不能为空!'},{validator:this.codeValidation.bind(this)}],
                        })(
                          <Input placeholder="请输入手机号" />
                        )}
                      </Col>
                      <Col span={12}>
                        <Button type="primary">获取验证码</Button>
                      </Col>
                    </Row>
                    
                  </FormItem>
                  <FormItem {...formItemLayout} label="设置密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空!' },{validator:this.passwordValidation.bind(this)}],
                      })(
                        <Input type="password" placeholder="请输入密码" />
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="确认密码">
                    {getFieldDecorator('surepassword', {
                      rules: [{ required: true, message: '密码不能为空!' },{validator:this.surePasswordValidation.bind(this)}],
                    })(
                      <Input type="password" placeholder="请输入密码" />
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                      下一步
                    </Button>
                  </FormItem>
                </Form>
            </TabPane>
            <TabPane tab={<span><span className="steps-number">2</span><span>基本信息</span></span>} key="2">
                <p className="exist-account"><span>已有账号？</span><a href="javascript" className="login-immediately">立即登录</a></p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
                  <FormItem {...formItemLayout} label="姓名" >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '手机号不能为空!'},{validator:this.nameValidation.bind(this)}],
                    })(
                      <Input placeholder="请输入手机号" />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="性别" >
                     {getFieldDecorator('sex', {
                          rules: [{ required: true, message: '性别不能为空!'},{validator:this.sexValidation.bind(this)}],
                        })(
                          <RadioGroup onChange={this.sexChange.bind(this)} value={this.state.sexValue}>
                              <Radio value={1}>男</Radio>
                              <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )}
                    
                  </FormItem>
                  <FormItem {...formItemLayout} label="任教科目" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {getFieldDecorator('subject', {
                        rules: [{ required: true, message: '科目不能为空!' },{validator:this.subjectValidation.bind(this)}],
                      })(
                        <Select defaultValue="jack"  onChange={this.subjectHandleChange.bind(this)}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                        </Select>
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="任教阶段" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {getFieldDecorator('stage', {
                      rules: [{ required: true, message: '阶段不能为空!' },{validator:this.stageValidation.bind(this)}],
                    })(
                      <Select defaultValue="jack"  onChange={this.subjectHandleChange.bind(this)}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="任教学校" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {getFieldDecorator('school', {
                      rules: [{ required: true, message: '学校不能为空!' },{validator:this.schoolValidation.bind(this)}],
                    })(
                      <Select defaultValue="jack"  onChange={this.subjectHandleChange.bind(this)}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                      提交
                    </Button>
                  </FormItem>
                </Form>
            </TabPane>
            <TabPane tab={<span><span className="steps-number">3</span><span>注册完成</span></span>} key="3">
              <h1 className="register-success"><span>注册成功</span><span>去登陆 5秒</span></h1>
            </TabPane>
          </Tabs>
          
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