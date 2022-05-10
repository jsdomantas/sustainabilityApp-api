import recombeeClient from "../configs/recombee.config";
import { requests } from 'recombee-api-client';

export const createUser = async (firebaseAuthId: string) => {
    await recombeeClient.send(new requests.AddUser(firebaseAuthId));
};

export const addDetailViewInteraction = async (firebaseAuthId: string | undefined, productIds: number[]) => {
    if (!firebaseAuthId || productIds.length === 0) return;

    const productRequests = productIds.map(pId => new requests.AddDetailView(firebaseAuthId, `product-${pId}`));

    await recombeeClient.send(new requests.Batch(productRequests));
}

export const getProductRecommendations = async (firebaseAuthId: string | undefined) => {
    if (!firebaseAuthId) return;

    return await recombeeClient.send(new requests.RecommendItemsToUser(firebaseAuthId, 10, { scenario: 'Product-recommendations'}));
}