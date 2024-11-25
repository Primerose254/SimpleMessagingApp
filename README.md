truffle compile
truffle migrate --network development

cd frontend
npm init -y
npm install web3 tailwindcss axios
npx tailwindcss init

npx tailwindcss -i ./src/styles/input.css -o ./dist/output.css --watch

npx http-server ./frontend/src
