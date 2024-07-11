import { Box, Button, TextField, FormControl,
    FormControlLabel, Checkbox, InputLabel,
    FormHelperText, Select, MenuItem,useTheme,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useGetRoomsQuery } from "../../state/API";
import { styled } from '@mui/system';
import { tokens } from "../../theme";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
  };
    var { data, isLoading } = useGetRoomsQuery();

    if (!isLoading) {
        var options = []
        for (let i = 0; i < data.length; i++) {

            options.push({ value: data[i]._id, label: data[i].name });

        }
    }
    else
        var options = [];

    const roles = [
        { value: "Usuário", label: "Usuário" },
        { value: "Gestor", label: "Gestor" },
        { value: "Administrador", label: "Administrador" },
    ];

    const initialValues = {
        selectedOptions: [],
        accessLvl: "",
    };

    const CustomSelect = styled(Select)(({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.neutral.light,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
        '& .MuiSelect-select': {
            color: theme.palette.neutral.light,
            backgroundColor: theme.palette.background.paper
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.neutral.main,
        },
    }));

  return (
    <Box m="20px">
      <Header title="CADASTRAR USUÁRIO" subtitle="Crie uma nova conta para um usuário, gestor ou administrador do sistema." />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue 
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
               />
              <FormControl fullWidth variant="outlined" sx={{ gridColumn: "span 2" }}>
              <InputLabel id="select-label" sx={{
              color: (theme) =>
                touched.accessLvl && errors.accessLvl ? theme.palette.error.main : 'lightgray',
              '&.Mui-focused': {
                color: (theme) => theme.palette.secondary.main,
              },
              }} >Nível de Acesso</InputLabel>
                  <Field
                      as={CustomSelect}
                      labelId="select-label"
                      name="accessLvl"
                      value={values.accessLvl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Nível de Acesso"
                      error={!!touched.accessLvl && !!errors.accessLvl}
                  >
                      {roles.map((role) => (
                          <MenuItem key={role.value} value={role.value}>
                              {role.label}
                          </MenuItem>
                      ))}
                  </Field>
                  <FormHelperText sx={{color: colors.redAccent[400]}} >{touched.accessLvl && errors.accessLvl}</FormHelperText>
              </FormControl>
              </Box>
                      <Box><center>

                 <FormControl
                     component="fieldset"
                     error={touched.selectedOptions && Boolean(errors.selectedOptions)}
                     sx={{
                               display: 'flex',
                     }}
                 >
                         <label ><h2>Conceder acesso às salas:</h2></label>
                        <Box
                           sx={{
                               display: 'flex',
                               flexWrap: 'wrap',
                               maxHeight: '200px',
                               overflowY: 'auto',
                           }}
                        >
                         {options.map((option) => (
                             <FormControlLabel
                                 key={option.value}
                                 control={
                                     <Checkbox
                                         checked={values.selectedOptions.includes(option.value)}
                                         onChange={(event) => {
                                             if (event.target.checked) {
                                                 setFieldValue(
                                                     'selectedOptions',
                                                     [...values.selectedOptions, option.value]
                                                 );
                                             } else {
                                                 setFieldValue(
                                                     'selectedOptions',
                                                     values.selectedOptions.filter(
                                                         (value) => value !== option.value
                                                     )
                                                 );
                                             }
                                         }}
                                         name="selectedOptions"
                                         value={option.value}
                                         sx={{
                                             color: 'neutral.main',
                                             '&.Mui-checked': {
                                                 color: 'secondary.main',
                                             },
                                         }}
                                         name="selectedOptions"
                                         value={option.value}
                                     />
                                 }
                                 label={option.label}
                                 style={{ width: '%' }}
                             />
                         ))}
                              
                       </Box>
                     {touched.selectedOptions && errors.selectedOptions && (
                         <FormHelperText>{errors.selectedOptions}</FormHelperText>
                     )}
                 </FormControl>
                      </center></Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cadastrar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("obrigatório"),
    lastName: yup.string().required("obrigatório"),
    email: yup.string().email("email inválido").required("obrigatório"),
  contact: yup
    .string()
    .matches(phoneRegExp, "telefone inválido")
      .required("obrigatório"),
    accessLvl: yup.string()
        .required("obrigatório")
        .nullable(),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
};

export default Form;
