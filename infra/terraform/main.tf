terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket       = "daily-quill-terraform-state"
    key          = "prod/terraform.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true
    profile      = "prac-dev"
  }
}

provider "aws" {
  region  = "ap-southeast-1"
  profile = "prac-dev"

  default_tags {
    tags = {
      Project     = "daily-quill"
      ManagedBy   = "terraform"
      Environment = "production"
    }
  }
}

locals {
  name = "daily-quill"
}


resource "aws_ecr_repository" "api_repo" {
  name                 = "${local.name}-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ssm_parameter" "ecr_repository_url" {
  name        = "/${local.name}/ecr-repository-url"
  description = "URL of the ECR repository for the API"
  type        = "String"
  value       = aws_ecr_repository.api_repo.repository_url
}

resource "aws_ssm_parameter" "ecr_repository_arn" {
  name        = "/${local.name}/ecr-repository-arn"
  description = "ARN of the ECR repository for the API"
  type        = "String"
  value       = aws_ecr_repository.api_repo.arn
}

output "ecr_repository_url" {
  value = aws_ecr_repository.api_repo.repository_url
}
