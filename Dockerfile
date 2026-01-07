FROM node:24-alpine AS base-fe
WORKDIR /app

FROM base-fe AS fe-deps
WORKDIR /app
COPY /MyBookshelfApp/package.json /MyBookshelfApp/package-lock.json .
RUN npm ci --only=production

FROM base-fe AS fe-build
WORKDIR /app
COPY /MyBookshelfApp .
RUN npm ci
RUN npm i -g @angular/cli
RUN npm run build

FROM base-fe AS fe-final
COPY --from=fe-build /app/node_modules /app/node_modules
COPY --from=fe-build /app/dist /app/dist
COPY /MyBookshelfApp /app
USER node
EXPOSE 4000
CMD ["npm", "run", "serve:ssr:my-bookshelf-app"]