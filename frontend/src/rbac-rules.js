import {companies, cvs, panel, users} from "./rbac-consts"

const rules = {
    ROLE_USER: {
        static: [
            companies.USER,
            users.USER,
            cvs.USER
        ]
    },
    ROLE_ADMIN: {
        static: [
            companies.ADMIN,
            companies.USER,
            users.ADMIN,
            users.USER,
            cvs.ADMIN,
            cvs.USER,
            panel.ADMIN
        ]
    }
};

export default rules;