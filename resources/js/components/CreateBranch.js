import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FormRow } from './CreateItem';
import { useHistory } from 'react-router';

function CreateBranch() {

  let history = useHistory();

  const back = e => {
    e.stopPropagation();
    history.push('/branches');
  };

  const schema = Yup.object().shape({
    name: Yup.string().required()
  });

  const initialValues = {
    name: ''
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }} id="createItemModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Create Branch</h5>
            <button type="button" onClick={back} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormRow name="name" label="Name" error={errors.name && touched.name} />
                  <button className="btn btn-primary float-right" type="submit">Create</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBranch;