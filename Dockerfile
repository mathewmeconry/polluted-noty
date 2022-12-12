FROM postgres

RUN apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt update && apt-get install -y nodejs && npm i -g yarn

RUN mkdir -p /home/appuser/
RUN mkdir -p /app/

RUN groupadd -r appuser && \ 
    useradd appuser -g appuser && \ 
    chown -R appuser:appuser /home/appuser/ && \ 
    chown -R appuser:appuser /app

COPY --chown=appuser:appuser starter.sh /
COPY --chown=appuser:appuser ./src /app/build/src
COPY --chown=appuser:appuser ./package.json /app/build/package.json
COPY --chown=appuser:appuser ./tsconfig.json /app/build/tsconfig.json
COPY --chown=appuser:appuser ./.env /app/build/.env

COPY --chown=appuser:appuser ./frontend/src /app/build/frontend/src
COPY --chown=appuser:appuser ./frontend/public /app/build/frontend/public
COPY --chown=appuser:appuser ./frontend/package.json /app/build/frontend/package.json

# Build frontend
WORKDIR /app/build/frontend
RUN yarn 
RUN yarn build

# Build backend
WORKDIR /app/build
RUN yarn 
RUN yarn run build

RUN chmod u+x /starter.sh

EXPOSE 8080

# Run everything after as non-privileged user.
USER appuser

ENTRYPOINT [ "sh" ]
CMD ["/starter.sh"]