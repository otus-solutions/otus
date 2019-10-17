###############################################
###               Variables                 ###
###############################################

variable "otus-frontend" {
  type = "map"
  default = {
    "name" = "otus-frontend"
    "directory" = "otus"
    "source" = "/source"
  }
}

###############################################
###  OTUS : Build Image Front-End           ###
###############################################

resource "null_resource" "otus-frontend" {
  provisioner "local-exec" {
    command = "cd ${var.otus-frontend["directory"]}/${var.otus-frontend["source"]} && npm install"
  }
  provisioner "local-exec" {
    command = "sudo docker build -t ${var.otus-frontend["name"]} ${var.otus-frontend["directory"]}"
  }
}