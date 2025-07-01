pipeline {
  agent any

  environment {
    AWS_REGION = 'us-east-1'
    ECR_FRONTEND_REPO = '248189943460.dkr.ecr.us-east-1.amazonaws.com/frontend'
    ECR_BACKEND_REPO  = '248189943460.dkr.ecr.us-east-1.amazonaws.com/backend'
    IMAGE_TAG = "${BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Authenticate to ECR') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'AWS_CREDENTIAL', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh '''
          aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
          aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
          aws configure set default.region $AWS_REGION

          aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_FRONTEND_REPO
          aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_BACKEND_REPO
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          sh '''
          docker build -t $ECR_FRONTEND_REPO:$IMAGE_TAG .
          docker push $ECR_FRONTEND_REPO:$IMAGE_TAG
          '''
        }
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('backend') {
          sh '''
          docker build -t $ECR_BACKEND_REPO:$IMAGE_TAG .
          docker push $ECR_BACKEND_REPO:$IMAGE_TAG
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build and deployment pipeline completed"
    }
    failure {
      echo "❌ Something failed in the pipeline"
    }
  }
}
