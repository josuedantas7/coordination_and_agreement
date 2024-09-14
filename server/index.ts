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
const appRouter = router({
  cutHair: publicProcedure.input(inputType).query(async (opts) => {
    const { input } = opts;
    const cutHair = await db.Barber.cutHair(input);

    return cutHair;
  }),
  cutBeard: publicProcedure.input(z.string()).query(async (opts) => {
    // const { input } = opts;
    // //      ^?
    // // Retrieve the user with the given ID
    // const user = await db.user.findById(input);
    // return user;
  }),
  cutMustache: publicProcedure.input(z.string()).query(async (opts) => {
//     const { input } = opts;
//     //      ^?
//     // Retrieve the user with the given ID
//     const user = await db.user.findById(input);
//     return user;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
