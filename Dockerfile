FROM node:14

WORKDIR /src/gluecodes-forms
ADD . /src/gluecodes-forms

RUN yarn install
