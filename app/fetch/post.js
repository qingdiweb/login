import 'whatwg-fetch'
import 'es6-promise'

import {serviceBaseUrl,appId,appKey} from "../constants/store";

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    obj.appId = appId;
    obj.appKey = appKey;
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}

// 发送 post 请求
export function post(url, paramsObj) {
    var host= serviceBaseUrl;//测试地址
    //var host='https://api.huazilive.com/api/service';//正式地址
    var result = fetch(host+url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });

    return result;
}
