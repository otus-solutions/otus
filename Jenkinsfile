pipeline {
  agent any
  tools {
  maven 'maven 3.5.0'
  jdk 'Java8'
  nodejs 'node 8.4.0'
  }

  stages{
    stage('Build') {
      steps{
        // sh "git show -s --pretty=%an | perl -ne 'print \"GIT-COMMIT-USER=$_\"' >> $WORKSPACE/env.properties"
        // sh "echo '' >> $WORKSPACE/env.properties"
        sh "rm -rf otus/node_modules/"
        sh "npm install --prefix otus/"
        sh "npm run test --prefix otus/"
        sh "mvn -f otus/pom.xml exec:exec@npm-replace-env -Dapi.url='${api}'"
        sh "npm run build --prefix otus/"
      }
    }

    stage('Publish Nexus') {
      steps {
        sh "npm publish otus/ --registry ${repository_npm}"
      }
    }

    stage('Update Docs') {
      steps {
        sh "npm run gulp sonar --sonarUrl='${URL_SONAR}' --sonarDatabaseUsername='${USER_SONAR}' --sonarDatabasePassword='${PWD_SONAR}' --prefix otus/"
      }
    }

    stage('Deploy') {
      steps {
        // sh "npm prune --production --prefix otus/"
        // sh "mvn -f otus/pom.xml antrun:run@static-deploy -Dscp.user='${SERVER_USER}' -Dscp.host='${SERVER_HOST}' -Dscp.target='${SERVER_TARGET}' -Dscp.password='${SERVER_PWD}'"
        echo 'Deploy'
      }
    }
  }
}
