# Table of contents


- **[introduction](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#introduction)**
- [Tech Stack](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#project-uses-the-following-stack)
- [Features](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#features)
- [Getting started](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#getting-started)
    - [Installation](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#installation)
    - [Usage](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#usage)
- [Contributing](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#contributing)
- [License](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#license)

# **Introduction**


Serialblocks is an open-source project that combines web development with embedded systems<br />
Communicate with a real hardware like an Arduino through an interactive web-based interface.

Built with❤︎by [ahmad ghoniem](https://twitter.com/yoshuawuyts) and [contributors](https://github.com/Serialblocks/Serialblocks-app/graphs/contributors)

# project uses the following stack:


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

## 1. Client-side (Serialblocks-app)

- [React](https://reactjs.org/docs/getting-started.html)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [ShadcnUI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Socket.IO (Client API)](https://socket.io/docs/v4/client-api/)

## 2. Server-side (Serialblocks-local)

- [Node.JS](https://nodejs.org/)
- [Socket.IO (Server API)](https://socket.io/docs/v4/server-api/)
- [Node SerialPort](https://serialport.io/docs/)

# Features[](https://docs.amplication.com/#key-features-of-amplication)


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

- communicate with serial port connected to your machine , a machine on the same network or even a remote machine!
- list connected serial ports
- visualize live data using zoomable charts and soon more to come!
- simulate live data
- through the Terminal block
    - change serial port settings [baudrate, data bits, stop bits, parity, etc]
    - toggle timestamp
    - simulate live data
    - toggle autoscroll
    - clear terminal output
- easy to work with prebuilt blocks (currently 5)
- across clients notifications
- light/dark theme
- idle indicator

## Pending Features

- upload code
- customizable layout
- More advanced blocks

# Getting Started


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

Serialblocks is using **Multi-Repo structure** where the frontend is in [serialblocks-app](https://github.com/Serialblocks/Serialblocks-app) while backend is in [serialblocks-local](https://github.com/Serialblocks/Serialblocks-local)<br />
First, in order to use serialblocks you will need to be running Serialblocks-local on your machine.

## **Installation**

<details closed>
<summary>
Pre-requisites
</summary> <br />
    To be able to start using Serialblocks , make sure that you have the following prerequisites installed:

###

- Node.js
- NPM
- Git
</details>

<details closed>
<summary>
Running Serialblocks-local
</summary> <br />

> serialblocks-local is a nodejs server that will run on your machine that will interact with the connected serialports <br />
> using [Node SerialPort](https://serialport.io/) package.
1. Clone the repository and install dependencies:

```
git clone https://github.com/Serialblocks/Serialblocks-local && cd Serialblocks-local && npm install
```

2. Run the server script which will use port **3003** by default <br />
could be changed by changing `"config": {"port": "3003"}` in `package.json`<br />
this will run both _server script and _expose script concurrently<br />
_server will run the Nodejs server
<br /> while _expose will expose your localhost for easy sharing using [localtunnel](https://github.com/localtunnel/localtunnel).


```
npm run server
```
>
> Note: you can use Vs Code [local port forwarding](https://code.visualstudio.com/docs/editor/port-forwarding) which offers reduced latency when compared to localtunnel
>
 
</details>

you can then use the [hosted solution](https://serialblocks-app.vercel.app) and use the localtunnel link as the remote url
or run Serialblocks-app locally on your machine and enjoy a latency-free experience.<br />

<details closed>
<summary>
Running Serialblocks-app locally
</summary> <br />

    
1. Clone the repository and install dependencies:


```
git clone https://github.com/Serialblocks/Serialblocks-app && cd Serialblocks-app && npm install
```
    
2. Option 1: Running for production


```
# Build the app
npm run build

# Run the app in production mode
npm run client:prod
```

2. Option 2: Running for development


```
# Run the app in development mode
npm run client:dev
```
    
</details>

## **Usage**


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

After you click the get started button and add the remote url provided by localtunnel or Vs Code local port forwarding<br />
you get to communicate with the server through socket connection made easy by [Socket.IO](https://socket.io/)<br />
you then get to list and connect to the connected ports on that machine running the Nodejs server.<br />

>
> Note: You will need to have a microcontroller connected for example an Arduino UNO or if you don’t have access to that you could use a [Virtual Serial Port](https://www.virtual-serial-port.org/).
> 

based on what you **send** you can programmatically control the connected microcontrollers

for example, once the microcontroller receives `LED_TOGGLE` on the serial port you can trigger a function that toggles a specific LED<br />
while sending `RGB_255_0_255` commands the RGB LED to emit violet light by maximizing its red and blue components<br />

and based on what data you **receive** you can visualize that data.
for example, receiving `{LED: 10}` from a humidity sensor from a humidity sensor prompts the UI to update the Humidity block<br />
or `{processorTemp : { value: 33.38, interval: 1000 }}` could be used by the UI to display the processor temperature value in the processor temp block<br />
accompanied by a refresh interval of 1000 milliseconds that the idle indicator could use to indicate if there has been new data sent or not<br />

>
> Note: Data being sent to be visualized needs to be in `JSON` format
> 

# **Contributing**


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

Serialblocks is an open-source project. We are committed to a fully transparent development process and highly appreciate any contributions.<br />
Whether you are helping us fix bugs, proposing new features, improving our documentation.<br /> 
Please refer to our [contribution guidelines](https://github.com/Serialblocks/.github/blob/main/profile/CONTRIBUTING.md).

- Bug Report: If you see an error message or encounter an issue while using Serialblocks, please create a [bug report](https://github.com/serialblocks/serialblocks-app/issues/new?assignees=&labels=bug&title=%F0%9F%90%9B+Bug+Report%3A+).
- Feature Request: If you have an idea or if there is a capability that is missing and would make development easier and more robust, please submit a [feature request](https://github.com/serialblocks/serialblocks-app/issues/new?assignees=&labels=feature%20request).

# License


[(Back to top)](https://github.com/Serialblocks/Serialblocks-app?tab=readme-ov-file#table-of-contents)

This project is licensed under the [GPL-3.0 license](https://www.tldrlegal.com/license/gnu-general-public-license-v3-gpl-3).

