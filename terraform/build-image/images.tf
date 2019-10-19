###############################################
###               Variables                 ###
###############################################
variable "otus-frontend-name" {
  default = "otus-frontend"  
}

variable "otus-frontend-directory" {
  default = "otus"  
}

variable "otus-frontend-source" {
  default = "/source"  
}

variable "otus-frontend-npmbuild" {
  default = "install"  
}
###############################################
###  OTUS : Build Image Front-End           ###
###############################################

resource "null_resource" "otus-frontend-build" {
  provisioner "local-exec" {
    working_dir = "otus/source"
    command = "npm ${var.otus-frontend-npmbuild}"
  }
} 
 
resource "null_resource" "otus-frontend" {
depends_on = [null_resource.otus-frontend-build]  
  provisioner "local-exec" {
    working_dir = "otus"
    command = "docker build -t ${var.otus-frontend-name} ."
  }
}