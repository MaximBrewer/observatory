import React from "react";
import CompanyForm from "./CompanyForm";


export default function CompanyAdd(props) {
    const { user, updateUser } = props;

    return (
        <CompanyForm updateUser={updateUser} company={user.company}/>
    );
}
