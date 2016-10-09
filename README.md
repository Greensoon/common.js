# common.js
my js tools
常用工具类积累

***
### This is a common util in normal js or in React component.Contains :
 
 ```
 1.countDown
 2.dateFormat
 3.scrollTo
 4.get data from query
 5.util for array
 6.valid for form
 7.handle data for obj
 8.self colorful log util
 9.uuid
 ```

***
###1.CountDown:

####functions && useage:
 
####createCountDown:

```
 description : get params object,and return CountDown,will create CountDown instance and return it,set id to CountDown,push it in cache array.
 params: object
 return: CountDown
 ```
 ```
 {
  per : func, //每秒钟执行的函数
  callback : func, //计时结束后的callback
  delay : 0, //计时时间
 }
 ```
 
 usage:
 `
 const cd = createCountDown({
  per : function(){},
  callback : function(){},
  delay : 60,
 })
 `
 
####clearCd:
 ```
 description: clear CountDown and stop setTimeout
 params：id
 ```
 
 usage:
 `
 clearCd(cd.id)
 `
 
 
####clearAllCd:
 ```
 description:clear all CountDown instance and stop all setTimeout in cache.
 no params
 ```
 
 usage:
 `
 clearAllCd()
 `

###2.DateFormat

####long2DateStr:
```
description:convert long to DateStr
params:long,format:string format:default:yyyy-MM-dd,others:yyyy-MM-dd hh:mm:ss,yyyy/MM/dd ,yyyy/MM/dd hh:mm:ss
return : string 
```
usage:
```
const now = long2DateStr(new Date().getTime(),'yyyy/MM/dd hh:mm:ss')
now = 2016/10/08 23:50:49
```

####getNowStr:
```
description:get now with format yyyy-MM-dd
no params
return :string
```
usage:
```
const now = getNowStr()
```

####dateStrFormat:
```
description:format yyyyMMdd to yyyy-MM-dd
params:string
return :string
```
usage:
```
const now = dateStrFormat('19980212')
now = '1998-02-12'
```

###3.Valid:

####isMobile:
```
description:valid chinese mobile number
params: string
return: bool
```
usage:
```
const flag = ValidUtil.isMobile('12345678634')
flag =false
```

####isEmail:
```
description:valid email
params: string
return: bool
```
usage:
```
const flag = ValidUtil.isEmail('xiaoyaozhen3930@163.com')
flag =true
```

####isIdcard:
```
description:valid idCard
params: string
return: bool
```
usage:
```
const flag = ValidUtil.isEmail('412722********3**6')
flag =true
```
```
isInt4 
isInt6
isInt
isNum
isString
isNickname
isRealname
isIdcard
isPassport
isDate: yyyy-MM-dd

all like isMobile usage
```

###getParamsFromObj:

```
description:copy params from obj by fields
params: fields:array,obj:object
return: object
```
usage:
```
const ret = getParamsFromObj(['name','id'],{name:'zs',id:1,age:20})
console.log(ret) //ret={name:'zs',id:1}
```

####getPFOHasEscape:

```
description:copy params from obj by fields,with escape fields
params: fields:array,obj:object,escapeFields:array
return: object
```
usage:
```
const ret = getParamsFromObj(['name','id'],{name:'zs',id:1,age:20},['id'])
console.log(ret) //ret={name:'zs'}
```


###log:

```
description:log func with color,string will render 2em and green color,object will write in console terminal start '%c>>print ~_~ start<<' and end orange '%c>>print ~_~ end<<' normal font size.
params: ...
no returns
```
usage:
```
log('askdh',['asd'],{name:'asd'},1,...)
```


###getQueryParams:
```
description:get params from url query,and without '?'
params:query string
return :object
```
usage:
```
url = http://localhost/user?id=1
obj = getQueryParams(url.slice(1))
obj = {id:1}
```

###generateUUID:
```
description:get random uuid 32bits
no params 
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
```

usage:
```
var uuid = generateUUID()
```

###scrollTo:
```
description: scrollTo your scrollTop 50/ms ,total 10ms
params: st:num ,default 0
no return
```

usage:
```
scrollTo()
```

###About Array:

####arrayContains:
```
description:check array contains element or not
params: arr:array,element:string or number
return:bool
```
usage:
```
var flag = arrayContains([1,2,3],2)
flag = true
```

####arrayIndexOf:
```
description:get element position in arr,if not contained in arr ,return -1
params:arr:array,element:string or number
return: number
```
usage:
```
var idx = arrayIndexOf([1,2,3],2)
idx = 1

idx = arrayIndexOf([1,2,3],0)
idx = -1
```

#####will continue if have good funcs
