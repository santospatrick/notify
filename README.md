# `@santospatrick/notify`
> This library provides an easy-to-use notification system that supports sending notifications via email and SMS using third-party providers.

<img src="docs/logo.png" width="250px" />

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Example: Sending an email](#example-sending-an-email)
- [Third-Party Providers](#third-party-providers)
    - [Email Providers](#email-providers)
        - [How to get Twilio Sendgrid Grid API Key](#how-to-get-twilio-sendgrid-grid-api-key)

## Features

- Send Email notifications
- Send SMS notifications
- Centralized notification management
- Flexible architecture for extending to other notification channels

## Installation

You can install this library using any of the following package managers:

### Using `npm`

```bash
npm install @santospatrick/notify
```

### Using `yarn`

```bash
yarn add @santospatrick/notify
```

### Using `pnpm`

```bash
pnpm add @santospatrick/notify
```

## Usage

### Example: Sending an email

Here’s a basic example of how to send an email using the `NotificationManager` from the library:

```typescript
import { NotificationManager, EmailProviders } from '@santospatrick/notify'
import { EmailProvider } from '@/contracts/EmailProviders';

// Create a new instance of NotificationManager
const notificationManager = new NotificationManager();

// Setup email service to be Twilio SendGrid (more to come!)
notificationManager.addEmailService(EmailProviders.SENDGRID)

// Send notification
notificationManager.send({
    title: 'Hello World',
    message: 'This is a test message',
}).catch(console.error)
```

## Third-Party Providers

### Email Providers

#### How to get Twilio Sendgrid Grid API Key

This library uses SendGrid to send email notifications. To set up the SendGrid API key:

1. Sign up for a [Twilio SendGrid account](https://sendgrid.com/).
2. Go to `Settings > Sender Authentication > Verify a Single Sender > "Create New Sender"`.
3. Fill out the form and click **"Create"**.
4. Go to `Settings > API Keys > "Create API Key"`.
5. Give it a name and select **"Restricted Access"**, click **"Mail Send"** and enable **"Mail Send"** (this is the only permission needed).
![Notification System Diagram](docs/sendgrid-mail-send.png)
6. Click **"Create & View"** and copy the API key.

Made with ❤️ by Patrick Santos
