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
 
 >createCountDown:
 
 > description : get params object,and return CountDown,will create CountDown instance and return it,set id to CountDown,push it in cache array.
 > params: 
 type : object
 return CountDown
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
 
 >clearCd:
 description: clear CountDown and stop setTimeout
 params：id
 
 usage:
 `
 clearCd(cd.id)
 `
 
 
 >clearAllCd:
 
 >description:clear all CountDown instance and stop all setTimeout in cache.
 no params
 
 usage:
 `
 clearAllCd()
 `
