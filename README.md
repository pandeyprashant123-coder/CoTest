

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
# Python

```
pip install -r cotest_python/requirements.txt
```

## Testing Python code
```
python -m cotest_python.reviewer test_file
```

## Python Backend deployment
```
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
