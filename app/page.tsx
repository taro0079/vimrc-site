import { User } from "@prisma/client";
import { PrismaClient } from ".prisma/client";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "./common/components";
// const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <div>
      <Text fontSize="4xl">Users</Text>
      <UserTable />
    </div>
  );
}

const UserTable = async () => {
  const user = await extractUser();
  console.log(user);
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>EMAIL</Th>
            <Th>VIMRC</Th>
          </Tr>
        </Thead>
        <Tbody>
          {user.map((u: User) => {
            return (
              <Tr key={u.id}>
                <Td>{u.id}</Td>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>{u.vimrc.id}</Td>
              </Tr>
            );
          })}
          <Tr></Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const extractVimrc = async (userId: number) => {
  const prisma = new PrismaClient();
  const vimrcs = await prisma.vimrc.findFirst({
    where: {
      userId: userId,
    },
  });
  return vimrcs;
};

const extractUser = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    include: {
      vimrc: true,
    },
  });
  return users;
};
