import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { User } from "@prisma/client";
import { PrismaClient } from ".prisma/client";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const user = await extractUser();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        {user.map((user: User) => {
          return (
            <tr key={user.id}>
              <td key={user.id}>{user.id}</td>
              <td key={user.id}>{user.name}</td>
              <td key={user.email}>{user.email}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

const extractUser = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
};
