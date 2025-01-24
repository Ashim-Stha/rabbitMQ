# RabbitMQ Microservices Projects

This repository contains three separate projects that demonstrate microservices architecture using RabbitMQ for message brokering. Each project includes multiple services that communicate with each other through RabbitMQ, showcasing various functionalities such as order processing, notifications, and logging.

## Project 1: Order Notification Microservices

## Overview

This project focuses on order processing and notifications. It includes two main services: Orders API and Notifications API. The Orders API sends order messages to a RabbitMQ queue, and the Notifications API listens for these messages and processes them.

### Project Structure

```
OrderNotificationMicroservices/
	.DS_Store
	docker-compose.yaml
	notifications-api/
		index.js
		package.json
	orders-api/
		index.js
		package.json
```

### Services

#### Orders API

The Orders API is responsible for creating and sending order messages to the RabbitMQ queue.

- **Path:** `OrderNotificationMicroservices/orders-api/index.js`
- **Port:** 8000

#### Notifications API

The Notifications API listens for order messages from the RabbitMQ queue and processes them.

- **Path:** `OrderNotificationMicroservices/notifications-api/index.js`
- **Port:** 8001

### Setup and Running

#### Prerequisites

- Node.js
- Docker
- RabbitMQ

#### Running the Project

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Start RabbitMQ using Docker:**
   ```sh
   docker-compose -f OrderNotificationMicroservices/docker-compose.yaml up
   ```

3. **Install dependencies and start each service:**

   For Orders API:
   ```sh
   cd OrderNotificationMicroservices/orders-api
   npm install
   npm start
   ```

   For Notifications API:
   ```sh
   cd OrderNotificationMicroservices/notifications-api
   npm install
   npm start
   ```

### Usage

- **Orders API:** Access `http://localhost:8000` to send an order message.
- **Notifications API:** Access `http://localhost:8001` to see notifications.

---

## Project 2: Logging and Message Processing Microservices

## Overview

This project handles logging and message processing. It includes multiple microservices that produce and consume messages with different routing keys. The services include Info Microservice, Logger Microservice, and Warning and Error Microservice.

### Project Structure

```
LoggingMessageProcessingMicroservices/
	infoms/
		app.js
		package.json
	loggerms/
		config.js
		package.json
		producer.js
		server.js
	warningAndErrorMs/
		app.js
		package.json
```

### Services

#### Info Microservice

Consumes messages with the routing key "Info" from the RabbitMQ exchange.

- **Path:** `LoggingMessageProcessingMicroservices/infoms/app.js`

#### Logger Microservice

Produces log messages and sends them to the RabbitMQ exchange.

- **Path:** `LoggingMessageProcessingMicroservices/loggerms/producer.js`
- **Server:** `LoggingMessageProcessingMicroservices/loggerms/server.js`
- **Config:** `LoggingMessageProcessingMicroservices/loggerms/config.js`

#### Warning and Error Microservice

Consumes messages with the routing keys "Warning" and "Error" from the RabbitMQ exchange.

- **Path:** `LoggingMessageProcessingMicroservices/warningAndErrorMs/app.js`

### Setup and Running

#### Prerequisites

- Node.js
- Docker
- RabbitMQ

#### Running the Project

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Start RabbitMQ using Docker:**
   ```sh
   docker-compose -f OrderNotificationMicroservices/docker-compose.yaml up
   ```

3. **Install dependencies and start each service:**

   For Info Microservice:
   ```sh
   cd LoggingMessageProcessingMicroservices/infoms
   npm install
   node app.js
   ```

   For Logger Microservice:
   ```sh
   cd LoggingMessageProcessingMicroservices/loggerms
   npm install
   node server.js
   ```

   For Warning and Error Microservice:
   ```sh
   cd LoggingMessageProcessingMicroservices/warningAndErrorMs
   npm install
   node app.js
   ```

### Usage

- **Logger Microservice:** Produces log messages.
- **Info Microservice:** Consumes "Info" messages.
- **Warning and Error Microservice:** Consumes "Warning" and "Error" messages.

---

## Project 3: Audio Streaming Server

Overview
This project handles audio file streaming and encoding/decoding operations. It includes a server that listens for incoming requests and processes audio files accordingly.

### Project Structure

```
AudioStreamingServer/
	.dockerignore
	access.log
	app.js
	Dockerfile
	encode.js
	hya.js
	index.html
	new.js
	package.json
	server.js
	try.js
```

### Setup and Running

#### Prerequisites

- Node.js
- Docker

#### Running the Project

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>/AudioStreamingServer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the server:**
   ```sh
   npm start
   ```

### Usage

- **Server:** Access `http://localhost:3000` to stream audio files.

### API Endpoints

#### POST /sendLog

Publishes a log message to the RabbitMQ queue.

- **URL:** `http://localhost:3000/sendLog`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "logType": "info",
    "message": "This is a log message"
  }
  ```

## License

This project is licensed under the MIT License.

---

This documentation provides an overview of the project structure, services, setup instructions, and usage. Feel free to customize it further to suit your needs.