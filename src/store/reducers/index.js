import {act} from "@testing-library/react";

const initialState = {
    names: localStorage.getItem("names") ? JSON.parse(localStorage.getItem("names")) : [],
    currentName: '',
    archive: localStorage.getItem("archive") ? JSON.parse(localStorage.getItem("archive")) : [],
    login: false
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_COLOR' : {
            return {
                color: action.payload.color
            }
        }

        case 'DELETE_COLOR': {
            let obj = {...state};
            delete obj["color"];

            return obj;
        }

        case 'ADD_NAME': {
            let names = [...state.names, {
                id: state.names[state.names.length - 1] ? state.names[state.names.length - 1].id + 1 : 0,
                name: state.currentName.trim()
            }];

            localStorage.setItem("names", JSON.stringify(names))

            return {
                ...state,
                names,
                currentName: ''
            };
        }

        case 'CHANGE_VALUE': {

            return {
                ...state,
                currentName: action.payload.value
            };
        }

        case 'DELETE_USER': {
            let names = [...state.names.filter(item => item.id != action.payload.id)];

            localStorage.setItem('names', JSON.stringify(names));

            return {
                ...state,
                names
            };
        }

        case 'CHANGE_USER': {
            let names = [...state.names.map(item => {
                if (item.id == action.payload.id) {
                    item.name = action.payload.name
                }
                return item;
            })]

            localStorage.setItem('names', JSON.stringify(names));

            return {
                ...state,
                names
            };
        }

        case 'COPY_USER': {

            let newUser = {};

            state.names.map(item => {
                if (item.id == action.payload.id) {
                    let lastUserId = state.names[state.names.length - 1].id;
                    newUser.id = lastUserId + 1;
                    newUser.name = item.name;
                }
            })

            let names = [...state.names, newUser];

            localStorage.setItem('names', JSON.stringify(names));

            return {
                ...state,
                names,
            };
        }

        case 'ADD_ARCHIVE': {
            let archiveUser = {}
            state.names.map(item => {
                if (item.id == action.payload.id) {
                    archiveUser.id = item.id;
                    archiveUser.name = item.name;
                }
            })

            let archive = [...state.archive, archiveUser];
            let names = [...state.names.filter(item => item.id != action.payload.id)];

            localStorage.setItem('archive', JSON.stringify(archive))
            localStorage.setItem('names', JSON.stringify(names))

            return {
                ...state,
                archive,
                names
            }
        }

        case 'RESTORE_ARCHIVE': {
            let obj = {}

            let archive = [...state.archive.filter(item => {
                if (item.id == action.payload.id) {
                    obj.id = item.id;
                    obj.name = item.name

                    return false
                }
                return true
            })]

            let names = [...state.names, obj];

            localStorage.setItem('archive', JSON.stringify(archive));
            localStorage.setItem('names', JSON.stringify(names));

            return {
                ...state,
                names,
                archive
            }
        }

        case 'LOGGED_IN1': {
            return {
                ...state,
                login: action.payload.message
            };
        }

        default: {
            return state;
        }
            ;
    }
}