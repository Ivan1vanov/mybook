import { makeStyles } from "@material-ui/core";
import { padding } from "@mui/system";

export default makeStyles({
    postContainer: {
        width: '500px',
        height: '500px'
    },
    cardMedia: {
        // paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
        height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '5px',
        position: 'relative',
        minWidth: '600px',
        margin: '10px 10px',
        padding: '10px'
      },
      userAvatar: {
        borderRadius: '100px', 
        maxWidth: '30px'
      },
      autorDetailt: {
          display: 'flex',
          alignItems: 'center'
      },
      buttonsActions: {
          display: 'flex',
      }
})