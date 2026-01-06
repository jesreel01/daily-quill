# Daily Quill - Production Deployment Guide

## Deploying with Dokploy

This guide provides instructions for deploying the Daily Quill application to production using Dokploy.

### Prerequisites

- Dokploy instance set up and running
- Docker and Docker Compose installed on your server
- Git repository access

### Architecture

The application consists of three main services:

- **PostgreSQL Database**: Data persistence (internal port 5432)
- **NestJS API**: Backend service (internal port 3000)
- **Next.js Client**: Frontend application (internal port 3000)

All services communicate internally via Docker network. Dokploy's Traefik handles external routing.

### Deployment Steps

#### 1. Configure Environment Variables

In Dokploy, add the following environment variables:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your-secure-password>
POSTGRES_DB=daily_quill

JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRES_IN=7d

NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Important**:

- Replace `<your-secure-password>` with a strong PostgreSQL password
- Replace `<your-jwt-secret-key>` with a secure random string for JWT signing
- Update `NEXT_PUBLIC_API_URL` with your actual API domain
- Dokploy uses Traefik as a reverse proxy, so port mappings are not needed

#### 2. Deploy in Dokploy

1. **Create a new application** in Dokploy
2. **Select Docker Compose** as the deployment method
3. **Point to your Git repository**
4. **Set the compose file path** to `docker-compose.prod.yaml`
5. **Add environment variables** from step 1
6. **Deploy**

#### 3. Domain Configuration

In Dokploy's UI, configure domains for your services:

- **API**: `api.yourdomain.com` → Service: `api` (container port 3000)
- **Client**: `yourdomain.com` → Service: `client` (container port 3000)

Dokploy uses Traefik to automatically route traffic to your containers via their internal ports. SSL certificates are handled automatically via Let's Encrypt.

### Health Checks

All services include health checks:

- **PostgreSQL**: Checks database availability
- **API**: Health endpoint at `/health`
- **Client**: Root endpoint check

### Data Persistence

PostgreSQL data is persisted in a Docker volume named `postgres_data`. This ensures your data survives container restarts.

### Updating the Application

To update your deployed application:

1. Push changes to your Git repository
2. In Dokploy, navigate to your application
3. Click "Redeploy"
4. Dokploy will pull the latest code and rebuild/restart containers

### Troubleshooting

#### Viewing Logs

In Dokploy, you can view logs for each service:

- Navigate to your application
- Select the service (postgres, api, or client)
- View logs in real-time

#### Common Issues

**API can't connect to database:**

- Verify `POSTGRES_PASSWORD` matches in environment variables
- Check PostgreSQL service health in Dokploy dashboard

**Client can't reach API:**

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Ensure API domain is properly configured

**Build failures:**

- Check build logs in Dokploy
- Verify all workspace dependencies are available
- Ensure pnpm lockfile is up to date

### Manual Deployment (Without Dokploy)

If you want to deploy manually using Docker Compose:

```bash
docker-compose -f docker-compose.prod.yaml up -d
```

To view logs:

```bash
docker-compose -f docker-compose.prod.yaml logs -f
```

To stop services:

```bash
docker-compose -f docker-compose.prod.yaml down
```

### Database Migrations

Before first deployment, ensure your database schema is set up:

```bash
docker-compose -f docker-compose.prod.yaml exec api pnpm run migration:run
```

### Backup and Restore

**Backup PostgreSQL data:**

```bash
docker-compose -f docker-compose.prod.yaml exec postgres pg_dump -U postgres daily_quill > backup.sql
```

**Restore from backup:**

```bash
cat backup.sql | docker-compose -f docker-compose.prod.yaml exec -T postgres psql -U postgres daily_quill
```

### Security Considerations

1. **Never commit `.env` files** with production secrets
2. **Use strong passwords** for database and JWT secrets
3. **Enable HTTPS** in production (handled by Dokploy)
4. **Regularly update** dependencies and Docker images
5. **Implement rate limiting** on your API endpoints
6. **Use environment-specific** configurations

### Monitoring

Consider adding monitoring tools:

- Application Performance Monitoring (APM)
- Error tracking (e.g., Sentry)
- Uptime monitoring

### Support

For issues specific to Dokploy, refer to the [Dokploy documentation](https://docs.dokploy.com/).
