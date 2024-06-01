provider "aws" {
  region     = "us-east-2"
  access_key = "AKIAWKIWXKE5WLV6BLBN"
  secret_key = "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"
}

resource "aws_instance" "my_vention_instance" {
  ami                    = "ami-0ca2e925753ca2fb4"
  instance_type          = "t2.micro"
  key_name               = "VentionKey"
  vpc_security_group_ids = [aws_security_group.my_sg.id]

  tags = {
    Name = "MyVentionInstance"
  }
}

resource "aws_security_group" "my_sg" {
  name        = "my_security_group"
  description = "Allow inbound traffic on port 22, 80, and 8080"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "route53_zone" "my_vention_zone" {
  name = "venti-on.com"
}

