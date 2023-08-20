terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_instance" "ec2" {
  // Deep Learning Ubuntu AMI
  ami             = "ami-04cd519d2f9578053"
  instance_type   = "g4dn.xlarge"

  // Can SSH through port 22 connected to VPN
  security_groups = ["sg-424ed939"]
  subnet_id       = "subnet-0a184aa31407f4228"

  key_name        = "vtexcommerce"

  tags = {
    Name = "rasa-model-training"
    Product = "conversational-commerce"
    Owner = "conversational-commerce"
  }
}
