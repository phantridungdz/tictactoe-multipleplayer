**TICTACTOE GAME SYSTEM ANALYSIS AND DESIGN**

Version: 0.1

||
| :- |

#
1. # <a name="_gjdgxs"></a><a name="_3dy6vkm"></a>Microservice
   1. ## <a name="_1t3h5sf"></a>Address Microservice
   1. ## <a name="_2boecqesrpk9"></a>database Design

1. ### <a name="_2s8eyo1"></a>**Tables**
   1. #### *room*

|**Column Name**|**Type**|**Not Null**|**Default**|**Foreign Key**|**Comment**|
| :- | :- | :- | :- | :- | :- |
|\_id|ObjectId|True||Unique, generated||
|currentUser|array|False||||
|turn|string|False||||
|status|string|False||||
|winner|string|False||||
|board|array|false||||
|counter|number|false|0|||
|created\_at|timestamp|False|Now()|||
|updated\_at|timestamp|False||||
####
1. #### *users*


|**Column Name**|**Type**|**Not Null**|**Default**|**Foreign Key**|**Comment**|
| :- | :- | :- | :- | :- | :- |
|\_id|ObjectId|True||Unique, generated||
|avatar|string|false||||
|status|string|false||||
|username|string|true||||
|displayname|string|false||||
|password|string|true||||
|score|int|false|500|||
|created\_at|timestamp|False|Now()|||
|updated\_at|timestamp|False||||
####
1. # <a name="_17dp8vu"></a>API
   1. ## <a name="_3rdcrjn"></a>APIs
Local: <http://localhost:3000> 

1. ### <a name="_26in1rg"></a>**Get room list**

**Description :** Get all room list 

**Method: GET**

**End point:** /api/room

**Collection:** room

1. ### <a name="_lnxbz9"></a>**Get user list**

**Description :** Get all user list 

**Method: GET**

**End point:** /api/user

**Collection:** user

1. ### <a name="_35nkun2"></a>**Get room**
**Description :** Get single room list 

**Method: GET**

**End point:** /api/room/{id}

**Collection:** room

1. ### <a name="_1ksv4uv"></a>**Get user**

**Description :** Get single user list

**Method: GET**

**End point:** /api/jobs/{id}

**Collection:** room
1. ### <a name="_v01dvlb1opjy"></a>**POST Login**

**Description :** Login

**Method: POST**

**End point:** /api/login/{username}/{password(md5)}

1. ### <a name="_44sinio"></a> **POST join room**

**Description :** join a room

**Method: POST**

**End point:** /api/join\_room/{user}

**Table:** room

1. ### <a name="_2jxsxqh"></a>**POST turn**
**Description :** POST step in turn of user

**Method: POST**

**End point:** /api/turn/{user}/{board[]}

**Table:** media

1. ### <a name="_tq5fqepxd8xf"></a>**POST winner**
**Description :** POST winner win the game

**Method: POST**

**End point:** /api/winner/{user}/

**Table:** media



1. # Requirements
- Server always get coordinates (ex: x=1, y=1)
- Board can resize if user check in the corner of board:
  EX:board = [

` `['-', '-', '-', '-', '-']

` `['-', '-', '-', '-', '-']

` `['-', '-', '-', '-', '-']

` `['-', '-', '-', '-', 'X']

` `['-', '-', '-', '-', '-']

]
1. # <a name="_wl98gr3blbac"></a>Server Data Handle
- The size of the table does not depend, the server receives the value of x or y to calculate and give the result who is the winner.



- The red board just represent board show at client, client first start game will give the 5x5 default board

- Use coordinates to sold game play.
- Example: X turn [1,2], server will save:

data = {

`	`x:[[1,2]]

}

- Check turn count is >= 9, if not will give user can go next step, or not server will check Winner
##
##
##
## <a name="_how1a3y2zw5g"></a><a name="_2wun0uwbep1q"></a><a name="_anfcpsksqv1b"></a><a name="_wev68akeq4al"></a>4.1 Case: check winner by **row**
### <a name="_iqflbyliwm53"></a>**Case: UserO go [1,1]** 

- Start check at [1- 4, 1] => [-3,1] to [1+4, 1] => [5,1]


### <a name="_7oqcq02syh3x"></a>**Case: userO go [1,1] and win**
###
- <a name="_q39l3hf8d0oz"></a>Start check at [-3,1]:
+ Step 1: [-3,1] null => (check = 0 )
+ Step 2: [-2,1] null => (check = 0 )
+ Step 3: [-1,1] equal O => check + 1 (check = 1 )
+ Step 4: [0,1] equal O => check + 1 (check = 2 )
+ Step 5: [1,1] equal O => check + 1 (check = 3 )
+ Step 5: [2,1] equal O => check + 1 (check = 4 )
+ Step 5: [3,1] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
### <a name="_4d8lekef06ye"></a>**Case: userO go [1,1] have “X” between and win**
- Start check at [-3,1]:
+ Step 1: [-3,1] null => (check = 0 )
+ Step 2: [-2,1] equal O => check + 1 (check = 1 )
+ Step 3: [-1,1] equal O => check + 1 (check = 2 )
+ Step 4: [0,1] equal X => check = 0 (check = 0 )
+ Step 5: [1,1] equal O => check + 1 (check = 1 )
+ Step 6: [2,1] equal O => check + 1 (check = 2 )
+ Step 7: [3,1] equal O => check + 1 (check = 3 )
+ Step 8: [4,1] equal O => check + 1 (check = 4 )
+ Step 9: [5,1] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win


### <a name="_9xm4q46xyp6x"></a>**Case: userO go [1,1] have 6 points, between not have character**

- Start check at [-3,1]:
+ Step 1: [-3,1] null => (check = 0 )
+ Step 2: [-2,1] equal O => check + 1 (check = 1 )
+ Step 3: [-1,1] null => check = 0 
+ Step 4: [0,1] equal O => check + 1 (check = 1 )
+ Step 5: [1,1] equal O => check + 1 (check = 2 )
+ Step 6: [2,1] equal O => check + 1 (check = 3 )
+ Step 7: [3,1] equal O => check + 1 (check = 4 )
+ Step 8: [4,1] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
## <a name="_jmjdc5c3y21s"></a>4.2 Case: check winner by **col**
### <a name="_3r18qvvg0z3n"></a>**Case: User 1(“O”) go [1,1]**


- Start check at [1, 1-4] => [1,-3] to [1, 1+4] => [1, 5]


### <a name="_tcngxvehllld"></a>**Case: userO go [1,1] and win**
###
- <a name="_63f01u9wdcj0"></a>Start check at [1,-3]:
+ Step 1: [1,-3] null => (check = 0 )
+ Step 2: [1,-2] null => (check = 0 )
+ Step 3: [1,-1] equal O => check + 1 (check = 1 )
+ Step 4: [1,0] equal O => check + 1 (check = 2 )
+ Step 5: [1,1] equal O => check + 1 (check = 3 )
+ Step 5: [1,2] equal O => check + 1 (check = 4 )
+ Step 5: [1,3] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
### <a name="_ad9ed1f1g20h"></a>**Case: userO go [1,1] have “X” between and win**

- Start check at [1,-3]:
+ Step 1: [1,-3] null => check + 1 (check = 0 )
+ Step 2: [1,-2] equal O => check + 1 (check = 1 )
+ Step 3: [1,-1] equal O => check + 1 (check = 2 )
+ Step 4: [1,0] equal X => check = 0 (check = 0 )
+ Step 5: [1,1] equal O => check + 1 (check = 1 )
+ Step 6: [1,2] equal O => check + 1 (check = 2 )
+ Step 7: [1,3] equal O => check + 1 (check = 3 )
+ Step 8: [1,4] equal O => check + 1 (check = 4 )
+ Step 9: [1,5] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
### <a name="_z8c92r2q1sat"></a>**Case: userO go [1,1] have 6 points, between not have character**

- Start check at [1,-3]:
+ Step 1: [1,-3] null => (check = 0 )
+ Step 2: [1,-2] equal O => check + 1 (check = 1 )
+ Step 3: [1,-1] null => check = 0 
+ Step 4: [0,1] equal O => check + 1 (check = 1 )
+ Step 5: [1,1] equal O => check + 1 (check = 2 )
+ Step 6: [1,2] equal O => check + 1 (check = 3 )
+ Step 7: [1,3] equal O => check + 1 (check = 4 )
+ Step 8: [1,4] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win


## <a name="_j7byoadne5pa"></a>4.3 Case: Check diagonal
### <a name="_tt49c39202r8"></a>**Case: User 1(“O”) go [3,3]**
- Start check at [3-4, 3+4] => [-1,7] to [3+4, 3-4] => [7, -1]
### <a name="_cvlm1ud8fed5"></a>**Case: User 1(“O”) go [3,3] and win**

- Start check at [-1,7]:
+ Step 1: [-1,7] null => (check = 0 )
+ Step 2: [0,6] equal O  =>  check + 1 (check = 1 )
+ Step 3: [1,5] equal O => check + 1 (check = 2 )
+ Step 4: [2,4 ] equal O => check + 1 (check = 3 )
+ Step 5: [3,3] equal O => check + 1 (check = 4 )
+ Step 6: [4,2] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
### <a name="_s83k8a6665it"></a>**Case: User 1(“O”) go [3,3] have “X” between and win**

- Start check at [-1,7]:
+ Step 1: [-1,7] null => (check = 0 )
+ Step 2: [0,6] equal O  =>  check + 1 (check = 1 )
+ Step 3: [1,5] equal X => (check = 0 )
+ Step 4: [2,4 ] equal O => check + 1 (check = 1 )
+ Step 5: [3,3] equal O => check + 1 (check = 2 )
+ Step 6: [4,2] equal O => check + 1 (check = 3 )
+ Step 7: [5,1] equal O => check + 1 (check = 4 )
+ Step 8: [6,0] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win

## <a name="_vmfoo4j50uc0"></a>4.4 Case: Check reverse diagonal
### <a name="_d81ju1q2lwuq"></a>**Case: User 1(“O”) go [3,3]**
- Start check at [3-4, 3-4] => [-1,-1] to [3+4, 3+4] => [7, 7]
### <a name="_4vt2z87xj8on"></a>**Case: User(“O”) go [3,3] and win**

- Start check at [-1,-1]:
+ Step 1: [-1,-1] null => (check = 0 )
+ Step 2: [0,0] equal O  =>  check + 1 (check = 1 )
+ Step 3: [1,1] equal O => check + 1 (check = 2 )
+ Step 4: [2,2 ] equal O => check + 1 (check = 3 )
+ Step 5: [3,3] equal O => check + 1 (check = 4 )
+ Step 6: [4,4] equal O => check + 1 (check = 5 )
+ If check equal 5 => O win
### <a name="_9hcu6l2bjlob"></a>**Case: User 1(“O”) go [3,3] have “X” between and win**

- Start check at [-1,-1]:
+ Step 1: [-1,-1] equal 0 => check + 1 (check = 1 )
+ Step 2: [0,0] equal X  =>  check = 0 (check = 0 )
+ Step 3: [1,1] equal O => check + 1 (check = 1 )
+ Step 4: [2,2 ] equal O => check + 1 (check = 2 )
+ Step 5: [3,3] equal O => check + 1 (check = 3 )
+ Step 6: [4,4] equal O => check + 1 (check = 4 )
+ Step 6: [5,5] equal O => check + 1 (check = 4 )
+ If check equal 5 => O win



## <a name="_jynppj5rkdsl"></a>4.5 Case: Check block 
We need add 1 more value in first and last when checking 
Example: we check the range([-3,1] to [5-1]), we add 1 more at head [-4,1] and last [6,1].

### <a name="_dc62jxuehllc"></a>**Case: Have 2 point X in head and last range win of O**

Start at [-4,1]:

+ Step 1: [-4,1] equal X => checkBlock + 1  (checkBlock = 1 )
+ Step 2: [-3,1] equal O => check + 1 (check = 1 )
+ Step 3: [-2,1] equal O => check + 1 (check = 2 )
+ Step 4: [-1,1] equal O => check + 1 (check = 3 )
+ Step 5: [0,1] equal O => check + 1 (check = 4 )
+ Step 6: [1,1] equal O => check + 1 (check = 5 )
+ Step 7: [2,1] equal X => checkBlock + 1 (checkBlock = 2 )
+ If check equal 5 => O win => checkBlock =  2 => O not win
### <a name="_bldj9g969u8r"></a>**Case: Have 3 point X in, O enough 5 point, but block by X**
###

<a name="_hjajgnnaasd6"></a>Start at [-4,1]:

+ Step 1: [-4,1] equal X => checkBlock + 1  (checkBlock = 1 )
+ Step 2: [-3,1] equal O => check + 1, checkBlock = 0 
+ Step 3: [-2,1] equal O => check + 1 (check = 2 )
+ Step 4: [-1,1] equal X => checkBlock + 1, check = 0 (checkBlock = 1 )
+ Step 5: [0,1] equal O => check + 1 (check = 1 )
+ Step 6: [1,1] equal O => check + 1 (check = 2 )
+ Step 7: [2,1] equal O => check + 1 (check = 3 )
+ Step 8: [3,1] equal O => check + 1 (check = 4 )
+ Step 9: [4,1] equal O => check + 1 (check = 5 )
+ Step 10: [5,1] equal X => checkBlock + 1 (checkBlock = 2 )

+ If check equal 5 => O win => checkBlock =  2 => O not win
## <a name="_pwo040533pmx"></a>4.6 Case: user go random point
- Example: userO go [3,1]


- Check row: from [-2,1] to [8,1] (x+1)
- Check col: from [3,-3] to [3,5] (y+1)
- Check diagonal: from [-1,-3] to [7,5] (x-1, y+1)
- Check reverse diagonal: from [-1,-5] to [7,-3] (x+1, y+1)


1. # Update board in client
- We save a size of board in the const like: currentSize = 5
## <a name="_qat2izekkm4j"></a>Case: User(“O) go [5,1]
#
- <a name="_d1j7i2b4dwpq"></a>Check in coordinates x,y of step of user:

X = 5, Y = 1

X = current size => resize board for client and set currentSize is 6 like image above
# <a name="_941siablu0e5"></a>Requirements connection of client, server:

`	`Let check the case when application runing:

- From user1 send data to server
- From server send to User2
- From user2 send data to server
- From server send to User1

=> What happens when 4 cases about have internet disconect ? What happen when user1 was send data to server but user2 disconnect ?




## <a name="_t5ncmfb46q7n"></a>How to know user disconnect server ?

- User and server always connect in a connection together, if connection lost, server will know user was disconnection
## <a name="_95e45glo3ela"></a>Case: User1 disconnected
- User1 disconnected, server wait 15 seconds, if user 1 do not go, server will send Use1 Lose to User2
## <a name="_z2t8tdg34hnu"></a>Case: User1 still on internet but not go 


- User1 was not go, auto send noti to server “User1 wasn’t go”, and send it to User2 ⇒ User1 lose
## <a name="_hacq6wzbme5u"></a>Case: User2 wait if user1 disconnect

- In time User1 disconnect, when finish first 5 second, server will send to user2 a notification “user1 disconnecting, and for counter disconnect more 10 second, if nothing send from user1, will send to user2 “user1 lose”
## <a name="_350kh2knqn4t"></a>Case: User2 wait if user1 disconnect, and user 1 connect again

- In time User1 disconnect, when finish first 5 second, server will send to user2 a notification “user1 disconnecting, and for counter disconnect more 10 second, if nothing send from user1, will send to user2 “user1 lose” 
# <a name="_aobgihwfje5t"></a>Request “Draw”, “Lose” from User.
## <a name="_1pzcy0tc5s5n"></a>Case: User1 want to lose

User1 send request to server a request “want to lose and response to user2 is “You win”
## <a name="_7kovnu1m6jjd"></a>Case: User1 want to draw
