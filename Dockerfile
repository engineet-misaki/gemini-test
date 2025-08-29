# Use the official Node.js image.
FROM node:20-slim

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port 3000 to the outside world.
EXPOSE 3000

# The command to run when the container starts.
CMD ["npm", "run", "dev"]
