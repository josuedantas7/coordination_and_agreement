import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { db } from './db';
import { publicProcedure, router } from './trpc';

const inputType = z.object({
    name: z.string(),
    cutHair: z.boolean(),
    cutBeard: z.boolean(),
    cutMustache: z.boolean(),
    id: z.number(),
});

let isOccupied = false;

async function acquireLock() {
    while (isOccupied) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    isOccupied = true;
}

function releaseLock() {
    isOccupied = false;
}

const appRouter = router({
  cutHair: publicProcedure.input(inputType).mutation(async (opts) => {
    const { input } = opts;
    await acquireLock();
    console.log(`${input.name} está cortando o cabelo...`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const updatedClient = await db.Barber.cutHair(input);
    releaseLock();
    return { success: true, message: `${input.name} cortou o cabelo.`, client: updatedClient };
  }),
  
  cutBeard: publicProcedure.input(inputType).mutation(async (opts) => {
    const { input } = opts;
    await acquireLock();
    console.log(`${input.name} está cortando a barba...`);
    await new Promise(resolve => setTimeout(resolve, 4000));
    const updatedClient = await db.Barber.cutBeard(input);
    releaseLock();
    return { success: true, message: `${input.name} cortou a barba.`, client: updatedClient };
  }),
  
  cutMustache: publicProcedure.input(inputType).mutation(async (opts) => {
    const { input } = opts;
    await acquireLock();
    console.log(`${input.name} está cortando o bigode...`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    const updatedClient = await db.Barber.cutMustache(input);
    releaseLock();
    return { success: true, message: `${input.name} cortou o bigode.`, client: updatedClient };
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
