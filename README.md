

## TO RUN Client(req)
#### Requirements: Node, Redis <br/>
```cd Client <br/>
npm i 
npm run dev 
```

#### Run redis 
#### In new Terminal: 

#### For Windows & Linux:

```
wsl //skip for linux
```
```
sudo apt-get update 
sudo apt-get install redis 
redis-server
```

#### For MacOs: 
```
brew install redis  
redis-server
```

## To Run Cotest_python(req)
Requiremets: Python, FastApi
```
pip install -r 
python -m cotest_python.api
```
### TO RUN TEST FILE (opt)

```
cd Test 
npm i 
node index.js
```

## ﻿CoTest Workflow
```
my-code-analyzer/ 
├── src/
│   ├── main/
│   │   ├── lexer/
│   │   ├── parser/
│   │   ├── analyzer/
│   │   ├── rules/
│   │   └── reports/
│   ├── test/
│   │   ├── lexer/
│   │   ├── parser/
│   │   ├── analyzer/
│   │   ├── rules/
│   │   └── reports/
```
#### some packages 
`npm install eslint eslint-plugin-security eslint-plugin-sonarjs \
            eslint-config-airbnb-base eslint-plugin-import \
            @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev`
