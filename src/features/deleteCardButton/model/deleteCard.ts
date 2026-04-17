export function deleteCard(id: string | null, deleteCard: (id: string) => void) {
    if (id !== null) {
        deleteCard(id);
    }
}
