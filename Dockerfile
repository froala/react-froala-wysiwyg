FROM node:14.19.0

LABEL maintainer="froala_git_travis_bot@idera.com"

ARG PackageName
ARG PackageVersion
ARG NexusUser
ARG NexusPassword

WORKDIR /app/
COPY . .

RUN apt update -y \
    && apt install -y jq unzip wget
RUN wget --no-check-certificate --user ${NexusUser}  --password ${NexusPassword} https://nexus.tools.froala-infra.com/repository/Froala-npm/${PackageName}/-/${PackageName}-${PackageVersion}.tgz
RUN npm install
RUN npm run build

EXPOSE 4000
CMD ["npm","run","demo"]