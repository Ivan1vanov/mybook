import { makeStyles } from "@material-ui/core";

export default makeStyles({
    textAreaInput: {
        border: '1px solid rgb(77, 184, 255)',
        minHeight: '100px',
        minWidth: '300px',
        marginLeft: 'auto'
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        maxWidth: '600px',
        minWidth: '500px'
    },
    input: {
        margin: '10px 0'
    }
})