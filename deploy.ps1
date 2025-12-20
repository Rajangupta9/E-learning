# Deploy script for E‑Learning micro‑services (Windows PowerShell)
# ---------------------------------------------------------------
# Prerequisites:
#   - Docker Desktop (or Docker Engine) installed and running
#   - git installed
#   - (optional) a Docker Hub / registry account for pushing images
#
# 1. Pull latest code
git pull origin main

# 2. Create production env file (adjust values securely)
$envFile = "C:\E-learning\.env.prod"
@"
SECRET_KEY=super-secret-prod-key
POSTGRES_USER=elearn
POSTGRES_PASSWORD=StrongPass123
POSTGRES_DB=elearn
"@ | Set-Content -Path $envFile -Encoding UTF8

# 3. Build and start the stack (detached)
# Use the production compose file – you may create docker-compose.prod.yml based on the guide.
# If you only have docker-compose.yml, you can still run it with the env file.

docker compose --env-file $envFile up -d --build

# 4. Build the Next.js frontend (SSR mode)
Set-Location "C:\E-learning\frontend"
npm ci
npm run build
# start the app on port 3000 (or set $env:PORT)
npm start &

# 5. (Optional) Set up a reverse proxy & TLS with Nginx/Traefik on the host.
#    Follow the guide in the README for Nginx configuration.

Write-Host "✅ Deployment finished. Visit http://localhost (or your domain) to test."
