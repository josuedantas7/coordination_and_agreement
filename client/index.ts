import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
import "./polyfill";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

export interface IUser {
  name: string;
  cutHair: boolean;
  cutBeard: boolean;
  cutMustache: boolean;
  id: number;
}

function getRandomUser(users: IUser[]) {
  const max = users.length;
  const random = Math.floor(Math.random() * max);
  const userTarget = users[random];
  return userTarget || {name: 'Client 0', cutHair: false, cutBeard: false, cutMustache: false, id: 0};
}

async function main() {
  const users: IUser[] = [
    { name: "Client 1", cutHair: false, cutBeard: false, cutMustache: false, id: 1 },
    { name: "Client 2", cutHair: false, cutBeard: false, cutMustache: false, id: 2 },
    { name: "Client 3", cutHair: false, cutBeard: false, cutMustache: false, id: 3 },
    { name: "Client 4", cutHair: false, cutBeard: false, cutMustache: false, id: 4 },
    { name: "Client 5", cutHair: false, cutBeard: false, cutMustache: false, id: 5 },
  ];

  for (let i = 0; i < 20; i++) {
    const user = getRandomUser(users);

    const hairCut = await trpc.cutHair.mutate(user);
    console.log(hairCut.message);

    const beardCut = await trpc.cutBeard.mutate(user);
    console.log(beardCut.message);

    const mustacheCut = await trpc.cutMustache.mutate(user);
    console.log(mustacheCut.message);
  }
}

main().catch(console.error);
