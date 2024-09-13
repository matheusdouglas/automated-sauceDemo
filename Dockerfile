# Use uma imagem base do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Instale o Playwright e seus navegadores
RUN npx playwright install

# Expoem a porta
EXPOSE 9222


# Defina o comando para rodar os testes
CMD ["npx", "playwright", "test"]
