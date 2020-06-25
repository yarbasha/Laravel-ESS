import React, { Component } from 'react';

export default class ItemDetails extends Component {

  state = {
    item: {},
    loading: true
  }


  componentDidMount = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/items/${id}`).then(response => {
      this.setState({
        item: response.data,
        loading: false
      });
    }).catch(error => console.log(error));
  }

  render() {
    const item = this.state.item;
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <span>Item Details</span>
          </div>
          <div className="card-body">
            {this.state.loading ? <div className="d-flex align-items-center">
              <strong>Loading...</strong>
              <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div> :
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-5">
                    <img src={`/storage/${item.image}`} className="card-img" />
                  </div>
                  <div className="col-md-6 offset-md-1">
                    {Object.keys(item).map((key, index) => (
                      ['id', 'image', 'created_at', 'updated_at'].includes(key) || item[key] == null ? '' :
                        <p key={index}>
                          <strong style={{ textTransform: 'capitalize' }}>{key.split('_').join(' ')}</strong>: {item[key]}
                        </p>
                    ))}
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}