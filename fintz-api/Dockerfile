# Dockerfile

FROM python:3.11-slim

# Variáveis para o ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Diretório de trabalho
WORKDIR /app

# Copiar dependências e instalar
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY main.py ./
# Copiar o restante da aplicação
COPY . .

# Expor porta padrão do Flask
EXPOSE 5000

# Comando padrão
CMD ["python", "main.py"]
