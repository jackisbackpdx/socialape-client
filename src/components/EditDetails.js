import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';

// Redux stuff

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

// Mui

import MyButton from '../util/MyButton'

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: 'right',
  }
})

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

  componentDidMount() {
    const { credentials } = this.props;
    this.setUserDetailsToState(credentials);
  }

  setUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.setUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props;

    return (
      <Fragment>
        <MyButton tip='Edit Details' onClick={this.handleOpen} placement='top' btnClassName={classes.button}>
          <EditIcon color='primary'/>
        </MyButton>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                placeholder='A short bio about yourself'
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="website"
                type="text"
                label="Website"            
                placeholder='Your personal/professional website'
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder='Where you live'
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                  Cancel
              </Button>
              <Button onClick={this.handleSubmit} color='primary'>
                  Submit
              </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails)
);
