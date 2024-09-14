import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
import "./polyfill";

/*
a Query - used to fetch data, generally does not change any data
a Mutation - used to send data, often for create/update/delete purposes
a Subscription - you might not need this, and we have dedicated documentation
*/

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

function getRandomuser(users: IUser[]) {
  const max = users.length;
  const random = Math.floor(Math.random() * max);
  const userTarget = users.find((v:IUser) => v.id == random)
  
  return userTarget || {name: 'Client 0', cutHair: false, cutBeard: false, cutMustache: false, id: 0};
}

async function main() {
  const users: IUser[] = [
    {
      name: "Client 1",
      cutHair: false,
      cutBeard: false,
      cutMustache: false,
      id: 1,
    },
    {
      name: "Client 2",
      cutHair: false,
      cutBeard: false,
      cutMustache: false,
      id: 2,
    },
    {
      name: "Client 3",
      cutHair: false,
      cutBeard: false,
      cutMustache: false,
      id: 3,
    },
    {
      name: "Client 4",
      cutHair: false,
      cutBeard: false,
      cutMustache: false,
      id: 4,
    },
    {
      name: "Client 5",
      cutHair: false,
      cutBeard: false,
      cutMustache: false,
      id: 5,
    },
  ];

  const getHairCut = await trpc.cutHair.query(getRandomuser(users));

}

main().catch(console.error);
