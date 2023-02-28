FROM node:alpine    
EXPOSE 8080
COPY ./db.json /opt/db.json
RUN yarn global add json-server
CMD ["json-server", "-H", "0.0.0.0", "-p", "8080", "/opt/db.json"]