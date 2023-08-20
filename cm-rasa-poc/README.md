**This repo is now frozen and moved to [conversational-commerce](https://github.com/vtex/conversational-commerce) monorepo.**

# Conversational Commerce RASA POC

This is showing based off of a open source [boilerplate chatbot project](https://github.com/lappis-unb/rasa-ptbr-boilerplate/issues) developed at UnB's Lappis lab.

Read the [boilerplate's README](docs/README.md) for more information on how to run this project locally now.

## Scope

- ~~Hook up the RASA Bot engine to run with both Telegram and Twilio WhatsApp numbers~~
- Set up the Analytics and Logging component of the project so we can quickly iterate with data.
- Train an initial model with a ShoppingList intent and see the entities that are formed in Portuguese.

##  How to run and Demo video

### Setting up the devserver on AWS

Training and experimenting with machine learning models can be quite computer intensive.
Most models implemented on tensorflow are programmed to make use of GPU.
Follow these steps to set up a machine you can ssh into and pull this directory to experiment
on the models.

1. [Follow this guide](https://www.notion.so/marjorivtex/How-to-get-AWS-access-2e71b217c52d49369ce8bc86b6ec8109) to get access to AWS and VPN.
2. Install [Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/aws-build) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

After running the steps on the AWS access / VPN doc, you have to make sure your `~/.aws/credentials` file is configured with this format:

```
[default]
aws_access_key_id=ID
aws_secret_access_key=KEY
aws_session_token=TOKEN

[PROFILE_SWE]
aws_access_key_id=ID
aws_secret_access_key=KEY
aws_session_token=TOKEN
```

```
terraform init
terraform validate
terraform apply
```

To show the instance created and running:

```
aws ec2 describe-instances --filters "Name=tag:Name,Values=rasa-model-training" "Name=instance-state-name,Values=running"  --query "Reservations[*].Instances[*].InstanceId" --output text
```

Connected to the VPN and with vtexcommerce.pem go into the instance and set up the environment:

```
ssh -i "vtexcommerce.pem" ubuntu@<Public_IPV4_address>

# Install Docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Pull the github repo
git clone https://github.com/vtex/cm-rasa-poc.git

# Fill env variables in bots env file
vim env/bots.env

make build
make train
```

You should see the new model trained in models/ and published to this s3 bucket.

From your local machine you can pull the model created
```
scp -r -i vtexcommerce.pem ubuntu@172.16.150.145:~/cm-rasa-poc/bot/models ~/projects/vtex/cm-rasa-poc/bot
```

To kill the instance after you are done:
```
aws ec2 terminate-instances --instance-ids <InstanceId>
```

### Running the Twilio Bot to connect to Twilio Sandbox

After the model is trained, I am running the server twilio is talking to as a webhook as such:

```
make build
make build-analytics
make run-actions
make run-twilio
ngrok http 5002
```

Get the ngrok url and paste it on the [twilio console](https://console.twilio.com/?frameUrl=/console/sms/whatsapp/sandbox)](https://console.twilio.com/?frameUrl=/console/sms/whatsapp/sandbox).

Webhook URL looks like this: https://<temp_subdomain>.ngrok.io/webhooks/twilio/webhook

If you want to try out the sandbox already set up, message 'join promised-cowboy' to +1 415 523 8886 on WA.


### Video showing training of a model locally

This is not the final video, just one showing the dev flow to add a story and train a model:
https://www.loom.com/share/a7ac3a1ad9734dfa94844209924e9169

Install the [Loom for Chrome Extension](https://www.loom.com/blog/loom-github-chrome-extension-integration) to see the video embeded.

## Notes

- Could not import name 'json' from 'engineio’ when running *make train*.
	- Solution was to upgrade RASA to 0.39
- Upgraded RASA from the boilerplate project to 2.5.x
- Upgraded RASA X to 0.39.x

### Future TODO
- Create a data training pipeline to get some training samples
- Productionize the publishing of models for this prototype (ie, send to s3)
- Abstract away the story flow component into React components state machine outside this repp
- Move the bot hub from endpoitn from running on this POC to a javacript webhook so we can connect to vtex io / storefront
- Change RabbitMQ to Redis Stream
