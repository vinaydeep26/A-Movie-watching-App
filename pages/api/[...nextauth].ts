import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismadb';
import { compare } from 'bcrypt';

export default NextAuth ({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
            password: {
                label: 'Password',
                type: 'password',
            }
            },
            async authorize(credentials) {
            if (!credentials?.email || !credentials?.password ) {
                throw new Error("EMAIL and PASSWORD REQUIRED");
            }

            const user = await prismadb.user.findUnique({
                where: {
                    email: credentials.email
                }
            });
            if (!user || !user.hashedPassword) {
                throw new Error('Email does not exist');
              }
              const isCorrectPassword = await compare(credentials.password, user.hashedPassword);


              
            }
        })
    ]
})