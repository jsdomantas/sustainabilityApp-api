import recombeeClient from "../configs/recombee.config";
import { requests } from 'recombee-api-client';

export const createUser = async (firebaseAuthId: string) => {
    await recombeeClient.send(new requests.AddUser(firebaseAuthId));
};

export const addDetailViewInteraction = async (firebaseAuthId: string | undefined, productIds: number[]) => {
    if (!firebaseAuthId || productIds.length === 0) return;

    const productRequests = productIds.map(pId => new requests.AddDetailView(firebaseAuthId, `product-${pId}`));
    console.log(productIds);

    await recombeeClient.send(new requests.Batch(productRequests));
}