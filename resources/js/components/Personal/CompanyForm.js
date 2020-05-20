import React, { useState } from "react";
import {
    Button
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

export default function CompanyForm(props) {
    const { company } = props;
    
    const add = () => {};
    const update = () => {};
    const formChange = () => {};

    return (
        <React.Fragment>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="companyTitile"
                    value={company ? company.title : ''}
                    onChange={formChange}
                    label={__("Company")}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                {company ? (
                    <Button onClick={update} color="primary">
                        {__("Update")}
                    </Button>
                ) : (
                    <Button onClick={add} color="primary">
                        {__("Add")}
                    </Button>
                )}
            </DialogActions>
        </React.Fragment>
    );
}
