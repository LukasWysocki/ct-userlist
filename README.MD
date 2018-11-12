# Solution to test assignment (simple backend rest service for user list)

This repository contains a REST backend service providing a list of users (name, surname) with mysql db backend (module `userlist-backend`). This service is exposed by angular (v. 7) frontend with a simple data table controll (PrimeNG) (module `userlist-frontend`).

As part of the solution module `userlist-vagrant` generates a Vagrant virtual machine (VM) description. During Vagrant run the solution is provisioned on the VM to be served on port 80 of the VM (exposed/forwarded on host machine at port 8080).

# Build

NOTE:
The full build (including VM) was tested on ubuntu, jdk 8, Vagrant using VirtualBox as provider.

Project uses maven as build tool and requires java 8 as minimal version.
To prepare the virtualBox VM, a functioning installation of Vagrant is required.

Build process assumes proper maven, java jdk (at least version 8), Vagrant, and VirtualBox installations.

To build the services:
* open terminal and change directory to project root directory
* execute `mvn clean install`

After successful build you can build a VM serving the solution:
* in terminal go to `userlist-vagrant/target/userlist-vagrant-...` subdirectory
* execute `vagrant up` 

NOTE: A `mvn` build might remove the `target` directory or change it's contants. To avoid this you can can unpack the file `userlist-vagrant/target/userlist-vagrant-...zip` to any other directory and execute `vagrant up` there. 

NOTE: that `vagrant up` process will take a long time. Taht is, due to debian box download process and provisioning process. Provisioning process includes updates and installing of additional software (docker, docker-compose). 

NOTE: In case of vagrant issues the built VirtualBox VM is also available [here](https://www.dropbox.com/s/lbuvgn59f2299cw/userlist-vagrant-001-SNAPSHOT-full_default_1542020806919_88529.zip?dl=0). It uses default vagrant user/pass settings. That is user: `vagrant` pass: `vagrant`, the root password is also `vagrant`, however `sudo` is configured to work without a password. Note that if port 8080 is already in use on host machine you will have to reconfigure the networking settings of this VM.

# Run

If the last step of build process (`vagrant up`) is successful the result is a virtualBox VM running in the background.
This VM (visiblae as `userlist-vagrant-...` in VirtualBox manager) is configured to forward port 8080 on host machine to VMs nginx server serving the web frontend user list application.

NOTE: If port 8080 is in use on host machine Vagrant tries to assign a different port.

To test the solution, on host machine start a browser and enter the address: `localhost:8080`.
This should result in a view displaying a list of users.
If view is empty that might mean that the underlying services (backend and/or mysql db) have not yet started. Wait up to a minute and try again.

# Design Choices
 
Most (if not all) design choices where driven by desire to minimise the time required for solving the test assignment.
 
* Provided code is targeted as minimal functioning solution that fullfils the requested functionality. That is, expose a users table(name, surname) through a REST service (implementing at minimum GET method) using ANY technology stack. In this case a Spring Data REST framework was used to minimise time required for solution.

* Frontend was built based on Angular as that is what I'm recently using daily, hence also minimises time required for solution.

* Delivering the VM with nginx serving the solution was part of assignment. To minimise the manual work during testing and have the process easly repeatable it was automated using Vagrant, docker, and docker-compose. Using docker-compose allowed for easy testing without the VM and for repetable builds (using ubuntu locally, test assignment requires VM with debian).
 
# Assessing the backend code quality

As the backend service is using Spring Data REST there is minimal code required to fulfill the assignment requirements.
Hence there is practicaly no code to review and asses quality.

For larger code sample I recommend taking a look at another repo of mine: [solution to High5Games test assignment](https://github.com/LukasWysocki/h5g-bowling-lwy). This code is a solution to a test assignment done recently as part of interview process for High5Games.
 