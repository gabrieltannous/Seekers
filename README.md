# Seekers

To run this project, install Node.js from https://nodejs.org/en/.

Details of this project:
- Angular CLI: 6.0.8
- Node: 8.11.3
- Angular: 6.1.3

# Developers:

1- Manasa Chada 12847214

2- Devi Alekapatti Nandagopal 12773661

3- Gabriel Tannous 13123043

4- Huy Nguyen 13100514


## How to run the app

To run this app, using a command promt navigate inside the app folder and run 'ng s -o'.

## Documenting Key Principles

* Use dashes to separate words. For example 'user-login', 'company-register'.
* All components related to users must be generated inside 'users' folder, same for companies and services.
* Use NgForm instead of FormGroup when posting data because NgForm will get automatically attached to any tags you have in your view.
* Given it is still in the development phase, console.log must of the results and mainly the errors.
* All class names must start with capital letters.
* Maximum lines of code is 500 per file.
* Variable name must not exceed 15 characters.
* Separate functions with an empty line.
* Refactor your code as much as you can until you use the least number of lines possible.
* Never initialize a firebase instance outside the firebase service.
* This is the main colour of the app rgb(12, 97, 33).
* Write documentation over each function, and if necessarily over each line of code that is confusing.
* Use bootstrap classes.
* All authentication functions must be placed in /services/auth.service.ts, and all database functions must be placed in /services/firebase.service.ts.
* Never write same code twice.
* All classes must be placed in the modules folder.
