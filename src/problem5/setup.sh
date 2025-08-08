#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting project setup..."

# Step 1: Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  echo "⚠️  .env file not found. Creating a default one..."
  cat <<EOF > .env
DATABASE_URL="mysql://root:@mysql:3306/crude"
EOF
else
  echo "✅ .env file found"
fi

# Step 2: Install dependencies (optional, outside Docker)
if [ -f "package.json" ]; then
  echo "📦 Installing local dependencies..."
  npm install
fi

# Step 3: Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d --build

# Step 4: Wait for DB to be ready (optional if handled elsewhere)

# Step 5: Run Prisma migrations
echo "🛠️  Applying Prisma database migrations..."
docker-compose exec app npx prisma migrate deploy

# Step 6: Tail application logs
echo "📜 Tailing application logs..."
docker-compose logs -f app
