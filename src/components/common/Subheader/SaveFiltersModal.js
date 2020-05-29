import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    dialogPaper: {
        width: '350px'
    }
}

const SaveFiltersModal = ({ classes, isOpenSaveFiltersModal, toggleSaveFiltersModal, sendGroupFilters }) => {
    return (
        <Dialog
            open={isOpenSaveFiltersModal}
            onClose={toggleSaveFiltersModal}
            classes={{ root: 'dialog-alert', paper: classes.dialogPaper }}
        >
            <DialogTitle><b>Enregistrer ma requête</b></DialogTitle>
            <DialogContent>
                <form onSubmit={sendGroupFilters}> 
                    <FormControl fullWidth>
                        <TextField
                            label='Nom'
                            name='filter_name'
                            required
                        />
                    </FormControl>
                    <DialogActions>
                        <Button 
                            onClick={toggleSaveFiltersModal} 
                            classes={{ root: 'blue-buttton' }}
                        >
                            Annuler
                        </Button>
                        <Button 
                            type='submit' 
                            classes={{ root: 'blue-buttton' }}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default withStyles(styles)(SaveFiltersModal);