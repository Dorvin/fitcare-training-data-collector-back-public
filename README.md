### SERVER API
path | function | method
---|:---:|---:
register/ | 정보등록 & 추천횟수 | POST
result/ | 결과등록 | POST

#### register api
 - request body ex
~~~json
{
    "name": "user",
    "sex": "male(or female)",
    "height": 177,
    "weight": 68,
    "body_fat": 20
}
~~~
 - response body ex
 ~~~json
{
    "uid" : 324,
    "max" : 10,
    "challenge": 15
}
~~~

#### result api
 - request body ex
~~~json
{
    "uid":324,
    "result": 15
}
~~~
 - response body ex
 ~~~json
{
	"err": true
}
~~~

