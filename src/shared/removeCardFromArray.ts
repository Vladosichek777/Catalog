type RemoveCardFromArrayType = <T extends {id: string}>(arr: T[], id: string) => T[];

export const removeCardFromArray: RemoveCardFromArrayType = (arr, id) => {
    const filteredArr = arr.filter((card) => card.id !== id);
    return filteredArr;
};
