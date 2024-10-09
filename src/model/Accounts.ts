// export class Accounts {
//   id: string;
//   email: string;
//   fullName: string;
//   password: string;
//   phoneNumber: string;
//   role: string;
//   status: boolean;
//   username: string;

//   constructor(
//     id: string,
//     email: string,
//     fullName: string,
//     password: string,
//     phoneNumber: string,
//     role: string,
//     status: boolean,
//     username: string,
//   ) {
//     this.id = id;
//     this.email = email;
//     this.fullName = fullName;
//     this.password = password;
//     this.phoneNumber = phoneNumber;
//     this.role = role;
//     this.status = status;
//     this.username = username;
//   }

//   displayInfo(): void {
//     console.log(`ID: ${this.id}`);
//     console.log(`Email: ${this.email}`);
//     console.log(`Full Name: ${this.fullName}`);
//     console.log(`Phone Number: ${this.phoneNumber}`);
//     console.log(`Role: ${this.role}`);
//     console.log(`Username: ${this.username}`);
//   }
// }
export interface Accounts {
  id: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  status: boolean;
  username: string;
}
