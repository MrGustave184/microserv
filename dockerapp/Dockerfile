# Base image
FROM node:alpine

# Setup working directory
# Any following command will be excecuted relative to our workdir (in this case, . will refer to /usr/app)
# If the folder doesn't exists in the container's fs, it will be created
WORKDIR /usr/app

# Copy local files to container fs
# COPY ./ ./ 

# We copy package.json first to avoid having to npm install every time we 
# make a change to a file and have to rebuild and restart the container
# because npm install result will remain cached
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY ./ ./

# Set default command
CMD ["npm", "start"]