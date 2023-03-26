import { Form, Formik } from "formik";
import Button from "../formElements/Button";
import Fieldset from "../formElements/Fieldset";

const CreateBotForm = () => {
  const handleSubmit = (values: any) => {
    console.log("dalli");
  };

  return (
    <Formik
      initialValues={{}}
      validationSchema={{}}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate>
          <Fieldset legend="Main Setting"></Fieldset>
          <Fieldset legend="Strategy"></Fieldset>
          <Fieldset legend="Usage"></Fieldset>
          <Fieldset legend="Price"></Fieldset>

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBotForm;
