# xy-inc
xy-inc é uma API Rest para manipulação de pontos de interesse (POIs) utilizando o framework Express (NodeJS) e MongoDB.
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

Para facilitar a instalação do MongoDB é recomendado que seja utilizado o [docker](https://www.docker.com/community-edition). Caso tenha o docker já instalado, navegue até o diretório raiz da aplicação e execute o comando:

```bash
docker-compose up
```

Caso queira fazer a instalação completa do MongoDB as informações podem ser encontradas [aqui](https://docs.mongodb.com/manual/administration/install-community/).

## Configuração
Todas as configurações do projeto devem ser feitas em um único arquivo `.env` localizado na raiz do projeto.
Para gerar o arquivo execute o seguinte comando:

```bash
yarn env:generate
```

## Iniciar
Para iniciar a aplicação basta rodar o seguinte comando:

```bash
yarn start
```

Por padrão o serviço é inicializado na porta 8080.


![yarn_start](http://i.imgur.com/SO4BMyn.jpg)


## Serviços Disponíveis


| Método  | URL                  | Parâmetros                                  | Descrição                                                                            |
|---------|----------------------|---------------------------------------------|--------------------------------------------------------------------------------------|
| GET     | /api/v1/pois/        |                                             | Lista todos os pontos de interesse cadastrados.                                      |
| GET     | /api/v1/pois/near    |*Query String*:<br/>?x=:x&y=:y&max_distance=:max | Busca todos os pontos de interesse (POIs) próximos a determinada ponto de referência.|        
| POST    | /api/v1/pois         |*JSON*:<br/>{<br/>&nbsp;&nbsp;"name": "POI Name",<br/>&nbsp;&nbsp;"coordinates": [-1, 20]<br/>} | Cadastra um novo ponto de interesse (POI).                                   |

**Tipos de Respostas:**

| Código | Nome                   | Descrição                                                            |
|--------|------------------------|----------------------------------------------------------------------| 
|200     | OK                     | Indica que a operação foi realizada com sucesso.                     |
|400     | Bad Request            | Indica que os parâmetros fornecidos estão incorretos.                |
|404     | Not Found              | Indica que o recurso solicitado não foi localizado.                  |
|500     | Internal Server Error  | Indica que ocorreu algum erro interno no processamento da requisição |
 
## Testes
Os testes podem ser executados através do comando:

```bash
yarn test
```

Para gerar cobertura:

```bash
yarn test:coverage
```

![running](http://i.imgur.com/ph3UrOm.png)

Após a execução dos testes será gerado uma pasta `coverage` com o relatório completo dos testes realizados.

![coverage](http://i.imgur.com/UljFOOm.png)
