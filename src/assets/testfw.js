const url = 'http://192.168.1.220/api_article/v1/first_page/content/';
const url2 = '/api_article/v1/first_page/content_type/?content_type=zr&page_num=1&page_size=10';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWJjMDBhMDM5ZGM2ZDY0ZmMxOTMyODJkIiwiZXhwIjoxNTQwNjIwMjkxfQ.bqYmvP5wajVN6jzrFnhGrGHFyTfh-FqXhYib5hkzL7s';
const userId = '5bc00a039dc6d64fc193282d';
const param = {
  content: "qqq这是在task queue里发布的",
  image_url_list: [],
  memo: null,
  status: "1",
  tag_list: [],
  title: "",
  type: "0"
};

var onmessage = function(ev) {
  console.log(ev.data);
  // ev.data.run();
  // addPost(param).then(function (value) { console.log(value) });
  fetch(url, {
    method: 'POST',
    body:JSON.stringify(param),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain',
      'X-UserId': userId || '',
      'Authorization': 'Bearer ' + token
    })
  }).then(function (value) { console.log(value) });
  console.log('workkk');
};

const t = {
  'Accept': 'application/json',
  'X-UserId': userId || '',
  'Authorization': 'Bearer ' + token
};

function addPost(param) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
  console.log('head.............');
  return fetch(url2, {
    method:'GET',
    credentials: 'include',
    headers: myHeaders
  })
}

/**
 interface RequestInit {
  body?: any;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  window?: any;
}
 */

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (var item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options);
  var initObj = {};
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr;
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: searchStr
    }
  }
  return fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
