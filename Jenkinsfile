pipeline {
  agent any

  options {
    disableResume()
  }

  environment {
    AWS_REGION = 'us-east-1'
    ECR_FRONTEND_REPO = '248189943460.dkr.ecr.us-east-1.amazonaws.com/frontend'
    ECR_BACKEND_REPO  = '248189943460.dkr.ecr.us-east-1.amazonaws.com/backend'
    TIMESTAMP = "${new Date().format('yyyyMMddHHmmss')}"
    IMAGE_TAG = "${env.BUILD_NUMBER}-${env.TIMESTAMP}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Authenticate to ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credential']]) {
          sh '''
            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_FRONTEND_REPO
            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_BACKEND_REPO
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('trythat_frontend') {
          sh '''
            docker build -t $ECR_FRONTEND_REPO:$IMAGE_TAG .
            docker push $ECR_FRONTEND_REPO:$IMAGE_TAG
          '''
        }
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('trythat_backend') {
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
      echo "✅ Build and deployment pipeline completed. Image tag: ${env.IMAGE_TAG}"
    }
    failure {
      echo "❌ Something failed in the pipeline"
    }
  }
}
