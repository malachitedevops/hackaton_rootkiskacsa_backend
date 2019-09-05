pipeline {
	
	environment {
		registry = "ncrmns/erstebackend"
		registryCredential = 'dockerhubncrmns'
		dockerImage = ''
	}
	
	agent any

	stages {
	
		stage ('Checkout SCM') {
			when {
				branch 'master'
			}
			steps {
				checkout scm
			}
		}
        
        stage ('Build Docker Image') {
			when {
				branch 'master'
			}
			steps {
				script {
					dockerImage = docker.build registry + ":$BUILD_NUMBER"
				}
			}
		}
        
        stage ('Push to Dockerhub') {
			when {
				branch 'master'
			}
			steps {
				script {
					docker.withRegistry('', registryCredential) {
						dockerImage.push('latest')
					}
				}
			}
		}
    }
}   
