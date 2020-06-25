import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { withRouter } from 'react-router';
import store from '../store/store';
import { setItems } from '../store/actions/actions';


export const FormRow = (props) => {
  return <div className="form-group row">
    <label className="col-md-3 col-form-label pt-2">{props.label}:</label>
    <div className="col-md-9">
      <Field name={props.name} type={props.type} className={props.error ? "form-control border-danger" : "form-control"} />
      <ErrorMessage name={props.name} component="span" className="text-danger" />
    </div>
  </div>;
}

const FormSelect = (props) => {
  return <div className="col">
    <Field as="select" name={props.name} className="form-control">
      <option>{props.label}</option>
      {props.values.map((value, index) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </Field>
  </div>
}

const ConfirmModal = (props) => {
  return <div className="modal fade" id="confirmModal" tabIndex="-1" data-backdrop="static" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">Item created successfully</h5>
        </div>
        <div className="modal-body">
          Do you want to create a new item?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.redirectToItems}>No</button>
          <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
        </div>
      </div>
    </div>
  </div>;
}

class CreateItem extends Component {

  state = {
    image: null,
    errorMessage: ''
  }

  redirectToItems = () => {
    this.props.history.push('/items');
  }

  schema = Yup.object().shape({
    brand: Yup.string().required(),
    model_number: Yup.string().required(),
    category: Yup.string().required(),
    price: Yup.number().positive().required()
  });

  initialValues = {
    brand: '', model_number: '',
    category: 'Glasses', price: 0,
    gender: '', frame_color: '',
    lens_color: '', frame_material: '',
    frame_design: '', lens_material: ''
  };

  onFileChange = () => {
    const imageFile = document.getElementById('imageFile').files[0];
    if (imageFile) {
      this.setState({ image: imageFile });
    }
    else {
      this.setState({ image: null });
    }
  }

  onSubmit = (values, { resetForm }) => {
    var formData = new FormData();
    if (!this.state.image) {
      return;
    }
    formData.append("image", this.state.image);
    Object.keys(values).forEach(key => formData.append(key, values[key]));
    axios.post('/api/items', formData).then(response => {
      store.dispatch(setItems([response.data]));
      $('#confirmModal').modal('show');
      resetForm();
      this.setState({ image: null });
    }).catch(error => this.setState({ errorMessage: error.response.data.errors }));
  }

  render() {
    const errorMessage = this.state.errorMessage;
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="createItemModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Create Item</h5>
              <button type="button" onClick={this.redirectToItems} className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ConfirmModal redirectToItems={this.redirectToItems} />
              {errorMessage && <div className="alert alert-danger">
                <ul>
                  {Object.keys(errorMessage).map((key, index) => (
                    <li key={index}>{errorMessage[key]}</li>
                  ))}
                </ul>
              </div>}
              <Formik
                initialValues={this.initialValues}
                validationSchema={this.schema}
                onSubmit={this.onSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormRow name="brand" label="Brand Name" error={errors.brand && touched.brand} />
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label pt-2">Category:</label>
                      <div className="col-md-9">
                        <Field as="select" name="category" className="form-control">
                          <option value="Glasses">Glasses</option>
                          <option value="Sunglasses">Sunglasses</option>
                        </Field>
                        <ErrorMessage name="category" />
                      </div>
                    </div>
                    <FormRow name="model_number" label="Model Number" error={errors.model_number && touched.model_number} />
                    <FormRow name="price" label="Price" error={errors.price && touched.price} />
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label pt-2">Image:</label>
                      <div className="col-md-9">
                        <div className="input-group mb-3">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" accept="image/*" id="imageFile" onChange={this.onFileChange} />
                            <label className={this.state.image ? 'custom-file-label' : 'custom-file-label border-danger'} id="imageLabel" htmlFor="imageFile">
                              {this.state.image ? this.state.image.name : "Choose file ( required )"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Click to add more...
                        </button>
                    </div>
                    <div className="collapse mt-2" id="collapseExample">
                      <div className="form-group row">
                        <div className="col">
                          <Field name="frame_color" className="form-control" placeholder="Enter Frame Color" />
                        </div>
                        <div className="col">
                          <Field name="lens_color" className="form-control" placeholder="Enter Lens Color" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <FormSelect name="gender" values={['Men', 'Women', 'Unisex']} label="Select Gender" />
                        <FormSelect name="lens_material" values={['Glass', 'Plastic']} label="Select Lens Material" />
                      </div>
                      <div className="form-group row">
                        <FormSelect name="frame_design" values={['Full Frame', 'Half Frame', 'Rimless']} label="Select Frame Design" />
                        <FormSelect name="frame_material" values={['Metal', 'Plastic']} label="Select Frame Material" />
                      </div>
                    </div>
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
}

export default withRouter(CreateItem);