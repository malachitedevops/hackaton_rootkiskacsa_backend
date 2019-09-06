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

		stage ('Dockerize Application') {
			when {
				branch 'master'
			}
			steps {
				sshagent(credentials: ['rootkiskacsa_ssh']) {
					sh 'ssh -o StrictHostKeyChecking=no ubuntu@3.87.38.201 uptime'
					sh 'ssh ubuntu@3.87.38.201 "bash /home/rootkiskacsa/dockerize_erste.sh"'
				}
			}
		}

  }
}   
