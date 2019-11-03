###############################################
###               Variables                 ###
###############################################
variable "otus-frontend-dockerfile" {
  default = "."  
}

variable "otus-frontend-name" {
  default = "otus-frontend"  
}

variable "otus-frontend-source" {
  default = "source"  
}

variable "otus-frontend-cleanup" {
  default = "rm -rf dist node_modules package-lock.json"  
}

variable "otus-frontend-npminstall" {
  default = "npm install"  
}

variable "otus-frontend-npmtest" {
  default = "npm test"  
}

variable "otus-frontend-npmbuild" {
  default = "npm run build"  
}

variable "otus-frontend-npmprune" {
  default = "npm prune --production"  
}
###############################################
###  OTUS : Build Image Front-End           ###
###############################################
resource "null_resource" "otus-frontend-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.otus-frontend-source}"
    command = "${var.otus-frontend-cleanup}"
  }
} 

resource "null_resource" "otus-frontend-install" {
depends_on = [null_resource.otus-frontend-cleanup]  
  provisioner "local-exec" {
    working_dir = "${var.otus-frontend-source}"
    command = "${var.otus-frontend-npminstall}"
  }
} 

resource "null_resource" "otus-frontend-test" {
depends_on = [null_resource.otus-frontend-install]  
  provisioner "local-exec" {
    working_dir = "${var.otus-frontend-source}"
    command = "${var.otus-frontend-npmtest}"
  }
} 

resource "null_resource" "otus-frontend-build" {
depends_on = [null_resource.otus-frontend-test]  
  provisioner "local-exec" {
    working_dir = "${var.otus-frontend-source}"
    command = "${var.otus-frontend-npmbuild}"
  }
} 

resource "null_resource" "otus-frontend-prune" {
depends_on = [null_resource.otus-frontend-build]  
  provisioner "local-exec" {
    working_dir = "${var.otus-frontend-source}"
    command = "${var.otus-frontend-npmprune}"
  }
} 
 
resource "null_resource" "otus-frontend" {
depends_on = [null_resource.otus-frontend-prune]  
  provisioner "local-exec" {
    command = "docker build -t ${var.otus-frontend-name} ${var.otus-frontend-dockerfile}"
  }
}
