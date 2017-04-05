# xy-inc
API Restful para manipulação de pontos de interesse (POIs).

## Requisitos

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.org/downloads)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Instalação

Primeiramente é necessário fazer o download dos arquivos:

```bash
git clone https://github.com/nielsenmg/xy-inc.git
```

Navegue até o diretório raiz `/xy-inc` e execute o seguinte comando para instalar as dependências:

```bash
yarn install
```

## Configuração
Todas as configurações do projeto devem ser feitas em um único arquivo: `.env`.
 Por padrão o projeto vem com um arquivo `.env.example` localizado no diretório raiz do projeto.
O arquivo `.env` pode ser copiado à partir deste ou gerado utilizando o comando:
```bash
yarn generate-env
```






