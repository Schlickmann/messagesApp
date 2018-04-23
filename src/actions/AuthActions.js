export const modifyEmail = (text) => ({
        type: 'modify_email',
        payload: text
    });

export const modifyPassword = (text) => ({
    type: 'modify_password',
    payload: text
});

export const modifyName = (text) => ({
    type: 'modify_name',
    payload: text
});
