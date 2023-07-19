you can delete package.json that's only used to run the script start and acheive the same by running

npx concurrently "npm -C client run client" "npm -C server run server"

clock configuration: the processing speed of which your code will be executed.

apart from configuring the main clock speed
we can configure also configure the peripheral clock speed
or the clock speed that should be allocated to all the peripherals
of your stm32 microcontroller

gpios, uart, timers
PLL: phase lock loop

the terms sensors, transducers, transmitter
have been used interchangeably by different vendors

sensors transducers
process control: transmitter

transducer ->. pressure transducer, temperature transducer, ultrasonic transducer.

sensors -> output in the same format
transducer -> convert measurement to electrical signal

strain gauge -> changes it's resistance proportionally to the strain it experiences.

all sensors are transducers but not all transducers are sensors
because you can have a loud speaker that converts electrical signal into sound which is a transducer

difference between pressure transducer and pressure transmitter
is that the transducer converts pressure to an electronic signal

while a pressure transmitter also amplifies, modifiers and send that signal
to the receiver.

conclusion:
transducer converts one form of energy to another
sensor the performs the initial measurement of physical variables

all sensors are transducers but not all transducers are sensors
transmitters take the output of the pressure transducers and amplifies and send that signal to the receiver

React+Node have to use 2 seperate codebases/servers?
https://stackoverflow.com/questions/71557689/reactnode-have-to-use-2-seperate-codebases-servers
// web assembly
https://pradeeprajr93.medium.com/webassembly-the-new-joiner-of-html-css-js-trio-75e5e5bba7b1
https://www.quora.com/What-is-the-likelihood-of-React-or-Angular-being-compiled-into-WebAssembly-instead-of-JavaScript-in-the-future
//IOT
https://chat.openai.com/share/c5bb5369-4659-406b-87ac-38b83630fe92
// integerating openAI
// limitations of support api

// http protocol

unidirectional half duplex comm protocol
even if you wanted to the server by itself doesn't send information to the client the client has to strictly make a get request TODO: GET POST UPDATE..

connection created by HTTP IS temporary and is closed as soon as the response from the server is reeieved and in order to make a new request a fresh connection is to be created although that's fine for our everyday use cases

most of web runs on the http

doesn't working with high load apps like gaming or trading

even though http is not for full duplex
workaround: http polling
a client makes a request to the sesrver
but instead of responding on the spot

server delays it's response
aggregates afew events on the server side and then responds to the client wheneer it seems optimal as soon the as client recieves the response an a new request is made
responds to client whenever it sesems optimal as soon as response reaches create the conn is closed

//http streaming//

http streaming in this method the request response ccle takes place but the conn between client and server is not closed as soon the client recieves the response network overhead avoided since we are using same connection

//server sent events//
clinet sends a req to server and after tat the server sends multiple responses to client called server events

can't match eff of websockets

part of this protocol there\s handshake request TODO:SURE YOU WANT ME TO SHAKE YOUR HAND
ONCE CLIENT CONNECTED TO SERVER
FULL DUPLEX REAL TIME COMM CHANNCEL BETWEEN THEM ESTABLISHES

server and client are free to push messages to each other as they like this will continue till connection exists

mkdir websocketserver

spawn a web socket server using the http server that we created

// socketio client
Debug / logging
In order to see all the client debug output, run the following command on the browser console – including the desired scope – and reload your app page:

localStorage.debug = '\*';

const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))
parser.on('data', console.log) // emits data after every '\n'

Also, WebSockets is event-driven: both the server, and the client can react to events and messages.

We can listen for a connection event, fire up a function when a new user connects to the server, emit a message (basically an event) over a socket, and much more.

<!-- let webSocket = new WebSocket(location.origin.replace(/^http/, 'ws')); -->

When a client request is made via a RESTful API, it transfers a representation of the state of the resource to the requester or endpoint. usually delivered in JSON (JAVASCRIPT NOTATION) despite its name, it’s language-agnostic, as well as readable by both humans and machines.

MQTT is suitable for low-powered devices with limited CPU and memory, and unreliable, low-bandwidth networks.
It's the go-to protocol for IoT use cases. WebSockets are suitable for web apps and devices unrestricted (or less restricted) by low bandwidth.
