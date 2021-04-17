const ADD_NAME = 'ADD_NAME';
const CHANGE_VALUE = 'CHANGE_VALUE';
const DELETE_USER = 'DELETE_USER';
const CHANGE_USER = 'CHANGE_USER';
const COPY_USER = 'COPY_USER';
const ADD_ARCHIVE = 'ADD_ARCHIVE';
const RESTORE_ARCHIVE = 'RESTORE_ARCHIVE';
const LOGGED_IN1 = 'LOGGED_IN1';



export function addName() {
    return {
        type: ADD_NAME
    }
}


export function changeValue(value) {
    return {
        type: CHANGE_VALUE,
        payload: {
            value
        }
    }
}

export function deleteUser(id) {
    return {
        type: DELETE_USER,
        payload: {
            id
        }
    }
}

export function changeUser(id, name) {

    return {
        type: CHANGE_USER,
        payload: {
            id, name
        }
    }
}

export function copyUser(id) {
    return {
        type: COPY_USER,
        payload: {
            id
        }
    }
}

export function addArchive(id) {
    return {
        type: ADD_ARCHIVE,
        payload: {
            id
        }
    }
}

export function restoreArchive(id) {
    return {
        type: RESTORE_ARCHIVE,
        payload: {
            id
        }
    }
}

export function LoggedIn(message) {
    return {
        type: LOGGED_IN1,
        payload: {
            message
        }
    }
}
