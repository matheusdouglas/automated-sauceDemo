# Use a imagem base do Playwright
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o conteúdo do diretório atual para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Defina o comando padrão
CMD ["npx", "playwright", "test"]
