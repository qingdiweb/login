// export const testurl = 'https://test.huazilive.com/HuaziZuoye'
// export const wwwurl = 'https://wwww.huazilive.com/zuoye'


//测试地址和正式地址
export let baseUrl, serviceBaseUrl,lutiUrl,teachLutiUrl;

if (window.location.href.includes('https://test.huazilive.com/HuaziSchoolWeb') || window.location.href.includes('http://localhost')) {
    baseUrl = 'https://test.huazilive.com/api/school';
    serviceBaseUrl = 'https://test.huazilive.com/api/service';
    lutiUrl = 'https://test.huazilive.com/LutiAdmin';//录题访问地址
    teachLutiUrl='https://test.huazilive.com/TeacherLuti/console.html#!/login/';//教师录题访问地址
}
else {
    baseUrl = 'https://api.huazilive.com/api/tiku';
    serviceBaseUrl = 'https://api.huazilive.com/api/service';
    lutiUrl = 'https://www.huazilive.com/luti';//录题访问地址;
    teachLutiUrl='https://www.huazilive.com/luti/teacher/console.html#!/login//';//教师录题访问地址
}

export const appId = '20111116';
export const appKey = 'd30ab730a067eb5707cf0sdf0ee029c2';
export const accountType = 'teacher';
