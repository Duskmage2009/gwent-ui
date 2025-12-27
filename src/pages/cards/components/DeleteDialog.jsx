import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useIntl } from 'react-intl';

function DeleteDialog({
                          open,
                          onClose,
                          onConfirm,
                          card,
                          isDeleting,
                          error,
                      }) {
    const intl = useIntl();

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Dialog open={open} onClose={!isDeleting ? onClose : undefined}>
            <DialogTitle>
                {intl.formatMessage({ id: 'cards.delete.title' })}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {intl.formatMessage({ id: 'cards.delete.message' })}
                </DialogContentText>

                {card && (
                    <DialogContentText sx={{ mt: 2, fontWeight: 'bold' }}>
                        {card.name}
                    </DialogContentText>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {intl.formatMessage({ id: 'cards.delete.error' })}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={isDeleting}>
                    {intl.formatMessage({ id: 'cards.delete.cancel' })}
                </Button>
                <Button
                    onClick={handleConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                    startIcon={isDeleting ? <CircularProgress size={20} /> : null}
                >
                    {intl.formatMessage({ id: 'cards.delete.confirm' })}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;