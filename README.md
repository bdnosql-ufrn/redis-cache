# Exemplo de uso do Redis como cache

O presente programa utiliza o Redis como cache para armazenar o resultado do cálculo do fatorial de um número.

## Iniciando o redis

Para iniciar o Redis via Docker, execute:

```bash
docker run --name redis-nosql -p 6379:6379 -d redis
```

## Iniciando o programa

Para iniciar o programa execute:

```bash
npm install
npm start
```

## Rotas

O programa cria uma rota /fatorial. Exemplo de uso: http://localhost:3000/fatorial/30