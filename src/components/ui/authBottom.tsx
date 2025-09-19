// import { signIn, signOut, useSession } from "next-auth/react";

// export default function AuthButtons() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {!session ? (
//         <>
//           <button onClick={() => signIn("google")}>Sign in with Google</button>
//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const email = e.target.email.value;
//               const password = e.target.password.value;
//               await signIn('credentials', { email, password });
//             }}
//           >
//             <input name="email" type="email" placeholder="Email" required />
//             <input name="password" type="password" placeholder="Password" required />
//             <button type="submit">Sign in</button>
//           </form>
//         </>
//       ) : (
//         <>
//           <p>Signed in as {session.user?.email}</p>
//           <button onClick={() => signOut()}>Sign out</button>
//         </>
//       )}
//     </div>
//   );
// }
