type Barber = { id: string; name: string };
interface IUser {
    name: string;
    cutHair: boolean;
    cutBeard: boolean;
    cutMustache: boolean;
    id: number;
  }

// Imaginary database
const Barber: Barber = { id: '1', name: '' };

export const db = {

  Barber: {
    cutHair: async (client: IUser) => {
        return {...client, cutHair: true};
    },
    cutBeard: async (client: IUser) => {
        return {...client, cutBeard: true};
    },
    cutMustache: async (client: IUser) => {
        return {...client, cutMustache: true};
    },
  },
};
