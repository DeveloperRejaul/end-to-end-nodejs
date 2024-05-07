# End-to-End Node.js Projects
Welcome to the "end-to-end-nodejs" repository! This repository contains a collection of Node.js projects implementing various services. Each project focuses on different aspects of Node.js development, providing a comprehensive understanding of building end-to-end applications.

## Projects
| #SL | Name | Code| Demo |
|----|------|-----|------|
|01|[Character Encoding Cli Project (Vanilla JS)](#character-encoding-cli-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/src/character-encoding)| [Link](https://youtu.be/XCwnPwLtazk)|
|02|[Load Balancing Project (Node cluster)](#load-balancing-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/src/cluster)| [Link](https://google.com)|
|03|[Malty Threading Project (Node Worker Thread)](#malty-threading-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/src/workerThread)| [Link](https://google.com)|
|04|[Ticket Management Project (Node Event)](#ticket-management-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/src/event)| [Link](https://google.com)|
|05|[Rabbitmq Microservices Project (amqplib)](#rabbitmq-microservices-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/src/rabbitMQ)| [Link](https://google.com)|
|06|[Microservice SDK for API Communication](#microservice-sdk-for-api-communication)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/micro-services/sdk)| [Link](https://google.com)|
|07|[Crypto Module Project](#crypto-module-project)| [Link](https://github.com/DeveloperRejaul/end-to-end-nodejs/tree/main/crypto)| [Link](https://google.com)|



## Character Encoding Cli Project
### Introduction
This project aims to develop a character encoding tool using Node.js and TypeScript that provides functionality for converting text to binary and binary to text. Character encoding is essential for ensuring the correct representation of text across different systems, languages, and platforms.

### Features
- Conversion between text and binary formats.
- Command-line interface for easy usage.
- Support for both text-to-binary and binary-to-text conversion.
- Error handling for invalid input and unsupported encoding schemes.

### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs 

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:

```
yarn compile
node .\dist\character-encoding\app.js
```


## Load Balancing Project
### Introduction
This project implements load balancing in a Node.js application using the Node.js Cluster module. Load balancing is crucial for distributing incoming traffic across multiple servers, improving performance, and ensuring high availability.

### Features
- Distribution of incoming traffic across multiple worker processes or servers.
- Fault tolerance and automatic recovery of failed processes.
- Scalability by utilizing multiple CPU cores efficiently.
- Monitoring and health checks to ensure optimal performance.

### Getting Started
Follow these instructions to get started with the Load Balancing Project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move to the project directory 
3. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git
cd end-to-end-nodejs
yarn install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:

```
yarn compile
node .\dist\cluster\no-cluster.js // running server without cluster in single node instance mode
npx loadtest -n 1000 -c 100 http://localhost:3000 // see output how many times

node .\dist\cluster\cluster.js // running server with cluster in multiple node instance mode
npx loadtest -n 1000 -c 100 http://localhost:3000 // see output how many times

```


## Malty Threading Project
### Introduction
The Malty Threading Project is a Node.js project that harnesses the power of the Worker Threads module for efficient multi-threading. This project aims to demonstrate the benefits of leveraging Node.js's built-in multi-threading capabilities for improving performance in CPU-intensive tasks.

### Features
- Worker Threads: Utilizes Node.js Worker Threads module to create and manage multiple threads for parallel processing.
- Efficient Task Execution: Demonstrates how to divide tasks into smaller units and distribute them - across worker threads for improved performance.
- Example Applications: Provides example applications to showcase different use cases where multi-threading can be beneficial.
- Scalability: Designed to handle large-scale tasks by efficiently utilizing system resources through multi-threading.

### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs 

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:
3. Hit api and test:

```
yarn compile
node .\dist\workerThread\main.js
Api base url: http://localhost:4000/

//heavy task with out worker thread
http://localhost:4000/heavy/ 

//heavy task with worker thread
http://localhost:4000/heavy2/ 

//heavy task with malty dynamic worker thread
http://localhost:4000/heavy3/ 
```


## Ticket Management Project
### Introduction
The Ticket Management Project is a Node.js application designed to demonstrate event-driven architecture using the built-in Event module. This project serves as a practical example of how to implement event-driven patterns to manage ticketing systems efficiently.

### Features
- Event-Driven Architecture: Utilizes Node.js Event module to implement event-driven communication between components.
- Ticket Creation and Management: Provides functionality to create, update, and delete tickets.
- Event Handling: Demonstrates how to define and handle custom events for various ticket-related actions.
- Scalability: Designed to handle a large number of concurrent events and tickets efficiently.

### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs 

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:

```
yarn compile
node .\dist\event\main.js
```

## Rabbitmq Microservices Project
### Introduction
This project is a demonstration of various messaging patterns using RabbitMQ and Node.js with amqplib. It includes implementations for:

### Features
- Producer-Consumer
- Publish-Subscribe
- Routing
- RPC (Remote Procedure Call)
- Topic-based messaging

### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs 

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:
3. run all file and test

```
yarn compile
cd .\dist\rabbitMQ\
```


### Microservice SDK for API Communication
### Introduction
This project aims to simplify communication with microservices by providing a software development kit (SDK) that wraps around the microservices' APIs. It enables developers to interact with the microservices without dealing with the intricacies of API requests directly.<br/>
The SDK abstracts away the complexities of making HTTP requests to the microservices' APIs. It provides a simple and intuitive interface for developers to interact with the microservices, allowing them to focus on building features rather than handling API communication boilerplate.

### Features
- Encapsulates API requests within easy-to-use SDK functions.
- Handles authentication and authorization transparently.
- Provides error handling and response validation mechanisms.
- Offers customizable options for advanced use cases.


### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs/micro-services/sdk

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:

```
yarn compile
// if you install in your local machine run : npm link  and install this module in project run: npm link sdk

// if you publish npm : npm run publish
```


### Crypto Module Project
### Introduction
This project utilizes the Node.js Crypto module to perform various cryptographic operations such as hashing, signing, verification, encryption, and decryption. It provides a set of functions to perform these operations securely.

### Features
- General hashing for generating message digests.
- Signing and verification of data to ensure integrity and authenticity.
- Encryption and decryption for securing sensitive information.


### Getting Started
Follow these instructions to get started with the project:

#### Prerequisites
- Node.js installed on your system.

#### Installation
1. Clone this repository to your local machine
2. Move the project directory 
4. Install all the dependencies
```
git clone https://github.com/DeveloperRejaul/end-to-end-nodejs.git

cd end-to-end-nodejs/micro-services/sdk

yarn or npm install
```

#### Usage
1. Compile typescript code: (`yarn build`);
2. Run the script with the desired options:

```
yarn compile
node .\dist\crypto\main.js
```
