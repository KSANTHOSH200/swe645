pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        DOCKERHUB_USER  = "${DOCKERHUB_CREDS_USR}"
        DOCKERHUB_PASS  = "${DOCKERHUB_CREDS_PSW}"

        DOCKER_BACKEND_IMAGE  = "ksanthosh200/swe645-backend:latest"
        DOCKER_FRONTEND_IMAGE = "ksanthosh200/swe645-frontend:latest"

        // Backend NodePort (already working)
        REACT_APP_API_URL = "http://100.26.147.164:30081"

        // Kubeconfig path inside Jenkins container
        KUBECONFIG = "/root/.kube/config"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t ${DOCKER_BACKEND_IMAGE} .
                    '''
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker push ${DOCKER_BACKEND_IMAGE}
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build \
                      --build-arg REACT_APP_API_URL=${REACT_APP_API_URL} \
                      -t ${DOCKER_FRONTEND_IMAGE} .
                    '''
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker push ${DOCKER_FRONTEND_IMAGE}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                # Restart deployments so they pull the new :latest images
                kubectl --kubeconfig=$KUBECONFIG -n default rollout restart deployment/swe645-backend
                kubectl --kubeconfig=$KUBECONFIG -n default rollout restart deployment/swe645-frontend

                kubectl --kubeconfig=$KUBECONFIG -n default rollout status deployment/swe645-backend
                kubectl --kubeconfig=$KUBECONFIG -n default rollout status deployment/swe645-frontend
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
