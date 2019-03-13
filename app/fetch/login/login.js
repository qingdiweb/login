import { get } from '../get'
import { post } from '../post'

//登录
export function login(phone, password, type) {
    const result = post('/account/common/login', {
        phone: phone,
        password: password,
        type: type
    })
    return result
}
//注册-获取验证码
export function getCode(verifyPhone) {
    const result = post('/account/common/register/request', {
        verifyPhone: verifyPhone
    })
    return result
}
//注册
export function register(verifyPhone,verifyCode,password) {
    const result = post('/account/common/register/confirm', {
        verifyPhone: verifyPhone,
        verifyCode: verifyCode,
        password: password
    })
    return result
}
//忘记密码-获取验证码
export function forgotGetCode(verifyPhone,type) {
    const result = post('/account/common/password/request', {
        verifyPhone: verifyPhone,
        type:type
    })
    return result
}
//忘记密码-修改密码
export function changePassword(verifyPhone,verifyCode,password) {
    const result = post('/account/common/password/confirm', {
        verifyPhone: verifyPhone,
        verifyCode: verifyCode,
        password: password
    })
    return result
}
//第三方登录
export function thirdPartyLogin(appId,appKey,accountType,oauthId,oauthType,oauthToken) {
    const result = post('/account/common/sso/login', {
        appId: appId,
        appKey: appKey,
        accountType: accountType,
        oauthId: oauthId,
        oauthType: oauthType,
        oauthToken: oauthToken
    })
    return result
}
//第三方登录-绑定手机获取验证码
export function thirdPartyGetCode(ssoId,oauthId,verifyPhone) {
    const result = post('/account/common/sso/binding/request', {
        ssoId: ssoId,
        oauthId: oauthId,
        verifyPhone: verifyPhone
    })
    return result
}
//第三方登录-绑定手机
export function thirdPartyBindphone(ssoId,oauthId,verifyPhone,verifyCode,password) {
    const result = post('/account/common/sso/binding/confirm', {
        ssoId: ssoId,
        oauthId: oauthId,
        verifyPhone: verifyPhone,
        verifyCode:verifyCode,
        password:password
    })
    return result
}
//微信登录
export function weixinLogin(appId,appKey,accountType,code) {
    const result = post('/account/common/sso/weixin/login', {
        appId: appId,
        appKey: appKey,
        accountType: accountType,
        code:code
    })
    return result
}

