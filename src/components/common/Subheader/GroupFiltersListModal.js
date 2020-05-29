import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    dialogPaper: {
        position: 'relative',
        minWidth: '250px',
        minHeight: '200px',
        maxHeight: '80vh',
    },
    dialogContentLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContent: {
        padding: '0px 24px'
    },
    chip: {
        margin: '5px 0px',
    },
    cancelButton: {
        margin: '10px auto',
    }
}

class GroupFiltersListModal extends PureComponent {

    state = {
        groupIdFiltersForDelete: null,
    }

    componentDidMount() {
        this.props.getGroupFiltersList();
    }

    onGroupDelete = (groupId) => this.setState({ groupIdFiltersForDelete: groupId });
    
    onCloseGroupDelete = () => this.setState({ groupIdFiltersForDelete: null });

    submitGroupDelete = () => {
        const { groupIdFiltersForDelete } = this.state;
        const { deleteGroupFilter } = this.props;
        deleteGroupFilter(groupIdFiltersForDelete);
        this.onCloseGroupDelete();
    }

    renderModalContent = () => {
        const { classes, groupFiltersList, isLoadGroupFiltersList, setGroupFilters, submitFilter } = this.props;
        if(isLoadGroupFiltersList) return <CircularProgress />
        return (
            <div className='wrap-group-fliters-list'>
                {
                    groupFiltersList.map(group => {
                        return (
                            <Chip 
                                color='primary'
                                key={group.id}
                                label={group.name}
                                onDelete={() => this.onGroupDelete(group.id)}
                                onClick={() => setGroupFilters(group.id, submitFilter)}
                                classes={{ root: classes.chip }}
                            />
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const { classes, isOpenGroupFiltersModal, toggleGroupFiltersListModal, isLoadGroupFiltersList } = this.props;
        const { groupIdFiltersForDelete } = this.state;
        return (
            <Dialog
                open={isOpenGroupFiltersModal}
                onClose={toggleGroupFiltersListModal}
                classes={{ root: 'dialog-alert', paper: classes.dialogPaper }}
            >
                <DialogTitle><b>Mes requêtes</b></DialogTitle>
                <DialogContent
                    classes={{ root: isLoadGroupFiltersList ? classes.dialogContentLoader : classes.dialogContent }}
                >
                    {this.renderModalContent()}
                </DialogContent>
                <Button 
                    onClick={toggleGroupFiltersListModal}
                    className='blue-buttton'
                    classes={{ root: classes.cancelButton }}
                >
                    FERMER
                </Button>
                {
                    groupIdFiltersForDelete &&
                        <div className='transparent-wrap-group-fliters-list'>
                            <b className='title'>Êtes-vous sûr de vouloir supprimer cette requête ?</b>
                            <div className='wrap-group-fliters-list-buttons'>
                                <Button 
                                    onClick={this.onCloseGroupDelete} 
                                    classes={{ root: 'blue-buttton'}}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    onClick={this.submitGroupDelete} 
                                    classes={{ root: 'blue-buttton'}}
                                >
                                    Ok
                                </Button>
                            </div>
                        </div>
                }
            </Dialog>
        );
    }
}

export default withStyles(styles)(GroupFiltersListModal);