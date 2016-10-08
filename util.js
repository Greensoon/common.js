'use strict'
let cdCache = []
function countDown (per =()=>{},cb=()=>{},delay = 60,cd) {
  let t = setInterval(
    () => {
      if(delay==0){
        clearInterval(t)
        cb()
        //countDown over will clear instance in cache
        cd.removeCDInstance()
        return
      }
      delay--
      per(delay)
    },
    1000
  )
  return t
}
function CountDown(params){
  params = params || {}
  this.id = 0
  this.t = null
  this.delay = params.delay
  this.type = params.type || 'sample'
  this.per = params.per
  this.callback = params.callback
  this.setId()
  this.start()
}
/*this method may be better*/
CountDown.prototype.setId = function(){
  this.id = cdCache.length ? cdCache.slice(-1)[0].id+1 : 1
}
/*
 *params:{
 * per : function,
 * callback : function,
 * delay : number,
 *}
 */
export function createCountDown(params){
  let cd = new CountDown(params)
  cdCache.push(cd)
  return cd
}
CountDown.prototype.start = function() {
  this.t = this.type==='sample'? countDown(this.per,this.callback,this.delay,this) : (_=>{})()
}
CountDown.prototype.clearInterval = function() {
  this.t && (clearInterval(this.t)) && (this.t = null)
  this.removeCDInstance()
}
CountDown.prototype.removeCDInstance = function(){
  cdCache = cdCache.slice(0,(this.id-1)).concat(cdCache.slice(this.id))
}
/*
 * clear countDown by id
 */
export function clearCd (id){
  cdCache[id-1] && (cdCache[id-1].clearInterval())
}
/*
 * clear all countDown
 */
export function clearAllCd(){
  while(cdCache.length){
    cdCache.shift().clearInterval()
  }
}
/*
 * util from long to Data,
 * format :
 *   yyyy-MM-dd           default format
 *   yyyy-MM-dd hh:mm:ss
 *   yyyy/MM/dd hh:mm:ss
 *   yyyy/MM/dd
 */
export function long2DateStr(num,format='yyyy-MM-dd'){
  let today = new Date(num)
  let year  = today.getFullYear()
  let month = today.getMonth()+1
  month = month<10 ? ('0'+month) : month
  let day   = today.getDate()
  day = day<10 ? ('0'+day ): day
  let hour  = today.getHours()
  hour = hour<10 ? ('0'+hour) : hour
  let minute= today.getMinutes()
  minute = minute<10 ? ('0'+minute ): minute
  let second= today.getSeconds()
  second = second<10 ? ('0'+second) : second
  // switch(format){
  //   case 'yyyy-MM-dd hh:mm:ss':
  //     return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
  //   case 'yyyy/MM/dd hh:mm:ss':
  //     return year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second
  //   case 'yyyy/MM/dd':
  //     return year+'/'+month+'/'+day
  //   default:
  //     return year+'-'+month+'-'+day
  // }
  return format.replace(/y{4}(.?)M{2}(.?)d{2}((\s)(hh(.?)mm(.?)ss))?/,function($1,$2,$3,$4,$5,$6,$7,$8){
    return year+$2+month+$3+day+($4&&$5&&$6&&$7&&$8?(' '+hour+$7+minute+$8+second):'')
  })
}
/*get current date time str format yyyy-MM-dd*/
export const getNowStr = () => {
  return long2DateStr(new Date().getTime())
}
/*format yyyyMMdd to yyyy-MM-dd*/
export const dateStrFormat = (val) => {
  if(typeof val!== 'string'){
    val = String(val)
  }
  if(/\d{4}\-\d{2}\-\d{2}/.test(val)){
    return val
  }
  if(!/^\d+$/.test(val)){
    return
  }
  let ret = val.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')
  if(new Date(ret)){
    return ret
  }
}
export const getGenderByNo = cardNo => {
  const valid = cardNo.length==15?cardNo.slice(-1): (cardNo.length==18?cardNo.slice(-2,-1):0)
  return valid%2 == 0 ? 2 : 1
}
var validTypes = {
  '*': /.+/,
  mobile: /^1[34578][0-9]{9}$/,
  email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  int4: /^\d{4}$/,
  int6: /^\d{6}$/,
  int: /^\d+$/,
  num: /^(\d+[\s,]*)+\.?\d*$/,
  string: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
  nickname: /^.{1,32}$/,
  realname: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{2,15}$/,
  idcard: isTrueIdCard,
  passport: /^[a-zA-Z0-9]{5,17}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
}
export const ValidUtil = (function(vts){
  let ret = {}
  for(var i in vts){
    if(/[a-zA-Z]/.test(i)){
      (function(i){
        ret['is'+i[0].toUpperCase()+i.slice(1)] = function(){
          return typeof vts[i]==='function' ? vts[i](arguments[0]):vts[i].test(arguments[0])
        }
      })(i)
    }
  }
  return ret
})(validTypes)
function isTrueIdCard(idCard) {
  function isValidityBrithBy15IdCard(idCard15){
    var year =  idCard15.substring(6,8)
    var month = idCard15.substring(8,10)
    var day = idCard15.substring(10,12)
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day))
    
    if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
      return false
    }
    return true
  }
  function isTrueValidateCodeBy18IdCard(idCard18) {
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    var sum = 0
    var _idCard18 = idCard18.split('')
    if (_idCard18[17].toLowerCase() == 'x') {
      _idCard18[17] = 10
    }
    for (var i = 0 ; i < 17; i++) {
      sum += Wi[i] * _idCard18[i]
    }
    var valCodePosition = sum % 11 
    if (_idCard18[17] == ValideCode[valCodePosition]) {
      return true
    }
    return false
  }
  function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10)
    var month = idCard18.substring(10, 12)
    var day = idCard18.substring(12, 14)
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
    if (  temp_date.getFullYear() != parseFloat(year) || 
          temp_date.getMonth() != parseFloat(month) - 1 || 
          temp_date.getDate() != parseFloat(day)
        ) {
      return false
    }
    return true
  }
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard)
  }else if (idCard.length == 18){
    return isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(idCard)
  }
}
export const getParamsFromObj = (fields,obj) => {
  
  let ret = {}
  while(fields.length){
    let key = fields.shift()
    if(obj && obj[key]){
      ret[key] = obj[key]
    }
  }
  
  return ret
}
export const getPFOHasEscape = (fields,obj,escapeFields) => {
  while(escapeFields.length){
    let key = escapeFields.shift()
    for(var i =0;i<fields.length;i++){
      if(key==fields[i]){
        fields[i] = ''
      }
    }
  }
  return getParamsFromObj(fields.filter(e=>{return !!e}),obj)
}
export const log = (...params) => {
  
  if(params.length==1 && typeof params[0] !== 'object' && typeof params[0] !== 'function'){
    console.log('%c'+params, 'color:green;font-size:2em;')
  }
  else{
    console.log('%c>>print ~_~ start<<','color:#f43737;font-size:1em;')
    while(params.length){
      let ele = params.shift()
      if(typeof ele !== 'object' && typeof ele !== 'function'){
        log(ele)
      }else{
        console.log('>>>>>>>>>>>>>>:',ele)
      }
    }
    console.log('%c>>print ~_~ end<<','color:orange;font-size:1em;')
  }
  
}
export const getQueryParams = function(search){
  var res = {}
  search.split('&').forEach(function(el){
    var arr = el.split('=')
    if (arr[0]) {
      res[arr[0]] = arr[1] || ''
    }
  })
  return res
}
export function generateUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0
    d = Math.floor(d/16)
    return (c=='x' ? r : (r&0x3|0x8)).toString(16)
  })
  return uuid
}
//scroll to
export function  scrollTo(st=0){
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  let s = scrollTop-(typeof st!='number'?0:st)  //距离
  let t = 10  //时间
  let si = function(){
    let stt = setTimeout(
      function(){
        if(s<=0){
          clearTimeout(stt)
          return false
        }
        s -= 50
        document.body.scrollTop = s
        document.documentElement.scrollTop = s
        si()
      },
      t
    )
  }
  si()
}
export const arrayContains = (arr,el) => {
  return !arr.every(e=>el!=e)
}
export const arrayIndexOf = (arr,el) => {
  if(!arrayContains(arr,el)){
    return -1
  }
  for(var i=0;i<arr.length;i++){
    if(arr[i]==el){
      return i
    }
  }
}
