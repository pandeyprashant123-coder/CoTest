## CoTest Workflow
my-code-analyzer/ <br/>
├── src/<br/>
│   ├── main/<br/>
│   │   ├── lexer/<br/>
│   │   ├── parser/<br/>
│   │   ├── analyzer/<br/>
│   │   ├── rules/<br/>
│   │   └── reports/<br/>
│   ├── test/<br/>
│   │   ├── lexer/<br/>
│   │   ├── parser/<br/>
│   │   ├── analyzer/<br/>
│   │   ├── rules/<br/>
│   │   └── reports/<br/>
├── docs/<br/>
├── examples/<br/>
└── README.md

## TO RUN Client(req)
#### Requirements: Node, Redis <br/>
cd Client <br/>
npm i <br/>
npm run dev <br/>

### In new Terminal: <br/>

#### For Windows & Linux:
wsl (skip for Linux) <br/>
sudo apt-get update <br/>
sudo apt-get install redis <br/>
redis-server <br/>

#### For MacOs: 
brew install redis <br/> 
redis-server

## To Run Cotest_python(req)
Requiremets: Python, FastApi
pip install -r <br/>
python -m cotest_python.api

### TO RUN TEST FILE (opt)

cd Test <br/>
npm i <br/>
node index.js

#### some packages 
npm install eslint eslint-plugin-security eslint-plugin-sonarjs \
            eslint-config-airbnb-base eslint-plugin-import \
            @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
