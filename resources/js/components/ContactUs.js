import React from 'react';

export default function ContactUs() {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <form action="">
            <div className="form-group row">
              <label htmlFor="firstname" className="col-md-2 col-form-label">First Name</label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="firstname" name="firstname" placeholder="First Name" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-md-2 col-form-label">Last Name</label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="telnum" className="col-12 col-md-2 col-form-label">Contact Tel.</label>
              <div className="col-5 col-md-3">
                <input type="tel" className="form-control" id="areacode" name="areacode" placeholder="Area Code" />
              </div>
              <div className="col-7 col-md-7">
                <input type="tel" className="form-control" id="telnum" name="telnum" placeholder="Tel. Number" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="emailid" className="col-md-2 col-form-label">Email</label>
              <div className="col-md-10">
                <input type="email" className="form-control" id="emailid" name="emailid" placeholder="Email" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6 offset-md-2">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="approve" id="approve" value="" />
                  <label htmlFor="approve" className="form-check-label"><strong>May we contant you?</strong></label>
                </div>
              </div>
              <div className="col-md-3 offset-md-1">
                <select className="form-control" name="" id="">
                  <option value="">Tel.</option>
                  <option value="">Email</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="feedback" className="col-md-2 col-form-label">Your Feedback</label>
              <div className="col-md-10">
                <textarea className="form-control" id="feedback" name="feedback" rows="4" placeholder=""></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-md-2 col-md-10">
                <button type="submit" className="btn btn-primary">Send Feedback</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-md">
        </div>
      </div>
    </div>
  );
}