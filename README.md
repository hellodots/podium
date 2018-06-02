# Podium

Let's start a challenge!

## Prerequisites

1.  [npm](https://www.npmjs.com/ "https://www.npmjs.com/")
2.  [Node](https://nodejs.org/en/ "https://nodejs.org/en/")
3.  [Serverless cli](https://serverless.com/ "https://serverless.com/")

```
npm install -g serverless
```

## Install/update dependencies

In the app folder run the command:

```
npm install
```

## Run locally

In the app folder run the command:

```
sls offline start
```

## Deploy to staging

In the app folder run the command:

```
sls deploy -v --stage staging --aws-profile [stagingAWSProfile]
```

## Deploy to production

In the app folder run the command:

```
sls deploy -v --stage production --aws-profile [productionAWSProfile]
```
