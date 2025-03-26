#!/bin/sh
# Enable debugging output
# set -x

# Change to the polyglot directory
cd ~/polyglot/

# Start Docker containers in detached mode
docker-compose up -d


# Wait for the Docker container to be up (you can adjust the timeout)
echo "Waiting for Docker container to be ready..."
while ! docker-compose exec frontend sh -c 'echo "Container is ready"'; do
  sleep 2
done

# Wait for additional time and check ssl certs
cd ~/polyglot/utils/
./update-ssl-cert.sh

# Wait for the application to be ready
echo "Waiting for the frontend to be available on https://localhost:5173..."
until curl --silent --fail --insecure https://localhost:5173; do
  sleep 2
done

# Now that the application is available, open the browser
cmd.exe /C start https://localhost:5173


# Prompt the user to finish using the application
echo ""
echo "Finished using the application? Press any key to perform application shutdown"
echo "(recommended, as otherwise, it consumes resources unnecessarily)."
echo "Press any key to continue..."
read input
echo ""

# Perform cleanup (e.g., stop Docker containers and quit Docker Desktop)
echo "Performing cleanup..."
cd ~/polyglot/
docker-compose down

# Quit Docker Desktop if it was started by this script
if tasklist | findstr /i "Docker Desktop.exe" > /dev/null; then
  echo "Quitting Docker Desktop..."
  cmd.exe /C taskkill /F /IM "Docker Desktop.exe"
fi