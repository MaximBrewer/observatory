import React from "react";
import CompanyForm from "./CompanyForm";


export default function CompanyAdd(props) {
    const { updateUser } = props;

    return (
        <CompanyForm updateUser={updateUser} company={null}/>
    );
}
