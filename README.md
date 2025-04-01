# Meal Planner Docker Setup

This project uses Docker to containerize the server and MongoDB database.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```
.
├── server/           # Node.js server application
│   ├── Dockerfile   # Server container configuration
│   └── ...
└── docker-compose.yml  # Docker services orchestration
```

## Docker Configuration

### Server Container
- Node.js 20 Alpine base image
- TypeScript support
- Hot-reloading enabled for development
- Exposed on port 8000

### MongoDB Container
- Latest MongoDB image
- Persistent data storage
- Exposed on port 27017

## Usage

1. Start all services:
```bash
docker-compose up --build
```

2. Stop all services:
```bash
docker-compose down
```

3. View logs:
```bash
docker-compose logs -f
```

## Environment Variables

The following environment variables are required (defined in `server/.env`):
- `PORT`: Server port (default: 8000)
- `DATABASE_URI`: MongoDB connection string
- `MAIL_TRAP_HOST`: Mailtrap SMTP host
- `MAIL_TRAP_PORT`: Mailtrap SMTP port
- `MAIL_TRAP_USER`: Mailtrap username
- `MAIL_TRAP_PASSWORD`: Mailtrap password
- `MAIL_TRAP_FROM_EMAIL`: Sender email address

## Development

The server container is configured with hot-reloading, so any changes to the source code will automatically trigger a rebuild and restart of the application.

## Data Persistence

MongoDB data is persisted using a Docker volume named `mongodb_data`. This ensures that your data remains available even after containers are stopped or removed. 