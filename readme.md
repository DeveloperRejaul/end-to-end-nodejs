# End-to-End Node.js Projects
Welcome to the "end-to-end-nodejs" repository! This repository contains a collection of Node.js projects implementing various services. Each project focuses on different aspects of Node.js development, providing a comprehensive understanding of building end-to-end applications.

## Projects
1. [Character Encoding Project](#character-encoding-project)
2. [Load Balancing Project](#load-balancing-project)

## Character Encoding Project

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

