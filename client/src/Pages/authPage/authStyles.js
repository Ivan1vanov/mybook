import { makeStyles } from "@material-ui/core";

export default makeStyles({
    middleContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        marginTop: '45px',
        width: '50%',
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    inputType: {
        width: '70%',
        margin: '10px auto'
    },
    buttonAuth: {
        backgroundColor: 'rgb(77, 184, 255)',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        width: '50%',
        margin: '20px auto',
        padding: '10px'
    },
    passwordWraper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        width: '70%'
    },
    allSeeingEye: {
        padding: '10px',
        height: '100%'
    }
})