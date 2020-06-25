import React, { Component } from 'react';
import axios from 'axios';
import CreateItem from './CreateItem';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store';
import { setItems, deleteItem, resetItems } from '../store/actions/actions';

function ConfirmModal(props) {
  return <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">Delete Item</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Are you sure?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">No</button>
          <button type="button" className="btn btn-outline-danger" onClick={props.deleteItem}>Yes</button>
        </div>
      </div>
    </div>
  </div>;
}

class Items extends Component {

  state = {
    selectedItem: {},
    message: '',
    loading: true
  };

  componentDidMount = () => {
    axios.get('/api/items').then(response => {
      if (this.props.items.length > 0) {
        store.dispatch(resetItems());
      }
      store.dispatch(setItems(response.data));
      this.setState({ loading: false });
    }).catch(error => console.log(error));
  }

  deleteItem = () => {
    const id = this.state.selectedItem.id;
    axios.delete(`/api/items/${id}`).then(response => {
      store.dispatch(deleteItem(response.data));
      this.setState({
        message: 'Item Deleted successfully.',
        selectedItem: {}
      });
      $('#confirmModal').modal('hide');
      setTimeout(() => {
        this.setState({ message: '' });
      }, 3000);
    }).catch(error => console.log(error));
  }

  render() {
    const items = this.props.items.map(item => (
      <tr key={item.id}>
        <th scope="row">{item.brand}</th>
        <td>{item.model_number}</td>
        <td>{item.category}</td>
        <td>{item.gender}</td>
        <td>{item.price}</td>
        <td>
          <button type="button" data-toggle="modal" onClick={() => this.setState({ selectedItem: item })} data-target="#confirmModal" className="btn btn-outline-danger btn-sm">
            Delete
          </button>
          <Link className="btn btn-sm btn-outline-primary ml-2" to={`/items/${item.id}/details`}>Details</Link>
        </td>
      </tr>
    ));
    return (
      <div className="page">
        {
          this.state.message != '' && <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        }
        <div className="card">
          <div className="card-header">
            <span>Items</span>
            <Link className="btn btn-sm btn-outline-primary float-right" to="/items/create">Create Item</Link>
            <Route path="/items/create" children={<CreateItem />} />
          </div>
          <div className="card-body">
            {this.state.loading ? (
              <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div>) :
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr style={{ borderTopStyle: 'hidden' }}>
                      <th scope="col">Brand</th>
                      <th scope="col">Model</th>
                      <th scope="col">Category</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </table>
              </div>
            }
            <ConfirmModal deleteItem={this.deleteItem} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ itemsReducer }) => {
  return {
    items: itemsReducer.items
  }
}

export default connect(mapStateToProps)(Items);