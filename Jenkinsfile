void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: 'https://github.ic.ac.uk/mp5217/gamma'],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline  {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo "Checking out PR commit..."
            }
        }

	/*
        stage('Test') {
             steps {
               echo "Running model tests..."
               sh './test_application.sh'
             }
        }
	*/

        stage('Deploy') {
            when { branch 'master' }
            steps {
                echo "Deploying ..."
                sh 'heroku git:remote -a gamma-group26'
                sh 'git push heroku master'
            }
        }
    }

    post {
        success {
            setBuildStatus("Build success!", "SUCCESS");
        }

        failure {
            setBuildStatus("Build failure!", "FAILURE");
       }
    }
}


