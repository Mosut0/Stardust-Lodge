import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../../components/navbar/Navbar';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 600,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  socialIcons: {
    marginTop: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const ContactUs = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [fieldError, setFieldError] = React.useState({
        name: false,
        email: false,
        message: false, 
    });

    const [contactField, setContactField] = React.useState({
        name: "",
        email: "",
        message: "",
      });

    const [contactSuccess, setContactSuccess] = React.useState(false);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setContactField((prev) => ({ ...prev, [id]: value }));
        setFieldError((prev) => ({ ...prev, [id]: false }));
      };

    const handleSubmit = () => {

        const hasEmptyFields = Object.values(contactField).some((val) => !val);

        if (hasEmptyFields) {
            const updatedFieldError = {};
            for (const key in contactField) {
              updatedFieldError[key] = !contactField[key];
            }
            setContactSuccess(false);
            setFieldError(updatedFieldError);
            return; 
        }

        setContactSuccess(true);
    }

  return (
    <>
    <Navbar/>
    <div className={classes.container}>
      <h2>{t("contact.contact")}</h2>
      <form>
        <TextField
          className={classes.formField}
          label={t("contact.name")}
          onChange={handleChange}
          fullWidth
          id="name"
          variant="outlined"
          required
          error={fieldError.name}
          helperText={fieldError.name && t("contact.namereq")}
        />
        <TextField
          className={classes.formField}
          label="Email"
          fullWidth
          id="email"
          onChange={handleChange}
          variant="outlined"
          required
          error={fieldError.email}
          helperText={fieldError.email && t("contact.emailreq")}
        />
        <TextField
          className={classes.formField}
          label="Message"
          id="message"
          multiline
          onChange={handleChange}
          rows={4}
          fullWidth
          variant="outlined"
          required
          error={fieldError.message}
          helperText={fieldError.email && t("contact.messagereq")}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          {t("contact.send")}
        </Button>
        {contactSuccess && <span role="alert" style={{ color: "green" }}>{t("contact.success")}</span>}
      </form>
    </div>
    </>
  );
};

export default ContactUs;
