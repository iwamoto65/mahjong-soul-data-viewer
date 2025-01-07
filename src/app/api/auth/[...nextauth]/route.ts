import NextAuth from "next-auth";
import { authOptions } from "@/features/api/nextauth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
