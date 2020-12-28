// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// export function CreateUser() {
//   const [newuser, setNewuser] = useState({
//     firstname: "",
//     lastname: "",
//     id: "1",
//   });

//   const handleChanges = (event) => {
//     setNewuser({ ...newuser, [event.target.name]: event.target.value });
//   };

//   const submitForm = async function submitForm(event) {
//     event.preventDefault();
//     //@TODO:  send newuser to database
//     console.log("New User: ", newuser);
//     await post(newuser);
//     setNewuser({
//       id: "",
//       firstname: "",
//       lastname: "",
//     });
//   };

//   const post = (data) => {
//     axios
//       .post(
//         "https://34vf1cc5td.execute-api.us-east-1.amazonaws.com/test/user",
//         { data }
//       )
//       .then(function (response) {
//         console.log(response, " response in axios.then");
//       });
//   };

//   return (
//     <div className="CreateUser">
//       <h1>Create another User:</h1>
//       <form onSubmit={submitForm}>
//       <label htmlFor="id">
//           ID:
//           <input
//             type="text"
//             name="id"
//             value={newuser.id}
//             onChange={handleChanges}
//           />
//         </label>
//         <label htmlFor="firstname">
//           First Name:
//           <input
//             type="text"
//             name="firstname"
//             value={newuser.firstname}
//             onChange={handleChanges}
//           />
//         </label>
//         <label htmlFor="lastname">
//           Last Name:
//           <input
//             type="text"
//             name="lastname"
//             value={newuser.lastname}
//             onChange={handleChanges}
//           />
//         </label>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }
