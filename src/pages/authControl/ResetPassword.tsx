import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import { IconKey, IconMail } from "../../shared/icons/Icons";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const handleSubmit = async (values: { email: string }) => {
  console.log(values);
  // try {
  //   const response: AxiosResponse<
  //     {
  //       id: string;
  //       email: string;
  //     },
  //     any
  //   > = await axios.post(apiEndPoints.signup, userData);
  //   navigate(`${routes.activate}/${response.data.id}`);
  //   // Handle successful response
  // } catch (error) {
  //   // Handle error
  // }
};

const ResetPassword = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate>
          <div className={"pageTitle"}>Reset Password</div>
          <TextField
            name="email"
            type="email"
            label="Email Address"
            startIcon={<IconMail />}
            value={values.email}
            onChange={handleChange}
            required
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email && errors.email}
          />

          <Button type="submit" variant="contained">
            Resset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
