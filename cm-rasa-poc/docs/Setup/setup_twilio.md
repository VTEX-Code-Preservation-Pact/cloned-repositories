# Setup do bot no WhatsApp pelo Twilio

Para configurar e ter seu bot no twilio, você precisa seguir os seguintes passos:
1. [Criar um sandbox Twilio account](#criar-um-numero-sandbox-twilio)
1. [Executar o ngrok](#executar-o-ngrok)
1. [Exportar as variáveis](#exportar-as-variáveis)
1. [Atualizar o arquivo de credenciais](#atualizar-o-arquivo-de-credenciais)

## Criar um numero no Sandbox Twilio

Use [essas instruções do Twilio](https://www.twilio.com/docs/whatsapp/sandbox) e faça o set up
do seu Twilio Sandbox for WhatsApp.

## Executar o ngrok

Precisamos configurar um webhook para fazer a comunicação do nosso bot com o twilio.
Para isso, vamos utilizar o [ngrok](https://ngrok.com/download).
Nesse link, você vai fazer o download. E executar o comando de unzip do arquivo.

Faça o download, extraia o arquivo que foi baixado e execute o comando a seguir.

```sh
./ngrok http 5002
```
Esse comando vai executar o ngrok na porta 5002. Ele vai ocupar o terminal em que for executado.

**Atenção:** O conector do Twilio está utilizando a porta 5002 como padrão.
Caso queira mudar, somente altere a porta utilizada pelo no Makefile.


## Exportar as variáveis

### Twilio

Substitua o `TWILIO_ACCOUNT_SID` e `TWILIO_AUTH_TOKEN` encontrados no [console do Twilio](https://console.twilio.com/?frameUrl=/console).

```sh
TWILIO_ACCOUNT_SID=encontrado_console_twilio
TWILIO_AUTH_TOKEN=encontrado_console_twilio
```

### NGROK

Enquanto o ngrok estiver em execução, ele apresentará uma série de informações da sessão atual.
Copie a url do campo Forwarding com o protocolo `HTTPS` e cole no campo de Webhook do [Twilio Sandbox Configurations](https://console.twilio.com/?frameUrl=/console/sms/whatsapp/sandbox).

Esse é o formato do webhook que deve ser adicionado no console:

```sh
https://your_webhook_server/webhooks/twilio/webhook
```

Essas [instruções](https://rasa.com/docs/rasa/connectors/twilio) do RASA connectors vão ajudar.

Ao final de realizar essas configurações, seu [arquivo de configurações do bot] deve estar de acordo com o exibido logo abaixo:

```sh
TWILIO_ACCOUNT_SID=<twilio-account-sid>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
TWILIO_NUMBER="whatsapp:<number>"
```

## Atualizar o arquivo de credenciais

Edite o arquivo credentials.yml e descomente as linhas referentes ao twilio:
```
twilio:
 account_sid: ${TWILIO_ACCOUNT_SID}
 auth_token: ${TWILIO_AUTH_TOKEN}
 twilio_number: ${TWILIO_NUMBER}
```
Não precisa trocar nenhuma informação, apenas descomentar essa seção do arquivo.


Com isso, é possível realizar a execução do bot com o comando

```
make run-twilio
```

Assim que rodar o comando, você pode conversar com o seu bot no WhatsApp falando com o número de Sandbox do Twilio.
Basta procurar ele pelo username que você criou.

Para mais comandos e informações, veja o [README](https://github.com/lappis-unb/rasa-ptbr-boilerplate/blob/main/README.md)

[arquivo de configurações do bot]: https://github.com/lappis-unb/rasa-ptbr-boilerplate/blob/main/env/bot-twilio.env
