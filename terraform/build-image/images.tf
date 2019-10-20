###############################################
###               Variables                 ###
###############################################
variable "otus-frontend-name" {
  default = "otus-frontend"  
}

variable "otus-frontend-source" {
  default = "source"  
}

variable "otus-frontend-npmbuild" {
  default = "run build"  
}
###############################################
###  OTUS : Build Image Front-End           ###
###############################################
resource "null_resource" "otus-frontend-build" {
  provisioner "local-exec" {
    working_dir = "source"
    command = "npm ${var.otus-frontend-npmbuild}"
  }
} 
 
resource "null_resource" "otus-frontend" {
depends_on = [null_resource.otus-frontend-build]  
  provisioner "local-exec" {
    command = "docker build -t ${var.otus-frontend-name} ."
  }
}
