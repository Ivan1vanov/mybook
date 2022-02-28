import {makeStyles} from '@material-ui/core'

export default makeStyles({
    navbarWrapper: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #c3c3c3'
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        // padding: '15px 0',
    },
    homeIcon: {
        width: '50px',
    },

    active: {
        color: 'rgb(77, 184, 255)',
        padding: '10px 5px',
        borderBottom: '2px solid rgb(77, 184, 255)'
    },

    navLink: {
        padding: '10px 5px',
        color: '#000',
        cursor: 'pointer'
    }
})