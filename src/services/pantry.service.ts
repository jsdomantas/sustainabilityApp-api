import { getUser } from "../utils";
import prismaClient from "../configs/prisma.config";

const getCustomer = async (firebaseAuthId: string | undefined) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const customer = await prismaClient.customer.findFirst({
        where: { userId: user.id },
    })

    if (!customer) return null;

    return customer;
}

export const getPantryItems = async (firebaseAuthId: string | undefined) => {
    const customer = await getCustomer(firebaseAuthId);

    if (!customer) return null;

    return await prismaClient.pantryItem.findMany({
        where: { customerId: customer.id },
        include: {
            ingredient: true,
        }
    })
};

export const createPantryItem = async (firebaseAuthId: string | undefined, item: any) => {
    const customer = await getCustomer(firebaseAuthId);

    if (!customer) return null;

    return await prismaClient.pantryItem.create({
        data: {
            expirationDate: item.expiration_date,
            photoUrl: item.photoUrl,
            pantryCategory: item.category,
            quantity: item.quantity,
            measurementUnits: item.units,
            customer: {
                connect: { id: customer.id },
            },
            ingredient: {
                connect: { id: item.product.value },
            }
        }
    })
};

export const deletePantryItem = async (itemId: number) => {
    return await prismaClient.pantryItem.delete({
        where: {
            id: itemId,
        }
    })
}