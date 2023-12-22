const ROOTS = {
    AUTH: '/auth',
    SHOW: '/',
};
export const paths = {
    auth: {
        login: `${ROOTS.AUTH}/login`,
        register: `${ROOTS.AUTH}/register`,
    },
    show: {
        root: ROOTS.SHOW,
        product: {
            root: `${ROOTS.SHOW}product`,
            new: `${ROOTS.SHOW}product/new`,
            edit: (id: string) => `${ROOTS.SHOW}product/${id}/edit`,
        },
    }
}