// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type ReqBody = {
  name?: string;
  email?: string;
  password?: string;
  [key: string]: any;
};

export async function POST(req: Request) {
  try {
    const body: ReqBody = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email or password." },
        { status: 400 }
      );
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set displayName in Firebase Auth profile
    await updateProfile(user, { displayName: name });

    // Ensure Firestore write goes to the correct path
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        email: user.email,
        name,
        createdAt: serverTimestamp(),
        userType: body.userType || "user",
        ...(body.dob ? { dob: body.dob } : {}),
        ...(body.mobileNumber ? { mobileNumber: body.mobileNumber } : {}),
        ...(body.profilePic ? { profilePic: body.profilePic } : {}),
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      user: { id: user.uid, email: user.email, name },
    });
  } catch (err: any) {
    console.error("Register error:", err);

    let message = "Registration failed. Please try again.";
    if (err?.code === "auth/email-already-in-use") message = "Email already in use.";
    else if (err?.code === "auth/weak-password") message = "Password is too weak.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
