# Use the official MongoDB image as the base
FROM mongo:latest

# Set up a default database and user
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=example
ENV MONGO_INITDB_DATABASE=mydatabase

# Copy any initialization scripts if needed
COPY init-db.js /docker-entrypoint-initdb.d/

# Expose MongoDB's default port
EXPOSE 27017

CMD ["mongod", "--bind_ip_all"]