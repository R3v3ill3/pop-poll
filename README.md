# Multi-Modal Polling Platform

A comprehensive polling platform that integrates SMS-based surveys with online panel surveys, featuring AI-assisted question generation, sophisticated sample management, and intuitive reporting.

## Features

- 🔐 Secure user authentication and role-based access control
- 📊 Intuitive survey creation with AI assistance
- 📱 Multi-modal deployment (SMS and online panels)
- 📈 Real-time monitoring and quota management
- 📊 Advanced reporting with Chart.js visualizations
- 🌍 Geographic targeting with electoral mapping
- 🤖 AI-powered question generation
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Charts**: Chart.js
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git
- Twilio account (for SMS functionality)
- Dynata API access
- OpenAI API key (for AI question generation)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/polling-platform.git
   cd polling-platform
   ```

2. Install dependencies:
   ```bash
   npm run setup
   ```

3. Create `.env` file in the root directory:
   ```
   # Database
   MONGO_URI=your_mongodb_connection_string

   # Authentication
   JWT_SECRET=your_jwt_secret

   # SMS Provider (Twilio)
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number

   # Dynata API
   DYNATA_API_KEY=your_dynata_api_key
   DYNATA_API_SECRET=your_dynata_api_secret
   DYNATA_ENDPOINT=your_dynata_api_endpoint

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Application
   NODE_ENV=development
   PORT=5000
   ```

4. Start development servers:
   ```bash
   npm run dev
   ```

## Production Deployment

### Physical Ubuntu Server Setup

1. Update system and install dependencies:
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y nodejs npm nginx
   ```

2. Install Node.js v18:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. Clone and setup application:
   ```bash
   git clone https://github.com/yourusername/polling-platform.git
   cd polling-platform
   npm run setup
   ```

4. Create production environment file:
   ```bash
   sudo nano .env
   ```
   Add all environment variables as listed in the Local Development Setup section, but with production values and:
   ```
   NODE_ENV=production
   ```

5. Setup PM2 process manager:
   ```bash
   sudo npm install -g pm2
   pm2 start backend/server.js --name "polling-api"
   pm2 save
   pm2 startup
   ```

6. Configure Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/polling-platform
   ```
   Add:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           root /var/www/polling-platform;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

7. Enable and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/polling-platform /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. Build and deploy frontend:
   ```bash
   cd frontend
   npm run build
   sudo cp -r dist/* /var/www/polling-platform/
   ```

### Virtual Server Setup (e.g., Azure, AWS, DigitalOcean)

1. Create a virtual machine:
   - Choose Ubuntu Server LTS
   - At least 2GB RAM
   - 20GB SSD
   - Allow ports 22 (SSH), 80 (HTTP), and 443 (HTTPS)

2. Connect to your VM:
   ```bash
   ssh username@your_server_ip
   ```

3. Follow the same steps as physical server setup above

4. Additional security measures:
   ```bash
   # Setup UFW firewall
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable

   # Install Certbot for SSL
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your_domain.com
   ```

## Environment Variables

Create `.env` files in both root and frontend directories:

Root `.env`:
```
# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# SMS Provider (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Dynata API
DYNATA_API_KEY=your_dynata_api_key
DYNATA_API_SECRET=your_dynata_api_secret
DYNATA_ENDPOINT=your_dynata_api_endpoint

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Application
NODE_ENV=development/production
PORT=5000
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000
```

## API Documentation

API documentation is available at `/api-docs` when running in development mode.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@your-domain.com or open an issue in the repository.